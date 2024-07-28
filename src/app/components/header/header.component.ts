import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  datePipe: DatePipe = new DatePipe('en-US');

  constructor(private router: Router){}

  getFormattedDate(){

    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss a');
    return transformDate;

  }

  onPostClicked(){
    this.router.navigate(['/posts']);

  }

  onUsersClicked(){
    this.router.navigate(['/users']);

  }

}
