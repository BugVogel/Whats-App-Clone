import React, { Component } from 'react'
import {View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native'
import Header from '../components/Header'
import BallonMessage from '../components/BallonMessage'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {getMessages,sendMessage} from '../storage/actions/chat'



const initialState = {
    id: Math.random(),
        message: {
            text: '',
            img: null,
            senderId: null,
            receiverId: null,
        },
       
    
}





class Chat extends Component{



    state={
        ...initialState

    }


    componentDidMount = () =>{



        this.props.onGetCurrentMessages(this.props.id,this.props.navigation.state.params.receiverId)
      


    }


    goBack = ()=> {

        this.props.navigation.navigate('Home')

    }


    sendMessageWithImage = () => {




    }


    sendMessage =  () =>{

    
        this.props.onSendMessage(this.props.id,this.props.navigation.state.params.receiverId, this.state.message)
        console.log(this.props.currentMessages)
        this.setState({...initialState})

    }


    render(){

       console.log(this.props.currentMessages)

        let view = this.props.currentMessages.map( (props, key) => {
        
            return(

            <BallonMessage key={key} myMessage = { this.props.currentMessages[key].senderId === this.props.id ? 
                true : null} message={this.props.currentMessages[key].text} image={this.props.currentMessages[key].picture} />

            )
            


        })
        
            
    

     
            

        


        return (

            <View style={styles.container}>
                <Header name={this.props.navigation.state.params.name} goBack={this.goBack} />
                <View style={styles.messagensContainer}>
                    <ImageBackground style={{width: '100%', flex:1, justifyContent: 'flex-end'}} source={require('../../assets/imgs/wallpaper.png')} >
                   
                        <ScrollView  style={{flex:2}}>

                            
                            {view}
                           
                       
                        </ScrollView>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder={'Digite uma mensagem...'} value={this.state.message.text} onChangeText={text => this.setState({  message:{text, senderId:this.props.id,receiverId: this.props.navigation.state.params.receiverId}})} onSubmitEditing={this.sendMessage} />
                            <TouchableOpacity onPress={this.sendMessageWithImage}>
                                <Icon name="paperclip" size={25} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
               
            </View>

        );



    }


}


const styles = StyleSheet.create({

    container:{
        flex:1

    },
    
     messagensContainer:{
        flex:1
     },
     inputContainer:{
        backgroundColor: 'white',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40
       
       

     }
    
    


})



const mapStateToProps = ({user, chat}) =>{


    return{
        id: user.id,
        currentMessages : chat.currentMessages

    }

}


const mapDispatchToProps = dispatch => {

    return{

        onGetCurrentMessages: (senderId, receiverId) => dispatch(getMessages(senderId,receiverId)),
        onSendMessage: (senderId,receiverId,msg) => dispatch(sendMessage(senderId,receiverId,msg))

    }

}



export default connect(mapStateToProps,mapDispatchToProps)(Chat)