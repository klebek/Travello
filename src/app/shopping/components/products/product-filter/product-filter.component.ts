import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ColorService } from 'shared/services/color.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input() searchText;
  @Input() searchColor;
  @Input() searchSale;

  @Output() searchTextChange = new EventEmitter();
  changeText(newSearchTextChange) {
    this.searchText = newSearchTextChange;
    this.searchTextChange.emit(newSearchTextChange);
  }
  @Output() searchColorChange = new EventEmitter();
  changeColor(newSearchColorChange) {
    this.searchColor = newSearchColorChange;
    this.searchColorChange.emit(newSearchColorChange);
  }
  @Output() searchSaleChange = new EventEmitter();
  changeSale(newSearchSaleChange) {
    this.searchSale = newSearchSaleChange;
    this.searchSaleChange.emit(newSearchSaleChange);
  }
  @Input('category') category;
  @Input('product') product;
  @Input('hamburger') hamburger = false;

  // @Input('product-name') productName = true;
  // @Input('sale-radios') saleRadios = true;
  // @Input('category-list') categoryList = true;
  // @Input('color-list') colorList = true;
  // @Input('marketing') marketing = true;

  categories$;
  products$;
  colors;
  filteredProducts: Product[] = [];
  radioAllChecked = true;
  radioSaleChecked = false;

  constructor(
    categoryService: CategoryService,
    productService: ProductService,
    private colorService: ColorService) {
    this.categories$ = categoryService.getAll();
    this.products$ = productService.getAll();
  }

  async ngOnInit() {
    this.colors = this.colorService.getAll();
  }

  private hideSale() {
    this.radioSaleChecked = false;
    this.radioAllChecked = true;
  }
  private showSale() {
    this.radioSaleChecked = true;
    this.radioAllChecked = false;
  }

  onTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
