import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('No-Auth') === 'True') { return next.handle(req.clone()); }

    if (localStorage.getItem('token') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });

      return next.handle(clonedreq)
        .do(
          success => {
          },
          error => {
            if (error.status === 401) {this.router.navigateByUrl('/login');}
          });
    } else {
      this.router.navigateByUrl('/login');
    }}




}
