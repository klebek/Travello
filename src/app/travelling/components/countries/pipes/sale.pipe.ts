import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sale' })
    
export class SalePipe implements PipeTransform {

      transform(sales: any, searchSale: any): any {

        if(searchSale == null) return sales;

        return sales.filter(function(p){
          return p.sale.toString().indexOf(searchSale.toString()) > -1;
        })
      }
    }