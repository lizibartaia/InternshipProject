import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { IUser } from '../../interfaces/iuser';
import { NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../pipes/search.pipe";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { BrowserModule } from '@angular/platform-browser';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, FormsModule,CommonModule,MatSortModule,MatFormFieldModule,MatInputModule, SearchPipe,MatButtonModule, MatPaginatorModule, MatTableModule,MatButton],
  providers:[ListService, Router],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',

})
export class UsersComponent implements AfterViewInit {

  users$!: Observable<IUser[]>;
  dataSource = new MatTableDataSource<IUser>();
  displayedColumns: string[] = ['Name','Username', 'Phone', 'Email', 'Company','post', 'todo'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private ListService: ListService, private router: Router){}

  ngOnInit(){
    this.users$ = this.ListService.getUsers();
    this.users$.subscribe((res)=>{
      console.log(res);
    })


    this.users$.subscribe(things => {
      this.dataSource.data = things;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  onPostClicked(id: number){

    this.router.navigate(['detail',id]);

  }

  onTodoClicked(id: number){

    this.router.navigate(['todo',id]);

  }







}
