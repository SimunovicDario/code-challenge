import * as auth from './reducers/auth.reducers';
import * as encoder from './reducers/encoder.reducers';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  authState: auth.State;
  encoderState: encoder.State;
}

export const reducers = {
  auth: auth.reducer,
  encoder: encoder.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectEncoderState = createFeatureSelector<AppState>('encoder');
