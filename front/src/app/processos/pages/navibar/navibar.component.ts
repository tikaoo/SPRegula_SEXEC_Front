import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navibar',
  standalone: true,
  imports: [LoginComponent,MatToolbarModule,
    MatButtonModule,MatListModule,MatIconModule],
  templateUrl: './navibar.component.html',
  styleUrl: './navibar.component.css'
})
export class NavibarComponent {
  constructor(
    private router: Router,

  ){}

  pageRegister(): void {
    this.router.navigate(['/home/registrar']);
  }
}
