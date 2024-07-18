import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
@Input('data') data: any

constructor(private auth: AngularFireAuth){}

  ngOnInit(): void {
   
  }

  logout(){
    this.auth.signOut()
  }

}
