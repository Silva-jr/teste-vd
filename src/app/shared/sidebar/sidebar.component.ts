import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/security/models/userAuth';
import { LoginService } from 'src/app/users/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentUser: UserAuth = new UserAuth();
  constructor(private loginService: LoginService) {
    this.currentUser = loginService.decodeTokne();    
  }

  ngOnInit(): void {}
}
