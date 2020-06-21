import {GET_CHATS, SEND_MESSAGE, GET_FRIENDS_LIST, GET_MESSAGES} from './actionsType'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import {sendMessageForUser} from './message'

export const getChats = id => {

    return dispatch => {

        database().ref(`/users/${id}/chats`).once('value')
        .then(snapshot => {

            console.log(snapshot.val())

        })


    }


}


export const sentMessage = payload =>{


    return{
        type:SEND_MESSAGE,
        payload

    }

}

export const sendMessage = (senderId,receiverId, msg) =>{

    return dispatch =>{



        let newReference = database().ref(`/users/${receiverId}/chats/${senderId}`).push()
        newReference.set(msg) //Coloca nas conversas do que envia

        newReference = database().ref(`/users/${senderId}/chats/${receiverId}`).push()
        newReference.set(msg) //coloca nas conversas do recebedor
        .then(() =>{

            

            dispatch(getMessages(senderId,receiverId))

        })


    }


}



export const gotMessages = messagesArray =>{


    return{
        type:GET_MESSAGES,
        payload: messagesArray
    }

}


export const getMessages = (senderId, receiverId) => {

    return dispatch =>{

        database().ref(`users/${senderId}/chats/${receiverId}`).once('value')
        .catch( err => {
            sendMessageForUser({text: 'Houve um problema na conexão com o servidor'})
        })
        .then( snapshot => {

            let messages = snapshot.val() || []
            let messagesArray = []
            

            for(var key in messages){

                messagesArray.push({...messages[key]})


            }
            
            
            dispatch(gotMessages(messagesArray.reverse()))
            

        })

        
    }

}



export const createListFriends = friendsList =>{



    return{
        type:GET_FRIENDS_LIST,
        payload: friendsList

    }

}


export const listFriends = contactsList => {


    return dispatch =>{

        database().ref(`/users`).once('value')
        .then( snapshot => {
     

            let val = snapshot.val();
            let friendsList = []

            contactsList = contactsList.map( item => {

                   return {
                       id: null,
                       ...item,
                       haveWhatsAppAccount: false
                   } 
            })
            
            
           for(var key in val){

                
                for(var i =0; i<contactsList.length; i++){
                   
                    
                    if(val[key].info.phone == contactsList[i].phoneNumbers[0].number){
                        
                         contactsList[i] = { ...contactsList[i], haveWhatsAppAccount: true, id:key}
                    }
                }
           }
           
         
           
           dispatch(createListFriends(contactsList))

        })

    }


}




