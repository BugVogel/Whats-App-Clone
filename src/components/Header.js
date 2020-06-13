import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commom from '../common'



class Header extends Component {

    
   render(){

    

    return(
        <View style={styles.container}>
            {this.props.name &&
            
                <TouchableOpacity style={styles.backButton }onPress={ () => this.props.goBack()}>
                    <Icon  name={'arrow-left'} size={20} color={'white'}/>
                </TouchableOpacity> 
            }
            <Text style={styles.title}>{this.props.name != null ? this.props.name : 'Whats app'}</Text>
            <View style={[styles.icons, {flex: this.props.name != null ? 2 : 1}]}>
                {this.props.name && 
                
                <TouchableOpacity>
                    <Icon name={"video-camera"} size={20} color={'white'} />
                </TouchableOpacity>
                }
               
                <TouchableOpacity style={styles.search} >
                    <Icon name={this.props.name != null ? 'phone' : 'search'} size={20} color="white"/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.config} >
                    <Icon name="ellipsis-v" size={20} color="white"/>
                </TouchableOpacity >
            </View>

        </View>


    )



   }

   


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
        alignItems: 'center'
        

        

    },
    backButton:{
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }




})


export default  Header