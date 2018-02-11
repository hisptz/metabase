import * as _ from 'lodash';
export function convertCamelCaseToReadable(name: string) {
  return _.capitalize(
    name.replace(/([A-Z])/g, function(newName) {
      return ' ' + newName.toLowerCase();
    })
  );
}
