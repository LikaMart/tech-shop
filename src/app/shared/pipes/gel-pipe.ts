import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gel',
  standalone: true
})
export class GelPipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toFixed(2)} ₾`;
  }
}
