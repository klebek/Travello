import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { CategoryService } from 'shared/services/category.service';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    id;
    appUser: AppUser;
    product;
    category;
    subscription: Subscription;
    cart$: Observable<ShoppingCart>;


    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: ShoppingCartService,
        private categoryService: CategoryService
    ) {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

        this.id = this.route.snapshot.params['id'];

        this.subscription = this.productService.get(this.id).subscribe(product => {
            this.product = product;
            this.categoryService.getCategory(this.product.category).subscribe(category => this.category = category);
        });
    }

    async ngOnInit() {
        this.cart$ = await this.cartService.getCart();
    }

}
