import { Injectable } from '@angular/core';
import { ProductStore } from '../store/product.store';

@Injectable()
export class ProductReducer {

    constructor(
        private productStore: ProductStore
    ){

    }

    setRecord(record: any) {
        this.productStore.currentRecord.next(record)
    }

    setRecords(records: any) {
        this.productStore.productRecords.next(records)
      }
}

