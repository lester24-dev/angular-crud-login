import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/util/authentication-service.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ReactiveFormsModule,
FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: any = FormGroup;
  login = FormGroup;
  items: any
  isLoading = false;
  url: any


  constructor(
    public fb: FormBuilder,
    public ngFireAuth: AngularFireAuth,
    public userAuth: AuthenticationService,
    public storage: AngularFireStorage,
    public router: Router,
    public authService: AuthenticationService,

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      profileImg: [''],
    })
  }

  async register(value: any){
    this.userAuth.RegisterUser(this.form.value)
  }

  signup(){
    this.router.navigateByUrl('signup');
  }

  async logins(credential: any)
  {
    // this.http.create(credential)
    // .subscribe((res: any)=>{
    //   if (res.status == "failed") {
    //     this.presentAlert(res.message)
    //   }else{
    //     localStorage.setItem('user', res.username);
    //     localStorage.setItem('id', res.id);
    //     localStorage.setItem('department', res.department);
    //     localStorage.setItem('name', res.name);
    //     this.navCtrl.navigateRoot("qr")
    //     debugger
    //   }
    // })
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(
       credential.email,
       credential.password
      );
      if (userCredential.user) {
        // User is signed in.
        this.authService.getItemByKey(userCredential.user.uid, "User")
        .subscribe((item) => {
          if (item) {
            this.items = item; // Assign the fetched item to the property
            localStorage.setItem('user', this.items.username);
            localStorage.setItem('id', this.items.id);
            localStorage.setItem('name', this.items.name);
            localStorage.setItem('email', this.items.email);
            localStorage.setItem('profile_img', this.items.profile_img);
            console.log('Item data:', this.items);
            this.router.navigateByUrl("admin/product")
          } else {
            console.log('Item does not exist');
          }
        }, (error) => {
          console.error('Error fetching item:', error);
        });
    
      } else {
        //console.log('User is signed out');
      }
    } catch (error) {
      // console.error('Login error:', error);
    }
    
  }



  
}
