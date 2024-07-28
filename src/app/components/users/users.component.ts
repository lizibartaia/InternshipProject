import { Component } from '@angular/core';
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
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, FormsModule,CommonModule, SearchPipe,MatButtonModule, MatPaginatorModule, MatTableModule,MatButton],
  providers:[ListService, Router],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',

})
export class UsersComponent {

  users$!: Observable<IUser[]>;
  displayedColumns: string[] = ['Name','Username', 'Phone', 'Email', 'Company','post'];

  constructor(private ListService: ListService, private router: Router){}

  ngOnInit(){
    this.users$ = this.ListService.getUsers();
    this.users$.subscribe((res)=>{
      console.log(res);
    })

  }

  onPostClicked(id:number){

    this.router.navigate(['detail',id]);

  }







}
