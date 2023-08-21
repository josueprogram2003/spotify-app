import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<any>, property: string | null, order:string ): TrackModel[] {
    // console.log(value)
    if (value?.length != 0 && value != null) {
    if (property == null) {
          return value;
        }else{
           const tmpList = value.sort((a, b) => {
            // console.log(a)
            // console.log(b)
          if (a[property] < b[property]) {
            // console.log(a[property],b[property])
            return -1
          }
          else if (a[property] === b[property]) {
            // console.log(a[property],b[property])
            return 0;
          }
          else if (a[property] > b[property]) {
            // console.log(a[property],b[property])
            return 1;
          }
          return 1
        })
        return (order === 'asc') ? tmpList : tmpList.reverse()
      }
    }

    return value;
  }

}
