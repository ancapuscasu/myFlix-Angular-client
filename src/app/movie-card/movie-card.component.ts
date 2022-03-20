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
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  favouriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * When component is initialized, get movies, genres and favouriteMovies
   */
  ngOnInit(): void {
    this.getMovies();
    this.getGenres();
    this.getFavouriteMovies();
  }


  /////////////////////////////////////// Movies ///////////////////////////////////////
  /**
   * use Api call to get data of all movies
   * @function getAllMovies
   * @return movies in json format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
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


  /////////////////////////////////////// Genres ///////////////////////////////////////
  /**
   * Get list of genres
   */
  getGenres(): void {
    this.fetchApiData.getGenres().subscribe((resp: any) => {
        this.genres = resp;
        console.log(this.genres);
        return this.genres;
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


  /////////////////////////////////////// Favourite Movies ///////////////////////////////////////
  /**
   * Get users favorite movies
   */
    getFavouriteMovies(): void {
      this.fetchApiData.getUserProfile().subscribe((resp: any) => {
        this.favouriteMovies = resp.FavouriteMovies;
        console.log(this.favouriteMovies);
      });
    }



  /**
   * use API endpoint to let user add favorite movie
   * @function addFavoriteMovies
   * @param MovieID {string}
   * @param title {string}
   * @returns an array of the movie object in json format
   */
   addFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavouriteMovie(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
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
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  /**
   * is movie already in favoritelist of user
   * @param MovieID {string}
   * @returns true or false
   */
  isFavourited(MovieID: string): boolean{
    return this.favouriteMovies.includes(MovieID);
  }

  /**
   * add or remove favorite movie
   * if the movie is not on the favorite list, call
   * @function addFavouriteMovies
   * if the movie is already on the user favorite list, call
   * @function removeFavouriteMovies
   * @param movie {any}
   */
  toggleFavourite(movie: any): void {
    console.log(movie);
    this.isFavourited(movie._id)
      ? this.removeFavouriteMovie(movie._id, movie.Title)
      : this.addFavouriteMovie(movie._id, movie.Title);
  }


}
