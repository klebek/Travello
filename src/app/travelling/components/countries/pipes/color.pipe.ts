import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'color' })
    
export class ColorPipe implements PipeTransform {

      transform(colors: any, searchColor: any): any {

        if(searchColor == null) return colors;

        return colors.filter(function(p){
          return p.color.toLowerCase().indexOf(searchColor.toLowerCase()) > -1;
        })
      }
    }