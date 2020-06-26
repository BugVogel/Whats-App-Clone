import {SIGNINGIN, LOGGED,LOGGING, SIGNEDIN, LOGGED_OUT} from '../actions/actionsType'


const initialState= {

    uid: null,
    email: null,
    loading: false,
    logged: false,

}

const reducer = ( state = initialState, action ) => {


    switch(action.type){


        case SIGNINGIN:
            return {
                ...state,
                loading: true,
               


            }
        case SIGNEDIN:
            return{
                ...state,
                id: action.payload.uid,
                email: action.payload.email,
                loading:false,
                logged: true,
            }
        case LOGGING:
            return{
                ...state,
                loading: true,
            } 

        case LOGGED:
            return{
                ...state,
                id: action.payload.uid,
                email: action.payload.email,
                loading: false,
                logged: true,
            }
        case LOGGED_OUT:
            return{
                ...initialState
            }

        default: 
            return {...state}



    }



}


export default reducer