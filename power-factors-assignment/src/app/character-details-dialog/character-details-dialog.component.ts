import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Character } from '../core/models/character';

@Component({
  selector: 'pf-character-details-dialog',
  templateUrl: './character-details-dialog.component.html',
  styleUrls: ['./character-details-dialog.component.scss']
})
export class CharacterDetailsDialogComponent {
  character: Character;

  constructor(
    public dialogRef: MatDialogRef<CharacterDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Character) {

      this.character = data;
  }
}
