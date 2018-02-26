import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterByField'
})
export class FilterByFieldPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any {
    if (value === '') {
      return items;
    }
    return _.filter(items, (item: any) => item[field] === value);
  }

}
