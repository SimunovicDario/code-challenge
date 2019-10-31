import { EncodingActionTypes, All } from '../actions/encoder.actions';


export interface State {
    output: string;
    errorMessage: string;
}

export const initialState: State = {
    output: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case EncodingActionTypes.ENCODING_SUCCESS: {
            console.log(action.payload.output);
            return {
                ...state,
                output: action.payload.output,
                errorMessage: null
            };
        }
        case EncodingActionTypes.ENCODING_FAILURE: {
            return {
                ...state,
                output: null,
                errorMessage: action.payload.errorMessage.error
            };
        }
        default: {
            return state;
        }
    }
}
