import {ALERT} from './actionsType'



export const sendMessageForUser = alert =>{


    return{
        type: ALERT,
        payload: alert
    }


}