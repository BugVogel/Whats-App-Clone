import React from 'react'
import { createAppContainer} from 'react-navigation'
import {createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import  Home from './screens/Home'
import Chat from './screens/Chat'



const StackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { 
            title: 'Home1',
            headerShown: false
        },
   
    },

    Chat:{
        screen: Chat,
        navigationOptions: {
            title: 'Teste de Chat',
            headerShown: false
                  
        }
    }

    
}, {
    initialRouteName: 'Home',
   
})




export default createAppContainer(StackNavigator)


