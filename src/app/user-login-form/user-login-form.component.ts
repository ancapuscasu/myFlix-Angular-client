import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

// Material Imports
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { 
    Username: '', 
    Password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
      console.log(response);
      // Logic for a successful user login
      localStorage.setItem('token', response.token);
      localStorage.setItem('UserID', response.user._id);
      localStorage.setItem('user', response.user);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User login successful!', 'OK', {
          duration: 5000
      });
      this.router.navigate(['movies']);
    }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
    });
  }
}
