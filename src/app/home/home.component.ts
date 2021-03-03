import { Component, OnInit } from '@angular/core';
import { Owner } from '../_models/owner';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: Owner;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
  }
}