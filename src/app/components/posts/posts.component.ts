import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { ListService } from '../../services/list.service';
import { IPost } from '../../interfaces/ipost';
import { CommonModule, NgFor} from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from '../../pipes/search.pipe';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor, FormsModule,CommonModule,  MatDialogActions,MatInputModule,
    MatDialogClose,MatDialogContent,MatFormFieldModule, MatDialogTitle,SearchPipe,MatButtonModule, MatPaginatorModule, MatTableModule,MatButton, DialogComponent],
  providers:[ListService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);


  posts$!: Observable<IPost[]>;
  post$!:Observable<IPost>
  displayedColumns: string[] = ['username', 'title',  'detail'];


  dataSource = new MatTableDataSource<IPost>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private ListService: ListService){}

  ngOnInit(){

    this.posts$ = this.ListService.getPostsWithUsernames();
    this.posts$.subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}



