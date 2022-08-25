import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    // Convert the name to title case
    return `${value.replace(/^./, value.substring(0,1).toUpperCase())} ${args[0].replace(/^./, args[0].substring(0,1).toUpperCase())}`;
  }

}
