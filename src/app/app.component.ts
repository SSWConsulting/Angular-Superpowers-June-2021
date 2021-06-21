import { Component } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to SSW Firebootcamp';
  myDate = new Date();

  updateTitle(event: any) {
    console.log(event);

    this.title = event.target.value;
  }

}
