import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddProductModalComponent } from '../../component/add-product-modal/add-product-modal.component';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Product } from '../../service/model/product';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductApi } from '../../service/api/product.api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductReducer } from '../../service/reducers/product.reducer';
import { ProductStore } from '../../service/store/product.store';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'products',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule, CommonModule, MatSidenavModule, MatTableModule, 
  MatPaginatorModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatTabsModule, ProductDetailsComponent],
  providers: [ProductApi, ProductReducer, ProductStore],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  
})
export class ProductsComponent  implements OnInit{
  product: Observable<any> | undefined;
  Product: any
  drawerMode: any = 'over'
  @ViewChild('matDrawer')matDrawer!: MatDrawer;
  dataSource!: MatTableDataSource<Product>
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  query = {
    name: '',
    price: '',
    brand: '',
    limit: 10,
    page: 1,
  }
total: any
private _unsubscribeAll: any = Subject<any>;
records = []

  constructor(private route: Router,   
    private dialog: MatDialog,
    private productApi: ProductApi,
    private productReducer: ProductReducer,
    private productStore: ProductStore
  ){
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
      this.getProducts()
  }

  getProducts(){
    this.productApi.getProduct().subscribe((res: any)=>{
      this.Product = res
      this.total = res.length
      this.productReducer.setRecords(this.Product);
    })

    this.records = this.productStore.productRecords.value
    this.productStore.productRecords
    .pipe(
      takeUntil(this._unsubscribeAll)
    )
    .subscribe((res:any) => {
      this.records = res
    })

  }

  search(){
    this.productApi.query(this.query).subscribe(results => {
      this.Product = results;
      this.total = results.length
      this.productReducer.setRecords(this.Product)
      
    });
  }

  addProduct(){
    this.dialog.open(AddProductModalComponent, {
      panelClass: 'add-product-modal'
    })
  }

  openDrawer(obj: any) {
    this.productReducer.setRecord(obj)
    this.matDrawer.toggle()
  }

  onPageChange(event: any) {
    this.query.limit = event.pageSize;
    this.query.page = event.pageIndex + 1;
    this.getProducts();
    this.search()
  }

  delete(id: any){
    this.productApi.delete(id).then((res)=>{
      debugger
    })
  }

}
