import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
// import * as _ from 'lodash';

declare var $: any;

@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  hideshowImge(stimg, imgid, call) {
    if (call == "a") {
      document.getElementById(stimg).style.display = "none";
      document.getElementById(imgid).style.display = "inline-block";
    } else {
      document.getElementById(stimg).style.display = "inline-block";
      document.getElementById(imgid).style.display = "none";
    }
  }

  hideshowImgeFlex(data, loader, call) {
    if (call == 'a') {
      document.getElementById(data).style.display = 'none';
      document.getElementById(loader).style.display = 'inline-block';
    } else {
      document.getElementById(data).style.display = 'flex';
      document.getElementById(loader).style.display = 'none';
    }
  }

  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  formatDateMonthYear(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, year].join("-");
  }

  formatDateWithTime(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      mins = ((d.getMinutes().toString().length) < 2) ? "0" + d.getMinutes() : d.getMinutes(),
      hour =
        d.getHours().toString().length < 2 ? "0" + d.getHours() : d.getHours(),
      time = hour + ":" + mins + ":00";
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-") + " " + time;
  }

  locatePage(pages, action) {
    if (action == "new") {
      this.router.navigate([pages.newPage], { queryParams: { action: "new" } });
    } else {
      this.router.navigate([pages.editPage], {
        queryParams: { action: "edit" }
      });
    }
  }

  ConvertString(value) {
    return parseInt(value);
  }

  back() {
    window.history.back();
  }

  copied(e) {
    if (e.isSuccess) {
      this.toastr.success('Copied to clipboard!');
    }
  }

  onCopyFailure() {
    this.toastr.error('cant Copied to clipboard!');
  }

  dropChkFn(list) {
    let dropArray = [];
    list.forEach(e => {
      // console.log(e);
      // console.log(e.value);
      // console.log(typeof (e.value));
      if (e.value === undefined || e.value === '' || e.value === [] || e.value === null) {
        let element = document.getElementById(e.key);
        dropArray.push(e);
        element.classList.remove("d-none");
      } else {
        let element = document.getElementById(e.key);
        element.classList.add("d-none");
      }
    });
    return dropArray;
  }

  showError(errorArray, call) {
    for (const key in errorArray) {
      if (errorArray.hasOwnProperty(key)) {
        const element = errorArray[key];
        if (call == 'a') {
          document.getElementById(key).style.display = 'block';
          document.getElementById(key).classList.add("cust-error");
          document.getElementById(key).innerHTML = element;
        } else {
          document.getElementById(key).style.display = 'none';
        }
      }
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  afterreset(){
    document.getElementById('headname').click();
  }
}
