import React from 'react'
import {  StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons'
import commom from '../common'



export default  ContactsButton = props =>{

    return(

        <TouchableOpacity style={styles.container}>
            <Icon name={"address-book"} size={20} color={'white'}/>
        </TouchableOpacity>


    )


}


const styles = StyleSheet.create({

    container:{
        borderRadius: 25,
        height: 50,
        width: 50,
        backgroundColor: commom.colors.secundary,
        position: 'absolute'
    }



})

