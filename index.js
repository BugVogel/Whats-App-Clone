

import 'react-native-gesture-handler';
import React from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import storageConfig from './src/storage/StorageConfig'
import App from './src/App'
import firebase from '@react-native-firebase/app'
import firebaseConfig from './firebaseConfig'


//{ Objeto de configuração para conectar a aplicação ao firebase

//    apiKey: 
//    databaseURL: 
//    messagingSenderId: 
//    projectId: 
//    appId: 
//    storageBucket: 
//}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig) //Inicializando o firebase conexão
}

const store = storageConfig()


const Redux = () =>(

    <Provider store={store}>
        <App />
    </Provider>



)




AppRegistry.registerComponent(appName, () => Redux);
