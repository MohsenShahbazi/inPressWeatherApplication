import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class CommonService {
  timoutTime: number = 30000;

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  isShowLoadingBar: boolean = false;

  showSuccessMessage(message: string, title: string) {
    this.toastr.success(message, title);
    return;
  }

  showWarningMessage(message: string, title: string) {
    this.toastr.warning(message, title);
    return;
  }

  showInfoMessage(message: string, title: string) {
    this.toastr.info(message, title);
    return;
  }

  showErrorMessage(message: string, title: string) {
    this.toastr.error(message, title);
    return;
  }

  showMessage(message: string, title: string) {
    this.toastr.show(message, title);
    return;
  }

  showLoadingBar(isShow: boolean) {
    this.isShowLoadingBar = isShow;
  }

  base64ToBlob(b64Data: any, contentType: any, sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  ValidateNationalCode(nationalCode: any) {
    if (nationalCode.length == 10) {
      if (nationalCode === '0000000000' ||
        nationalCode === '2222222222' ||
        nationalCode === '3333333333' ||
        nationalCode === '4444444444' ||
        nationalCode === '5555555555' ||
        nationalCode === '6666666666' ||
        nationalCode === '7777777777' ||
        nationalCode === '8888888888' ||
        nationalCode === '9999999999' ||
        nationalCode === '0123456789'
      ) {
        return false;
      }

      var c = nationalCode.charAt(9);
      var n = nationalCode.charAt(0) * 10 +
        nationalCode.charAt(1) * 9 +
        nationalCode.charAt(2) * 8 +
        nationalCode.charAt(3) * 7 +
        nationalCode.charAt(4) * 6 +
        nationalCode.charAt(5) * 5 +
        nationalCode.charAt(6) * 4 +
        nationalCode.charAt(7) * 3 +
        nationalCode.charAt(8) * 2;
      var r = n - Math.trunc(n / 11) * 11;
      if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  invalidInput(ref: any, error: any) {
    for (let x = 0; x < ref.nativeElement.length; x++) {
      ref.nativeElement[x].className = '';
    }


    for (let i = 0; i < error.length; i++) {
      let element = document.getElementById(error[i].field);
      if (element != null)
        element.classList.add('errorTextBox');
    }
  }

}
