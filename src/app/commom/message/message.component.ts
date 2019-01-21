import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor( public dialogRef: MatDialogRef<MessageComponent>) { }

  onCancel() {
    this.dialogRef.close();
  }

}
