import { Injectable } from '@angular/core';
import {Observable, Symbol} from "rxjs";
import * as _ from 'lodash';
import {Http, Response} from '@angular/http';
@Injectable()
export class IndicatorService {

  indicators: any[] = [];
  constructor(
    private http: Http
  ) { }

  sanitizeIndicators(indicators: any[], metadataId) {
    let sanitizedIndicators = [];
    return Observable.create(observer => {
      if(indicators.length > 0) {
        indicators.forEach(indicator => {

          /**
           * Supply metadataId for easy accessibility
           */
          indicator.metadataId = metadataId;

          // this._getIndicatorFormulaStatus('numerator', this._getIndicatorFormulaParameters(indicator.numerator),indicator);
          // this._getIndicatorFormulaParameters(indicator.numerator));
        });
      } else {
        //todo empty data
      }
    })

  }

  getDependencies(indicator: any) {
    let dependencies: any[] = [];

    /**
     * Get indicator type
     */
    dependencies.push({type: 'indicatorType', details: indicator.indicatorType});

    /**
     * Get indicator user if any
     */
    if(indicator.user) {
      dependencies.push({type: 'user', details: indicator.user})
    }

    /**
     * Get dependencies from numerator and denominator formula
     */
    let formulaParamsBuffer: any = {};
    formulaParamsBuffer = this.getFormulaParameters(formulaParamsBuffer,this._getIndicatorFormulaParameters(indicator.numerator));
    formulaParamsBuffer = this.getFormulaParameters(formulaParamsBuffer, this._getIndicatorFormulaParameters(indicator.denominator));

    const formulaParamKeys = _.keys(formulaParamsBuffer);

    if(formulaParamKeys.length > 0) {
      formulaParamKeys.forEach(key => {
        const keyValues: any = formulaParamsBuffer[key];
        if(keyValues.length > 0) {
          keyValues.forEach(value => {
            dependencies.push({type: key, details: {id: value}})
          });
        }

      })
    }

    return dependencies

  }

  getFormulaParameters(formulaParamsBuffer, expressionParams) {
    if(expressionParams.length) {
      expressionParams.forEach(param => {
        const paramsKeys = _.keys(param);
        if(paramsKeys.length > 0) {
          paramsKeys.forEach(key => {
            if(formulaParamsBuffer[key]) {
              if(formulaParamsBuffer[key].indexOf(param[key]) == -1) {
                formulaParamsBuffer[key].push(param[key])
              }

            } else {
              formulaParamsBuffer[key] = [];
              formulaParamsBuffer[key].push(param[key])
            }
          })
        }
      })
    }
    return formulaParamsBuffer;
  }



  // private _checkDependency(item, dependency, metadataId, preferSource = false) {
  //   return Observable.create(observer => {
  //     this.metadataService.checkIfExist(dependency + 's',item[dependency].id,item[dependency].name, metadataId,preferSource)
  //       .subscribe(searchResult => {
  //         if(searchResult.found) {
  //           observer.next({type: 'success',item: dependency, message: searchResult.message});
  //           observer.complete();
  //         } else {
  //           observer.next({type: 'danger',item: dependency, message: searchResult.message});
  //           observer.complete();
  //         }
  //
  //       });
  //   })
  // }

  // private _getIndicatorFormulaStatus(expressionPart, expressionParameters, indicator) {
  //   let status: any[] = [];
  //   /**
  //    * Get numerator parameters
  //    */
  //   let dataElementCount: number = 0;
  //   let resultCount: number = 0;
  //   let requestArray: any[] = [];
  //   if(expressionParameters.length > 0) {
  //     expressionParameters.forEach(param => {
  //       requestArray.push(this.metadataService.checkIfExist('dataElements',param.dataElementId,null,null,true))
  //     });
  //
  //     if(requestArray.length > 0) {
  //       Observable.forkJoin(requestArray).subscribe(checkResult => {
  //         console.log(checkResult)
  //       }, checkError => {
  //         //todo handle check result error
  //       })
  //     }
  //
  //   }
  // }

  private _getIndicatorFormulaParameters(indicatorExpression: string): any[] {
    let formulaParameters: any[] = [];

    /**
     * Remove outer enclosure first
     */
    indicatorExpression.split(/[()]/).forEach(innerExpression => {
      if(innerExpression != "" && innerExpression.trim() != '-' && innerExpression.trim() != '+') {
        /**
         * Get inner expression
         */
        innerExpression.split(/[-+*]/).forEach(expression => {
          /**
           * Pick only those which are not numbers
           */
          if(isNaN(parseFloat(expression.trim()))) {
            let expressionArray: any = {};
            switch (expression.split(/[{}]/)[0]) {

              /**
               * Get parameters for data elements
               */
              case '#' : {
                let dataElementExpression = expression.split(/[{}]/)[1];
                expressionArray = {
                  dataElement: dataElementExpression.split('.')[0],
                  categoryOptionCombo: dataElementExpression.split('.').length > 1 ? dataElementExpression.split('.')[1] : null
                };
                break;
              }

              /**
               * Get Organisation unit counts
               */
              case 'OUG' : {
                expressionArray = {
                  orgUnitCount: expression.split(/[{}]/)[1]
                };
                break;
              }

              /**
               * Get constants
               */
              case 'C' : {
                expressionArray = {
                  constant: expression.split(/[{}]/)[1]
                };
                break;
              }

              /**
               * Get program attribute values
               */
              case 'A' : {
                let program = expression.split(/[{}]/)[1];
                expressionArray = {
                  program: program.split('.')[0],
                  attribute: program.split('.')[1]
                };
                break;
              }

              /**
               * Get program indicator values
               */
              case 'I' : {
                expressionArray = {
                  programIndicator: expression.split(/[{}]/)[1]
                };
                break;
              }

              /**
               * Get Program dataleement values
               */
              case 'D' : {
                let program = expression.split(/[{}]/)[1];
                expressionArray = {
                  program: program.split('.')[0],
                  dataElement: program.split('.')[1]
                };
                break;
              }
            }

            formulaParameters.push(expressionArray)
          }

        })

      }
    });

    return formulaParameters;
  }

  checkFromSystem(indicator: any): Observable<any> {
    let url: string = '';

    if(indicator.id) {
      url = '../../../api/indicators/' + indicator.id + '.json?fields=*,!indicatorType,!dataSets,!indicatorGroups,!attributeValues,!userGroupAccesses,!userAccesses,!translations,!dataSetElements,!dataElementGroups,!legendSets,!aggregationLevels,!user';
    }

    if(url === '') {
      return Observable.of(null);
    }

    return Observable.create(observer => {
      this.http.get(url).map((res: Response) => res.json()).catch(error => Observable.throw(new Error(error)))
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        }, () => {
          observer.next(null);
          observer.complete();
        })
    })
  }

}
