import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value, args);
    let test = args == 0 ? 'include' : 'exclude'
    let t = value.filter(res => {
      if (test != res.type) {
        // debugger
        return res;
      }
    }).map(res => {
      return res;
    })
    return t;
  }

}
