import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class ProductStore{

    public currentRecord: BehaviorSubject<any>;
    public productRecords: any = BehaviorSubject<any[] | null>;

    constructor(){
        this.currentRecord = new BehaviorSubject({});
        this.productRecords = new BehaviorSubject([]);
    }

}
