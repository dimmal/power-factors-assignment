import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
  pure: true
})
export class ArrayToStringPipe implements PipeTransform {

  constructor() { }

  transform(array: Array<string>): string {
    return array.join(', ');
  }
}
