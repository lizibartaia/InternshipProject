import { Component } from '@angular/core';
import { IPost } from '../../interfaces/ipost';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { ITodo } from '../../interfaces/itodo';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent {
  userId!:number;
  userTodo$!:Observable<ITodo[]>

  constructor(private ListService: ListService,private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((queryParams)=>{

      const id = queryParams.get('id');

      if(id){
        this.userId=+id;
        this.userTodo$=this.ListService.getUserTodo(this.userId);
      }

    })
  }

}
