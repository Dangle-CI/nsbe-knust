import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {StorageService} from "../services/storage.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loading: boolean

  constructor(private router: Router, private apiService: ApiService, private storageService: StorageService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.storageService.getUserData()) this.router.navigateByUrl('/dashboard')
    // this.signUp()
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true
      this.apiService.login(this.loginForm.value).subscribe(
        resp => {
          this.storageService.saveUserData(resp)
          this.loading = false;
          // this.errorMessage()
          this.router.navigateByUrl('/dashboard');
          console.log(resp)
        }, err => {
          this.errorMessage()
          this.loading = false
          console.log(err)
        }
      )
    } else this.errorMessage()
  }

  successMessage() {
    this.messageService.add({key: 'bc', severity: 'success', summary: 'Success', detail: 'Login Successful'});
  }

  errorMessage() {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Error',
      detail: 'Username or Password is incorrect'
    });
  }

  signUp(): void {
    const data = {
      username: 'nsbe',
      password: 'election2021',
      email: 'hinneh04@gmail.com',
      mobile: '0501069673',
      status: 'ADMIN'
    }
    this.apiService.signUp(data).subscribe(res => console.log(res), err => console.log(err))
  }

  linkedIn(): void {
    window.open('https://www.linkedin.com/in/thehinneh/', '_blank')
  }
}
