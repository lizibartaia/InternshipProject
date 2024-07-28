import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterLink,RouterModule, RouterLinkActive,MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,MatInputModule, MatButtonModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  datePipes: DatePipe = new DatePipe('en-US');

  formattedDate!: string;
  private intervalId: any;


  constructor(private router: Router, private datePipe: DatePipe){

  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      } else {
        console.log('Router event:', event);
      }
    });

    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);

  }

    getFormattedDate(){

    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss a');
    return transformDate;

  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateTime() {
    const date = new Date();
    this.formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss a') || '';
  }


  }



