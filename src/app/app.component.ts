import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-manager';
  constructor(iconReg: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconReg.addSvgIcon('more_vert', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more.svg'));
    iconReg.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
    iconReg.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
    iconReg.addSvgIcon('duplicate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/duplicate.svg'));
  }
}
