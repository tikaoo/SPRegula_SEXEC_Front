import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-navibar',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './navibar.component.html',
  styleUrl: './navibar.component.css'
})
export class NavibarComponent {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

}
