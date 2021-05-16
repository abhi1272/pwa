import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploaderComponent } from 'src/app/modules/shared/modals/file-uploader/file-uploader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(): void{
    const dialogRef = this.dialog.open(FileUploaderComponent, {
      width: '750px',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

}
