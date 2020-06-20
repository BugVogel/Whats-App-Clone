
import { createAppContainer} from 'react-navigation'
import {createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import  Home from './screens/Home'
import Chat from './screens/Chat'
import Contacts from './screens/Contacts'
import Login from './screens/Login'



const StackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { 
            title: 'Home',
            headerShown: false
        },
   
    },

    Chat:{
        screen: Chat,
        navigationOptions: {
            title: 'Teste de Chat',
            headerShown: false
                  
        }
    },

    Contacts:{
        screen: Contacts,
        navigationOptions:{
            title: 'Contacts',
            headerShown: false
        }


    },
    Login:{
        screen: Login,
        navigationOptions:{
            title: 'Login',
            headerShown: false
        }
    }

    
}, {
    initialRouteName: 'Login',
   
})




export default createAppContainer(StackNavigator)


