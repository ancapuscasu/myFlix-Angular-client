import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://ancas-myflixapi.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}


  /** Make api call to the user registration endpoint
  * @funtion userRegistration
  * @param userDetails
  * @returns a new user object in json format
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Make api call to the user login endpoint
   * @param userDetails {any}
   * @returns users data in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * call api endpoint to get all movies
   * @function getAllMovies
   * @return array of movies object in json format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to get a specific movie by title
   * @function getSingleMovie
   * @param Title
   * @returns a movie object in json format
   */

  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

 /**
   * call api endpoint to get a director data by directors name
   * @function getDirector
   * @param Name
   * @returns directors data in json format
   */

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to get genre data
   * @param Name
   * @returns genre data in json format
   */
  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to get user information
   * @param UserID
   * @returns users information in json format
   */
   getUserProfile(UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to get users list of favorite movies
   * @param UserID
   * @returns a list of the favorite movies of the user in json format
   */
  getFavoriteMovies(UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to add a movie to the favorite mobvielist of user
   * @param UserId 
   * @param MovieID
   * @returns the favorite movielist of user in json format
   */
  addFavoriteMovies(MovieID: string, UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + `users/${UserID}/movies/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to delete a favorite movie from the users favorite list
   * @param MovieID 
   * @param UserID
   * @returns updated user's information after removed a movie from the list in json format
   */
  deleteFavoriteMovies(MovieID: string, UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${UserID}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to edit user data
   * @param UserID
   * @param userCredentials
   * @returns updated user data in json format
   */
  editUserProfile(UserID: string, userCredentials: object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${UserID}`, userCredentials, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to delete the current user
   * @param UserID
   * @returns delete user profile
   */
  public deleteUserProfile(UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


/**
 * Non-typed response extraction
 * @param res {any}
 * @returns response || empty object
 */
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}

//handle errors function
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}