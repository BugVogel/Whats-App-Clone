import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import common from '../common'





class Menu extends Component {

  

    state={

        window: 'chat'

    }


    updateButton = window => {


       this.setState({window})
        this.props.updateWindow(window)

    }



    render(){

        return(

            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.updateButton('camera')} style={[styles.cameraIcon, this.state.window == 'camera' ? styles.selected : null]}>
                    <Icon name="camera" size={20} color={"white"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateButton('chats')} style={[styles.option, this.state.window == 'chat' ? styles.selected : null]}>
                    <Text style={styles.textOption}>Conversas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateButton('status')} style={[styles.option, this.state.window == 'status' ? styles.selected : null]}>
                    <Text style={styles.textOption}>Status</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateButton('calls')} style={[styles.option, this.state.window == 'chamadas' ? styles.selected : null]}>
                    <Text style={styles.textOption}>Chamadas</Text>
                </TouchableOpacity>
            </View>


        )


    }


}



const styles = StyleSheet.create({


    container:{
        backgroundColor: common.colors.primary,
        flexDirection: 'row',
    
     


    },
    cameraIcon:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
      
        
    },
    option:{
        flex:4,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    selected:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    textOption:{
        color: 'white'
    }


})


export default Menu