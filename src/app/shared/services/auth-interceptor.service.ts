import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {AuthService} from "shared/services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.handleAccess(req, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    let newRequest = request;
    const token = await localStorage.getItem('token');

    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    if(!request.url.includes('restcountries')){
      headerSettings['Authorization'] = 'Basic ' + btoa('my-trusted-client:secret');

      if(!request.url.endsWith('/login') && !request.url.endsWith('/register') && !request.url.endsWith('/token') ){
        if (token) {
          headerSettings['Authorization'] = 'Bearer ' + token;
        }
      }
    }

    const newHeader = new HttpHeaders(headerSettings);

    newRequest = request.clone({
      headers: newHeader});
    return next.handle(newRequest).toPromise();
  }

}
