import React , {Component} from 'react'
import {Alert} from 'react-native'
import {connect} from 'react-redux'
import Navigator from './Navigator'
import {sendMessageForUser} from './storage/actions/message'




class App extends Component {


    componentDidUpdate = () => {

        if(this.props.text && this.props.text.trim()){

            Alert.alert(this.props.title || 'Mensagem', this.props.text)
            this.props.onClearMessageForUser()


        }


    }


    render(){


        return(
            <Navigator /> 
        )



    }



}



const mapDipatchToProps = dispatch => {

    
    return{

        onClearMessageForUser : () => dispatch(sendMessageForUser({

            title: '',
            text: ''

        }))
        
    }
        

}

const mapStateToProps = ({messageForUser}) =>{

    return {

        title: messageForUser.title,
        text: messageForUser.text


    }

}


export default connect(mapStateToProps,mapDipatchToProps)(App)