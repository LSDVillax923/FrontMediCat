import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaLegible',
})
export class FechaLegiblePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
