import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  product: Observable<any[]> | undefined;

  constructor( private firebase: AngularFireDatabase){}

  ngOnInit(): void {
    this.product = this.firebase.list('products').valueChanges()
  }

}
