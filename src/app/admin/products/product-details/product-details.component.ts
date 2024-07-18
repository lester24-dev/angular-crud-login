import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductStore } from '../../../service/store/product.store';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductApi } from '../../../service/api/product.api';
import { ProductReducer } from '../../../service/reducers/product.reducer';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, 
  MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  providers: [ProductApi, ProductReducer],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {

  private _unsubscribeAll: any = Subject<any>;
  currentRecord: any
  formGroup: any = FormGroup

  constructor(
    private productStore: ProductStore,
    private fb: FormBuilder,
    private productApi: ProductApi,
    private productReducer: ProductReducer
  ){
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.productStore.currentRecord
    .pipe(
      takeUntil(this._unsubscribeAll)
    )
    .subscribe((res)=>{
      this.currentRecord = res
      console.log(this.currentRecord)
    })

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      info: ['', Validators.required]
    })
  }

  update(formGroup: any){
    this.productApi.update(formGroup, this.currentRecord.id)
   this.productReducer.setRecord(null)
  }
}
