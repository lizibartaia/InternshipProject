import { Component, Inject } from '@angular/core';
 import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/ipost';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  userId!: number;
  post$!: Observable<IPost>;

  constructor(private service: ListService,@Inject(MAT_DIALOG_DATA) public data: { id: number }
  ){
  }

  ngOnInit(){


    console.log('Received ID in DialogComponent:', this.data.id);  // Add this line for debugging
    if (this.data.id !== null) {
      this.post$ = this.service.getPost(this.data.id);
    }

}
}
