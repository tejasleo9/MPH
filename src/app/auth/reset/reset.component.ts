import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth/store/auth.service';
import { CommonService } from 'app/shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cs: CommonService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  is_disable = true;
  errors = [];

  isValidate() {
    const token = this.route.snapshot.params['token'];
    if (token == null) return;
    const payload = {
      'token': token
    };
    this.auth.validateToken(payload).subscribe(res => {
      if (res.success) {
        // this.toastr.success(res.message);
        this.is_disable = false;
      } else {
        this.is_disable = true;
        this.toastr.error(res.message);
      }
    });
  }

  validateForm(formm, imgid, lodimgid) {
    const t = Object.keys(formm.form.controls).forEach(field => {
      const control = formm.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (formm.form.valid) {
      this.onSuccess(formm, imgid, lodimgid);
    } else {
      return;
    }
  }

  onSuccess(form, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    const token = this.route.snapshot.params['token'];
    if (token == null) return;
    form.value['token'] = token;
    console.log(form.value);
    this.auth.setForgotPassword(form.value).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.toastr.success(res.message);
        setInterval(() => {
          this.router.navigate(['/signin']);
        }, 1500);
      } else {
        if (res.data !== {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  ngOnInit() {
    this.isValidate();
  }

}
