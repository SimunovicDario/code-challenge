import { Component, OnInit } from '@angular/core';
import { AppState, selectEncoderState, selectAuthState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { Encoding } from '../store/actions/encoder.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent implements OnInit {
  input: string;
  errorMessage: string | null;
  getState: Observable<any>;
  output: string | null;
  getOutput: Observable<any>;
  submitted: boolean | null;
  inFocus: boolean | null;
  isLogOut: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectEncoderState);
    this.isLogOut = this.store.select(selectAuthState);
    this.input = '';
   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.output = state.output;
      this.inFocus = true;
    });
    this.isLogOut.subscribe((state) => {
      this.output = null;
    });
  }

  onSubmit(input: string) {
    this.store.dispatch(new Encoding(input));
  }

}
