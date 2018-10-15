import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  providers: [NgbDropdownConfig]
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
<<<<<<< HEAD

  constructor(private auth: AuthService) {}
=======
  cart$: Observable<ShoppingCart>;
  navbarColor = false;
  scrollNum;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    config: NgbDropdownConfig,
    public el: ElementRef) {
    config.placement = 'bottom-right';
  }
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      this.scrollNum = window.pageYOffset

      if (this.scrollNum >= 450) {
        this.navbarColor = true
      } else {
        this.navbarColor = false
      }
      

}
         
}
