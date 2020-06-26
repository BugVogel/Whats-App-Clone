import {SEND_MESSAGE, GET_FRIENDS_LIST,GET_CHATS, GET_MESSAGES} from '../actions/actionsType'
import { act } from 'react-test-renderer'



const initialState ={

    friendsList: [],
    chats: null,
    currentMessages: []

}


const reducer = (state = initialState, action) =>{

    
    switch(action.type){

        
        case GET_FRIENDS_LIST:
            return{
                ...state,
                friendsList: action.payload
            }

        case GET_MESSAGES:
            return{
                ...state,
                currentMessages:  action.payload
            }

        case SEND_MESSAGE:
            return{
                ...state,
                
            }

        case GET_CHATS:

            return{
                ...state,
                chats: action.payload
            }

        default:
            return state




    }



}

export default reducer