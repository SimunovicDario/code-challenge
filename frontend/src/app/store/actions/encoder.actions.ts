import { Action } from '@ngrx/store';


export enum EncodingActionTypes {
    ENCODING = '[Encoder] Encoding',
    ENCODING_SUCCESS = '[Encoder] Encoding Success',
    ENCODING_FAILURE = '[Encoder] Encoding Failure',
}

export class Encoding implements Action {
    readonly type = EncodingActionTypes.ENCODING;
    constructor(public payload: any) { }
}

export class EncodingSuccess implements Action {
    readonly type = EncodingActionTypes.ENCODING_SUCCESS;
    constructor(public payload: {output: string}) { }
}

export class EncodingFailure implements Action {
    readonly type = EncodingActionTypes.ENCODING_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    | Encoding
    | EncodingSuccess
    | EncodingFailure;
