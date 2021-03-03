import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {
  owner: Owner;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.ownerDetails();
  }

  ownerDetails(): void {
    this.userService.getOwner().subscribe(user => this.owner = user);
  }
}