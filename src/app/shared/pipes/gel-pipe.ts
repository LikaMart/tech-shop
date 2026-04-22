import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gel',
})
export class GelPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
