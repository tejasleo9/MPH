import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstoreService } from 'app/shared/localstore.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStoreService: LocalstoreService,
    public router: Router,
  ) { }
  
  canActivate(): boolean {
    let token = this.localStoreService.getLastAction('token');
    if (token == null || token == undefined) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}


