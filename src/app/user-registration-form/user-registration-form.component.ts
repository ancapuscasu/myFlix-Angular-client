import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { 
    FirstName: '',
    LastName: '',
    Username: '', 
    Email: '', 
    Password: '', 
    Birthdate: '' 
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      let userCredentials = (({ Username, Password}) => ({ Username, Password })) (this.userData);
      this.fetchApiData.userLogin(userCredentials).subscribe((response) => {
        console.log(response);
        // Logic for a successful user login
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.user._id);
        localStorage.setItem('user', response.user);
        this.dialogRef.close(); // This will close the modal on success!
        this.router.navigate(['movies']);
      }, (response) => {
          this.snackBar.open(response, 'OK', {
            duration: 2000
          });
      });
        this.snackBar.open('Welcome to myFlix!', 'OK', {
            duration: 4000
        });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
