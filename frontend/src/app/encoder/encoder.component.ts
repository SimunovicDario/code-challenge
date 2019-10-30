import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { GetEncoder } from '../store/actions/auth.actions';

@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetEncoder());
  }

}
