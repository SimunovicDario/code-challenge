import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import {
    EncodingActionTypes,
    Encoding, EncodingSuccess, EncodingFailure,
} from '../actions/encoder.actions';
import { EncoderService } from 'src/app/services/encoder.service';

@Injectable()
export class EncoderEffects {

    constructor(
        private actions: Actions,
        private encoderService: EncoderService,
    ) { }


    @Effect()
    Encoder: Observable<any> = this.actions.pipe(ofType(EncodingActionTypes.ENCODING),
        map((action: Encoding) => action.payload),
        switchMap((payload) => {
            return this.encoderService.postEncoder(payload).pipe(
                map((output) => {
                    return new EncodingSuccess( {output: output.output} );
                }),
                catchError((errorMessage) => {
                    return of((new EncodingFailure({ errorMessage })));
                }));
        }

        ));

    @Effect({ dispatch: false })
    EncoderSuccess: Observable<any> = this.actions.pipe(
        ofType(EncodingActionTypes.ENCODING_SUCCESS)
    );

    @Effect({ dispatch: false })
    EncoderFailure: Observable<any> = this.actions.pipe(
        ofType(EncodingActionTypes.ENCODING_FAILURE)
    );

}
