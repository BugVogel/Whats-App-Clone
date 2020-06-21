

import 'react-native-gesture-handler';
import React from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import storageConfig from './src/storage/StorageConfig'
import App from './src/App'
import firebase from '@react-native-firebase/app'


if (!firebase.apps.length) {
    firebase.initializeApp({ //Inicialiando o firebase conexão

        apiKey: 'AIzaSyDckL4gx66mRNAier-TobJ9Kvk4nec3XN0',
        databaseURL: 'https://whatsappclone-7c027.firebaseio.com/',
        messagingSenderId: '528980778898',
        projectId: 'whatsappclone-7c027',
        appId: '1:528980778898:android:c451972431785ade68eb4b',
        storageBucket: 'gs://whatsappclone-7c027.appspot.com'
    })
}

const store = storageConfig()


const Redux = () =>(

    <Provider store={store}>
        <App />
    </Provider>



)




AppRegistry.registerComponent(appName, () => Redux);
