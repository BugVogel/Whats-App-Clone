

import 'react-native-gesture-handler';
import React from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import storageConfig from './src/storage/StorageConfig'
import App from './src/App'

const store = storageConfig()


const Redux = () =>(

    <Provider store={store}>
        <App />
    </Provider>



)




AppRegistry.registerComponent(appName, () => Redux);
