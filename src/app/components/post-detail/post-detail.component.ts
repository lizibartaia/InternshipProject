import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/ipost';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {

  userId!:number;
  userPost$!:Observable<IPost[]>

  constructor(private ListService: ListService,private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((queryParams)=>{

      const id = queryParams.get('id');

      if(id){
        this.userId=+id;
        this.userPost$=this.ListService.getUserPosts(this.userId);
      }

    })
  }

}
