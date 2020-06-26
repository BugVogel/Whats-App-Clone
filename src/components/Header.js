import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commom from '../common'
import {connect} from 'react-redux'
import {loggedOut} from '../storage/actions/user'



class Header extends Component {



    loggOut = () =>{


        this.props.onLoggedOut()
        this.props.goLogin()


    }

    
   render(){

    

    

    return(
        <View style={styles.container}>
            {this.props.name &&
            
                <TouchableOpacity style={styles.backButton }onPress={ () => this.props.goBack()}>
                    <Icon  name={'arrow-left'} size={20} color={'white'}/>
                </TouchableOpacity> 
            }
            <Text style={styles.title}>{this.props.name != null ? this.props.name : 'Whats app'}</Text>
            <View style={[styles.icons, {flex: this.props.name != null && this.props.contacts == null ? 2 : 1}]}>
                {this.props.name  && this.props.contacts == null && 
                
                <TouchableOpacity>
                    <Icon name={"video-camera"} size={20} color={'white'} />
                </TouchableOpacity>
                }
               
                <TouchableOpacity style={styles.search} >
                    <Icon name={this.props.name != null && this.props.contacts == null  ? 'phone' : 'search'} size={20} color="white"/>
                </TouchableOpacity >
                <TouchableOpacity onPress={this.loggOut} style={styles.config} >
                    <Icon name="sign-out" size={20} color="white"/>
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



const mapDispatchToProps = dispatch =>{


    return{

        onLoggedOut : () => dispatch(loggedOut())

    }

}


export default  connect(null,mapDispatchToProps)(Header)