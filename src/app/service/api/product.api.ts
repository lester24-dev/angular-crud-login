import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";


@Injectable()
export class ProductApi{
  
    constructor(
      private firebase: AngularFireDatabase,
      private fireStore: AngularFirestore
    ) {
    }

    getProduct(): Observable<any[]>{
      return this.fireStore.collection('products').valueChanges()
    }

    query(query: any): Observable<any[]> {
        return this.fireStore.collection('products', ref => ref.where("name", "==", query.name) && ref.where("brand", "==", query.brand)).valueChanges()
    }

    update(data: any, id: any){
      return this.fireStore.doc(`products/${id}`).update(data)
    }

    delete(id: any){
      return this.fireStore.doc(`products/${id}`).delete()
    }

  }