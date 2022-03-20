import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

//Material Imports
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//Components
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.scss']
})
export class UserFavouritesComponent implements OnInit {
  user: any = {};
  favouriteMovies: any[] = []; 

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavouriteMovies();
  }

   /**
   * call API endpoint to get user info
   * @function getUserProfile
   * @return users data in json format
   */

    getUserProfile(): void {
      const UserID = localStorage.getItem('UserID');
      if (UserID) {
        this.fetchApiData.getUserProfile().subscribe((res: any) => {
          this.user = res;
          console.log(this.user);
          return this.user;
        });
      }
    }

  /**
   * Filters out movies that aren't in favourites list
   */
   getFavouriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favouriteMovies = res.filter((movie: any) => {
        return this.user.FavouriteMovies.includes(movie._id)
      });
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    })
  }

  /**
   * use API endpoint to remove user favorite
   * @function deleteFavoriteMovies
   * @param MovieID {string}
   * @param title {string}
   * @returns favorite movies has been updated in json format
   */
   removeFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavouriteMovie(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      window.location.reload();
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  /**
   * Open the director component to view info
   * @param name 
   * @param bio 
   * @param birthdate 
    */
   openDirector(name: string, bio: string, birthdate: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthdate: birthdate,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }

  /**
   * Open the synopisis component to view info
   * @param title 
   * @param imagePath 
   * @param description 
   */
   openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }

  /**
   * Open the genre component to view info
   * @param name 
   * @param description 
   */
   openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }


}
