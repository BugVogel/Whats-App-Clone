import React, { Component } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commom from '../common'




class GeneralItem extends Component {


    






    render(){

        let info = null

        if(this.props.type  == 'chats' ){
            info =  
            <View style={styles.infoContainer}>
                <Text style={styles.hourText}>{this.props.timeLastMessage}</Text>
                <View style={styles.numMessagesContainer}>
                    <Text style={styles.numMessages}>{this.props.numMesages}</Text>
                </View> 
            </View>
        }
        else if( this.props.type == 'status' ){
          info =   <View style={{alignItems: 'center', justifyContent: 'center', borderBottomWidth:0.3, borderBottomColor: commom.colors.third}}>
                    </View>
        }
        else if(this.props.type == 'calls'){
           info = 
           
                <Icon  name={'phone'} size={20} color={commom.colors.primary}/>
      
           
        }
        else if( this.props.type == 'contacts' && !this.props.haveWhatsAppAccount){

            info=
            <View style={styles.infoContainer}>
                <Text style={{color:'black', flex:1}}>Sem cadastro</Text>

            </View>
                

        }
        

        return(

        <View style={styles.container}>
            <View style={[styles.imageContainer, this.props.type == 'status' ? styles.imageStatus : null]}>
                <Image source={this.props.image} style={styles.image} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.props.name}</Text>
                <Text style={styles.subTitleText}>{ this.props.lastMessage}</Text>
            </View>
            
                { info }
            
        </View>

        )
     



    }



}


const styles = StyleSheet.create({

    container:{

        flexDirection: 'row',
        padding: 15,
        

    },

    imageContainer:{
     
        height: 45,
        width: 45,
    },
    image:{
        resizeMode: 'contain',
        borderRadius: 700,
        height: 35,
        width: 35,
       
     
    },
    imageStatus:{
       
        borderColor: commom.colors.primary,
        borderWidth: 2,
        borderRadius:30,
        height: 50,
        width: 50,
    },
    titleContainer:{
        flex:4,
        borderBottomColor: commom.colors.third,
        borderBottomWidth: 0.3,
        marginLeft: 10,
    },
    titleText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    subTitleText:{
        fontSize: 12,
        color: commom.colors.third
    },
    infoContainer:{
        alignItems: 'center',
        borderBottomColor: commom.colors.third,
        borderBottomWidth: 0.3,
    },
    hourText:{
        color: commom.colors.secundary
    },
    numMessagesContainer:{
        backgroundColor: commom.colors.secundary,
        borderRadius: 10,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    numMessages: {
        color:'white',
     
    },
    


})



export default GeneralItem