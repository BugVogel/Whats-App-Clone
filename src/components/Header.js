import React from 'react'
import {
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commom from '../common'



const Header = props => {

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Whats app</Text>
            <View style={styles.icons}>
                <TouchableOpacity style={styles.search} >
                    <Icon name="search" size={20} color="white"/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.config} >
                    <Icon name="ellipsis-v" size={20} color="white"/>
                </TouchableOpacity >
            </View>

        </View>


    )


}



const styles = StyleSheet.create({

    container:{
        backgroundColor:commom.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,


    },
    title:{
        fontSize: 20,
        color: 'white',
        flex:7
    

    },
    icons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1

        

    },




})


export default  Header