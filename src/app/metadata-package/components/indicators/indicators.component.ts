import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {Observable} from "rxjs";
import {IndicatorService} from "../../providers/indicator.service";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

  @Input() indicators: any;
  @Input() metadataId: any;
  indicatorData: Array<any> = [];
  currentIndicator: string = null;
  isFixBlockOpen: boolean = false;
  fixBlockItem: string;
  constructor(
    private metadataService: MetadataService,
    private indicatorService: IndicatorService
  ) { }

  ngOnInit() {
    this.indicatorService.sanitizeIndicators(this.indicators, this.metadataId).subscribe(sanitizedIndicators => {

    });
    this.indicators.forEach(indicator => {
      indicator.status = [];
      /**
       * Get numerator parameters
       */
      let numeratorParameters = this.getFormulaParameters(indicator.numerator);
      let numeratorDataElementCount: number = 0;
      let numeratorResultCount: number = 0;
      if(numeratorParameters.dataElements.length > 0) {
        numeratorParameters.dataElements.forEach(dataElement => {
          this.metadataService.checkIfExist('dataElements',dataElement,null,null,true)
            .subscribe(numeratorResult => {
              numeratorResultCount++;
              if(numeratorResult.found) {
                numeratorDataElementCount++;
              }

              if(numeratorResultCount == numeratorParameters.dataElements.length) {
                if(numeratorDataElementCount == 0) {
                  indicator.status.push({type: 'danger',item: 'numerator', message: 'No data element was found for numerator'});
                } else {
                  indicator.status.push({type: 'success',item: 'numerator', message: numeratorDataElementCount + ' of ' + numeratorParameters.dataElements.length + ' data elements found for numerator'});
                }
              }
            })
        });
      }

      /**
       * Get denominator parameters
       */
      let denominatorParameters = this.getFormulaParameters(indicator.denominator);
      let denominatorDataElementCount: number = 0;
      let denominatorResultCount: number = 0;
      if(denominatorParameters.dataElements.length > 0) {
        // console.log(indicator.denominator)
        denominatorParameters.dataElements.forEach(dataElementId => {
          this.metadataService.checkIfExist('dataElements',dataElementId,null,null,true)
            .subscribe(denominatorResult => {
              denominatorResultCount++;
              if(denominatorResult.found) {
                denominatorDataElementCount++;
              }

              if(denominatorResultCount == denominatorParameters.dataElements.length) {
                if(denominatorDataElementCount == 0) {
                  indicator.status.push({type: 'danger',item: 'denominator', message: 'No data element was found for denominator'});
                } else {
                  indicator.status.push({type: 'success',item: 'denominator', message: denominatorDataElementCount + ' of ' + denominatorParameters.dataElements.length + ' data elements found for denominator'});
                }
              }
            })
        });
      }

      // let denominatorParameters = this.getFormulaParameters(indicator.denominator);
      Observable.forkJoin(
        this.checkDependency(indicator,'indicatorType', this.metadataId),
        this.checkDependency(indicator,'user',this.metadataId,true),
        // this.metadataService.checkIfExist('dataElements',numeratorParameters['dataElement'],null,true)
      ).subscribe(results => {
        results.forEach(result => {
          indicator.status.push(result);
        });
        this.indicatorData.push(indicator);
      });
    });
  }

  checkDependency(item, dependency, metadataId, preferSource = false) {
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

  getFormulaParameters(expression: string) {
    let parameters = expression.split(/[-+*]/);
    let result = {dataElements: []};
    parameters.forEach(param => {
      if(param.split(/[{}]/).length > 1) {
        param = param.split(/[{}]/)[1];
        /**
         * Find data elements and/or category option combos
         */
        let exist: boolean = false;
        if(result.dataElements.length > 0) {
          result.dataElements.forEach(dataElement => {
            if(dataElement == param.split('.')[0]) {
              exist = true;
            }
          })
        }

        if(!exist) {
          result.dataElements.push(param.split('.')[0]);
        }
        // if(param.split('.').length > 1) {
        //   result['categoryOptionCombo'] = param.split('.')[1];
        // }
      }

    });
    return result;
  }

  view(indicator) {
    this.currentIndicator = indicator;
  }

  close() {
    this.currentIndicator = null;
  }

  openFixBlock(item) {
    this.isFixBlockOpen = true;
    this.fixBlockItem = item;
  }

}
