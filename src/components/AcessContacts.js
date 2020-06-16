import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'

import commom from '../common'

import Icon from 'react-native-vector-icons/FontAwesome'


export default AcessContacts = props => {

    
    return(
        

        <TouchableOpacity onPress={() => props.navigation.navigate('Contacts')} style={styles.container}>

            <Icon  name={'address-book'} size={20} color={'white'}/>
        </TouchableOpacity>
      
    )



}


const styles = StyleSheet.create({

    container:{
        backgroundColor: commom.colors.secundary,
        padding:10,
        borderRadius: 25,
        height: 45,
        width:45,
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'

    }



})