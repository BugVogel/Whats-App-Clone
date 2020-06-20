import {ALERT} from '../actions/actionsType'





const initialState = {

    title: '',
    text: ''

}


const reducer = (state = initialState, action) =>{


    switch(action.type){



        case ALERT : 
            return{
                ...state,
                title: action.payload.title,
                text: action.payload.text


            }

        default: 
            return {...state}


    }



}


export default reducer