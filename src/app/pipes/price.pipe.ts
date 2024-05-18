import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null || value === undefined) {
      return '0'; // Alapértelmezett érték null esetén
    }
    return value.toLocaleString('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
}
