import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'title' })
    
export class TitlePipe implements PipeTransform {

      transform(titles: any, searchText: any): any {

        if(searchText == null) return titles;

        return titles.filter(function(p){
          return p.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        })
      }
    }