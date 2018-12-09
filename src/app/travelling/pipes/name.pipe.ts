import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'name' })
    
export class NamePipe implements PipeTransform {

      transform(names: any, searchName: any): any {

        if(searchName == null) return names;

        return names.filter(function(c){
          return c.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1;
        })
      }
    }