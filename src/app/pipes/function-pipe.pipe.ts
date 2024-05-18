import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'function',
  standalone: true,
})
export class FunctionPipe implements PipeTransform {
  transform(original: any, func: Function, ...args: any) {
    return func(original, ...args);
  }
}
