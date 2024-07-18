import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { Layout } from './layout.types';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [ReactiveFormsModule,
    NavbarComponent, 
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
   layout!: Layout
  
  constructor(
    
  ){

  }
  ngOnInit(): void {
    
  }

}
