import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/security/models/userAuth';
import { LoginService } from 'src/app/users/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: UserAuth = new UserAuth();
  nomeEmpresa: string;
  dataNotification: any;
  numberNotification: number;
  constructor(private route: Router, private loginService: LoginService) {
    this.currentUser = loginService.decodeTokne();
  }

  ngOnInit(): void {
    const toggle_notification = document.querySelector('.toggle-notification');
    const notification_container = document.querySelector('.notification-card');
    toggle_notification.addEventListener('click', () => {
      notification_container.classList.toggle('show-notification');
    });

    document.documentElement.classList.toggle('dark');
  }

  // tslint:disable-next-line: typedef
  SwitchTheme() {
    const modeSwitch = document.querySelector(
      '.mode-switch'
    ) as HTMLButtonElement;
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  }

  // tslint:disable-next-line: typedef
  switchSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLDivElement;
    const app_content = document.querySelector(
      '.app-content'
    ) as HTMLDivElement;
    sidebar.classList.toggle('active-sidebar-responsiveness');
    app_content.classList.toggle('active-app-content');
  }

  // tslint:disable-next-line: typedef
  menuToggle() {
    const toggleMenu = document.querySelector('.menu-user');
    toggleMenu.classList.toggle('active');
  }

  logout() {
    this.loginService.logout();
  }
}
