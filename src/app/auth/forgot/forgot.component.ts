import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/common.service';
import { AuthService } from '../store/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  email = '';
  errors = [];

  constructor(
    private cs: CommonService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

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
    this.auth.sendForgotPasswordEmail(form.value).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.toastr.success(res.message);
        setInterval(() => {
          this.router.navigate(['/account/reset-password']);
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
  }

}
  