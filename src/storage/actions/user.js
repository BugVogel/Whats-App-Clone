import { LOGGED,LOGGING, SIGNEDIN, SIGNINGIN, LOGGED_OUT} from "./actionsType"
import auth from '@react-native-firebase/auth'
import {sendMessageForUser} from './message'
import database from '@react-native-firebase/database';




export const login = user =>{

    return async  dispatch => {
        dispatch(userLogging())

        auth().signInWithEmailAndPassword(user.email,user.password)
        .catch(err => {
            sendMessageForUser({
                title: 'Erro de login',
                text: 'Email ou senha inválidos'
            })

        })
        .then(res => {


                dispatch(sendMessageForUser({
                    title: 'Bem vindo',
                    text: 'Login realizado com sucesso'

                }))
            
                dispatch(userLogged(res.user))
        })
        


    }
}


export const userLogged = user =>{

    return {
        type:LOGGED,
        payload: user

    }


}


export const userSigned = user =>{

    return{
        type: SIGNEDIN,
        payload: user

    }


}

export const userLogging = () =>{

    return{
        type:LOGGING
    }


}

export const loggedOut = () =>{
    return{
        type: LOGGED_OUT
    }

}

export const signIn = user => { //Cadastro

    return  async dispatch => {
        dispatch(userSigningIn())

       await  auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( async res => {
            const uid = res.user.uid
           


           await database().ref(`/users/${uid}/info`).set({
    
                phone: user.phone
                
            })
            .catch(err => {

                dispatch(sendMessageForUser({
                    text: 'Não foi possível cadastrar informações adicionais'
                }))

            })
            .then( () => {
                dispatch(sendMessageForUser({
                    text: 'Usuário cadastrado com sucesso!'
                }))
                dispatch(userSigned(user))

            })

        
        })
        .catch( error => {

            if (error.code === 'auth/email-already-in-use') {
                dispatch(sendMessageForUser({
                    text: 'Ops, Email já existe'
                }))
                return
              }
          
              if (error.code === 'auth/invalid-email') {
                dispatch(sendMessageForUser({
                    text: 'Ops, email inválido'
                }))
                return
              }
          
              console.error(error);

        })


    }


}


export const userSigningIn = () => {

    return{
        type: SIGNINGIN
    }


}
