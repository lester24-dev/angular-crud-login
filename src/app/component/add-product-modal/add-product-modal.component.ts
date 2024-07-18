import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    CommonModule
  ],
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.scss'
})
export class AddProductModalComponent implements OnInit {
formGroup: any = FormGroup
selectedFile: any = File;
 downloadURL: any = String;
 randomString: string = '';


  constructor(
    private fb: FormBuilder,
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ){

  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      info: ['', Validators.required],
      brand: ['', Validators.required],
      img: ['', Validators.required]
    })
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit(value: any){
    const filePath = `uploads/${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);
    const id = this.generateRandomString(10);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;
          const insertData = {id: id, name: value.name, price: value.price, brand: value.brand, info: value.info, img: this.downloadURL}
          this.firestore.collection('products').ref.doc(id).set(insertData).then((res)=>{
            
          })
          
        });
      })
    ).subscribe();
    
   
  }

  generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
