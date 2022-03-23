/** 
 * The UserRegistrationFormComponent is used to render a mat dialog containing a form where the
 * user can complete and submit a profile to register for myFlix. 
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Used to reference a dialog created using the MatDialog service
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Used to access the userRegistration function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
// Used to create pop-up notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /** 
   * userData values are populated by form inputs in the user-registration-form template that are 
   * bound using the ngModel directive.
   */ 
  @Input() userData = { 
    FirstName: '',
    LastName: '',
    Username: '', 
    Email: '', 
    Password: '', 
    Birthdate: '' 
  };

  /** 
   * Passing classes as parameters to the constructor sets them as properties on the component class 
   * that can then be accessed as needed.
   */ 
  constructor(
    public fetchApiData: FetchApiDataService,
    // Creates a reference to the dialog that contains the UserRegistrationForm component
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {}

  /**
   * Invokes the userRegistration method on the fetchApiData service, with the userData from the form,
   * in order to register the user. Successful registration closes the form and logs user in, routing them to "/movies". 
   * If unsuccessful, a popup message will ask the user to try again with a different username.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      let userCredentials = (({ Username, Password}) => ({ Username, Password })) (this.userData);
      this.fetchApiData.userLogin(userCredentials).subscribe((response) => { //logic for a successful register user request
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.user._id);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.dialogRef.close(); //Closes the modal on success
        this.router.navigate(['movies']); //Routes user to "/movies"
      }, (response) => {
          this.snackBar.open(response, 'OK', {
            duration: 2000
          });
      });
        this.snackBar.open(`Welcome to myFlix ${this.userData.FirstName}!`, 'OK', {
            duration: 4000
        });
    }, (response) => {
      console.log(response);
      this.snackBar.open("Sorry we couldn't register you. Please try a different username", 'OK', {
        duration: 2000
      });
    });
  }
}
