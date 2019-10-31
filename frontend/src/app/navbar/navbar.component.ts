import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { LogOut } from '../store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }

}
