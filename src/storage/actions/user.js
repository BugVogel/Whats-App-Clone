import { LOGGED,LOGGING, SIGNEDIN, SIGNINGIN} from "./actionsType"
import auth from '@react-native-firebase/auth'




export const login = user =>{

    return  dispatch => {

        


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

export const signIn = user => {

    return dispatch => {
        dispatch(userSigningIn())

        auth.createUserWithEmailAndPassoword(user.email, user.password)
        .then( () => {

            console.log('Usuário Criado com sucesso!')
            dispatch(userSigned(user))
           

        })
        .catch( err => {

            if (error.code === 'auth/email-already-in-use') {
                console.log('Email já existe');
              }
          
              if (error.code === 'auth/invalid-email') {
                console.log('Email inválido');
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
