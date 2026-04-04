import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cop',
})
export class CopPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
