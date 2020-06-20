import {SIGNINGIN, LOGGED,LOGGING, SIGNEDIN} from '../actions/actionsType'


const initialState= {

    email: null,
    loading: false

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
                email: action.payload.email,
                loading:false
            }
        case LOGGING:
            return{
                ...state,
                loading: true,
            } 

        case LOGGED:
            return{
                ...state,
                email: action.payload.email,
                loading: false,
            }

        default: 
            return {...state}



    }



}


export default reducer