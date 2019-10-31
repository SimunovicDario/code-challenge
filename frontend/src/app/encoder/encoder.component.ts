import { Component, OnInit } from '@angular/core';
import { AppState, selectAuthState, selectEncoderState } from '../store/app.states';
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

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectEncoderState);
    this.input = '';
   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.output = state.output;
    });
  }

  onSubmit(input: string) {
    console.log(this.output);
    this.store.dispatch(new Encoding(input));
  }

}
