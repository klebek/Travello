import { Category } from './../../models/category';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { GalleryService } from 'shared/services/gallery.service';
import 'hammerjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-image') showImage = true;
  @Input('show-preview') showPreview = false;
  @Input('show-gallery') showGallery = false;
  @Input('show-actions') showActions = true;
  @Input('show-details') showDetails = true;
  @Input('category') category: Category;

  @Input('shopping-cart') shoppingCart: ShoppingCart;

  category$;
  products$;
  bgProduct;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private cartService: ShoppingCartService,
    private categoryService: CategoryService,
    private galleryService: GalleryService,
    private productService: ProductService
  ) {
  }

  onTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  ngOnInit() {
    this.category$ = this.categoryService.getCategory(this.product.category);
    this.products$ = this.productService.getAll();
    this.galleryService.getImages(this.product);
    this.galleryService.getOptions();
    this.galleryOptions = this.galleryService.galleryOptions;
    this.galleryImages = this.galleryService.galleryImages;
  }
}
