/** 
 * The NavbarComponent is used to display the navbar at the top of the page after the user has logged in. 
 * The navbar includes links to the different routes of the app: 'movies', 'my-list', 'profile' and 
 * also a button that allows users to logout.
 * @module NavbarComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) {}

  ngOnInit(): void {}
  
  /**
   * Function to redirect users to movies screen
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  
  /**
   * Function to redirect users to my-list screen; user favourite movies list
   */
  toMyList(): void {
    this.router.navigate(['my-list']);
  }

  /**
   * Function to redirect users to profile screen
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }


  /**
   * Function to log out user and clear localStorage, then redirect to welcome screen.
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
