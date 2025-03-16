import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(item: any[], searchText: any, field: string[]): any {
    if (!item || !searchText || !field) { return item; }
    searchText = searchText.toLowerCase();
    return item.filter(item =>
      
      field.some(field => {
        const fieldValue = field.split('.').reduce((o, key) => o?.[key], item);
        return fieldValue?.toString()
        .toLowerCase()
        .includes(searchText)
      }
      )
    )
  }

}
