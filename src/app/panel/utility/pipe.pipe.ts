import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    console.log(items, searchText);
    if (!items) return [];
    if (searchText == undefined) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return JSON.stringify(it).toLowerCase().includes(searchText);
    });
  }

}
