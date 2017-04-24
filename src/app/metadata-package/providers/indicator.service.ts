import { Injectable } from '@angular/core';
import {Observable, Symbol} from "rxjs";
import {Store} from "../../shared/providers/store";
import {MetadataService} from "../../shared/providers/metadata.service";

@Injectable()
export class IndicatorService {

  indicators: any[] = [];
  constructor(
    private store: Store,
    private metadataService: MetadataService  ) { }

  sanitizeIndicators(indicators: any[], metadataId) {
    let sanitizedIndicators = [];
    return Observable.create(observer => {
      this.store.selectByField('indicators',{name: 'metadataId', value: metadataId}).subscribe(indicatorResult => {
        if(indicatorResult[Symbol.iterator] == 'function') {
          observer.next(indicatorResult);
          observer.complete();
        } else {
          if(indicators.length > 0) {
            indicators.forEach(indicator => {

              /**
               * Supply metadataId for easy accessibility
               */
              indicator.metadataId = metadataId;

              this._getIndicatorFormulaStatus('numerator', this._getIndicatorFormulaParameters(indicator.numerator),indicator);
              // this._getIndicatorFormulaParameters(indicator.numerator));
            });
          } else {
            //todo empty data
          }
        }
      });
    })

  }

  private _checkDependency(item, dependency, metadataId, preferSource = false) {
    return Observable.create(observer => {
      this.metadataService.checkIfExist(dependency + 's',item[dependency].id,item[dependency].name, metadataId,preferSource)
        .subscribe(searchResult => {
          if(searchResult.found) {
            observer.next({type: 'success',item: dependency, message: searchResult.message});
            observer.complete();
          } else {
            observer.next({type: 'danger',item: dependency, message: searchResult.message});
            observer.complete();
          }

        });
    })
  }

  private _getIndicatorFormulaStatus(expressionPart, expressionParameters, indicator) {
    let status: any[] = [];
    /**
     * Get numerator parameters
     */
    let dataElementCount: number = 0;
    let resultCount: number = 0;
    let requestArray: any[] = [];
    if(expressionParameters.length > 0) {
      expressionParameters.forEach(param => {
        requestArray.push(this.metadataService.checkIfExist('dataElements',param.dataElementId,null,null,true))
      });

      if(requestArray.length > 0) {
        Observable.forkJoin(requestArray).subscribe(checkResult => {
          console.log(checkResult)
        }, checkError => {
          //todo handle check result error
        })
      }

    }
  }

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
                  dataElementId: dataElementExpression.split('.')[0],
                  catOptionComboId: dataElementExpression.split('.').length > 1 ? dataElementExpression.split('.')[1] : null
                };
                break;
              }

              /**
               * Get Organisation unit counts
               */
              case 'OUG' : {
                expressionArray = {
                  orgUnitCountId: expression.split(/[{}]/)[1]
                };
                break;
              }

              /**
               * Get constants
               */
              case 'C' : {
                expressionArray = {
                  constantId: expression.split(/[{}]/)[1]
                };
                break;
              }

              /**
               * Get program attribute values
               */
              case 'A' : {
                let program = expression.split(/[{}]/)[1];
                expressionArray = {
                  programId: program.split('.')[0],
                  attributeId: program.split('.')[1]
                };
                break;
              }

              /**
               * Get program indicator values
               */
              case 'I' : {
                expressionArray = {
                  programIndicatorId: expression.split(/[{}]/)[1]
                };
                break;
              }

              /**
               * Get Program dataleement values
               */
              case 'D' : {
                let program = expression.split(/[{}]/)[1];
                expressionArray = {
                  programId: program.split('.')[0],
                  dataElementId: program.split('.')[1]
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

}
