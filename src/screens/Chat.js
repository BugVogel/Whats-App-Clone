import React, { Component } from 'react'
import {View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native'
import Header from '../components/Header'
import BallonMessage from '../components/BallonMessage'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/FontAwesome'




const initialState = {
    id: Math.random(),
        message: {
            text: '',
            img: null,
            senderId: null,
            receiverId: null,
        },
        messages: [],
}





class Chat extends Component{



    state={
        ...initialState

    }


    goBack = ()=> {

        this.props.navigation.navigate('Home')

    }


    sendMessageWithImage = () => {




    }


    sendMessage =  () =>{

        let messages = this.state.messages

        messages.push({...this.state.message})

        this.setState({messages})


        this.setState({message:{text:''}})



    }


    render(){


        let view = []
        for(let i =0; i<this.state.messages.length; i++){
            
    

            view.push(<BallonMessage myMessage = { this.state.messages[i].senderId === this.state.id ?  true : null} message={this.state.messages[i].text} image={null} />)
            

        }


        return (

            <View style={styles.container}>
                <Header name={'Bruno Vogel'} goBack={this.goBack} />
                <View style={styles.messagensContainer}>
                    <ImageBackground style={{width: '100%', flex:1, justifyContent: 'flex-end'}} source={require('../../assets/imgs/wallpaper.png')} >

                        <ScrollView  style={{flex:2}}>

                            
                            {view}
                           
                       
                        </ScrollView>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder={'Digite uma mensagem...'} value={this.state.message.text} onChangeText={text => this.setState({  message:{text, senderId:this.state.id,receiverId: Math.random()}})} onSubmitEditing={this.sendMessage} />
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


export default Chat