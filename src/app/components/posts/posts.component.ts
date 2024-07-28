import { Component, inject } from '@angular/core';
import { ListService } from '../../services/list.service';
import { IPost } from '../../interfaces/ipost';
import { CommonModule, NgFor} from '@angular/common';
import { Observable } from 'rxjs';
import { TableComponent } from '../../shared/table/table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from '../../pipes/search.pipe';
import { DialogComponent } from '../../shared/dialog/dialog.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor, FormsModule,CommonModule,  MatDialogActions,
    MatDialogClose,MatDialogContent, MatDialogTitle,SearchPipe,MatButtonModule, MatPaginatorModule, MatTableModule,MatButton, DialogComponent],
  providers:[ListService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  readonly dialog = inject(MatDialog);


  posts$!: Observable<IPost[]>;
  post$!:Observable<IPost>
  displayedColumns: string[] = ['username','id', 'title', 'body', 'detail'];

  constructor(private ListService: ListService){}

  ngOnInit(){
    // this.posts$ = this.ListService.getPosts();
    // this.posts$.subscribe((res)=>{
    //   console.log(res);
    // })

    this.posts$ = this.ListService.getPostsWithUsernames();
    this.posts$.subscribe((res) => {
      console.log(res);
    });
  }


  onDetailClick(id: number){

    this.post$=this.ListService.getPost(id);

  }

  openDialog(id:number) {

    this.dialog.open(DialogComponent, {
      data: { id: id }
    });

  }



}
