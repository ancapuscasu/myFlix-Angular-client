/** 
 * The SynopsisComponent is used to render a mat dialog containing a synopsis of the movie selected.
 * @module SynopsisComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
// MAT_DIALOG_DATA is an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {

  constructor(
    /**
     * The data that was passed to the Synopsis dialog in the MovieCardComponent is injected in to the 
     * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
     * and is hence available to be output in the template.
     */ 
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      ImagePath: any,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
