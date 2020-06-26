import {GET_CHATS, SEND_MESSAGE, GET_FRIENDS_LIST, GET_MESSAGES} from './actionsType'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import {sendMessageForUser} from './message'
import moment from 'moment'




export const getChats = id => {


    return dispatch => {

       

        database().ref(`/users/${id}/chats`).orderByChild('timeLastMessage').once('value')
        .then(snapshot => {

           let chats =  snapshot.val()
           let chatsArray = []

           
           

            for(var key in chats){ //Coloca o parametro da ultima mensagem enviada

                

                let chat = chats[key]
                let msgArray = chat[Object.keys(chat).reverse()[Object.keys(chat).length-2]]
                let lastMessage = msgArray[Object.keys(msgArray)[0]]
                let phone = null
                let index = key

               
                //console.log(url)
                //console.log(chats[key])
                
                database().ref(`/users/${key}/info`).once('value')
                .then(info =>{

                    phone =info.val().phone
                    chats[index].phone = phone
                    chats[index].lastMessage =  lastMessage
                    chatsArray.push([index, chats[index]])
              
                    dispatch(setChats(chatsArray))
                    
                })
                
            }

          
            
           

            
                 
         






        })


    }


}

export const setChats = chats => {

    return{
        type:GET_CHATS,
        payload: chats

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

        let time =  moment(new Date()).utc().format('DD-MM-YYYY/HH:mm/ss')

        let newReference = database().ref(`/users/${receiverId}/chats/${senderId}`).push()
        newReference.set(msg) //Coloca nas conversas do que envia

        newReference = database().ref(`/users/${senderId}/chats/${receiverId}`).push()
        newReference.set(msg) //coloca nas conversas do recebedor
        .then(() =>{
            dispatch(getMessages(senderId,receiverId))

        })


        //Setando o horário de envio da ultima mensagem
        database().ref(`/users/${receiverId}/chats/${senderId}`).update({
            timeLastMessage: time
        })
        database().ref(`/users/${senderId}/chats/${receiverId}`).update({
            timeLastMessage: time
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
            
            messagesArray.shift()
            
            dispatch(gotMessages(messagesArray.reverse()))
            dispatch(getChats(senderId))
            

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




