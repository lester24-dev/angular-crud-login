import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterOutlet } from '@angular/router';
import { LocalStorage } from './service/util/localStorage.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [LocalStorage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private route: Router,
    private localStorage: LocalStorage
  ){}

  ngOnInit(): void {
    const user = this.localStorage.get('user');

    if (!!user) {
        this.route.navigateByUrl("/admin/product")
        debugger
    }else{
        this.route.navigateByUrl("/login")
        debugger
    }
    
    
  }
  title = 'ecommerce';
}
