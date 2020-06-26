import React,{ Component  } from "react";
import { View,Text,StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import Header from '../components/Header'

import GeneralItem from "../components/GeneralItem";

import { connect} from 'react-redux'
import {sendMessageForUser} from '../storage/actions/message'





class Contacts extends Component{


    state ={

        contactsList : null

    }

    componentDidMount = () =>{

        




    }



    createChat = (haveWhatsAppAccount, id, name) =>{

     
      if(!haveWhatsAppAccount){
       
          this.props.onSendMessageForUser({
            title: 'Ops',
            text: 'Este usuário não possui conta no whats app clone, tente outro'
          })
          return

      }

      this.props.navigation.navigate('Chat',{receiverId:id,name})

  


    }



    render(){

      
        return(
            <View style={styles.container}>
                <Header contacts name={'Contatos'} goBack={() => this.props.navigation.navigate('Home')} />
                <FlatList keyExtractor={ item => item.id} data={this.props.friendsList} 
                renderItem={ 
                    item =>{

                  if(item.item.id == this.props.id){
                    return null
                  }

              return(   
                  <TouchableOpacity onPress ={() => this.createChat(item.item.haveWhatsAppAccount, item.item.id,item.item.displayName )}>
                      <GeneralItem  image={require('../../assets/imgs/blankProfile.jpg')} 
                      name={item.item.displayName} haveWhatsAppAccount={item.item.haveWhatsAppAccount}   type={'contacts'} />   
                  </TouchableOpacity>
                  )

                  }} />

            </View>


        )


    }



}



const styles = StyleSheet.create({

  container:{

  }

})



const mapStateToProps = ({chat, user}) =>{

  return{

    friendsList: chat.friendsList,
    id: user.id

  }


}





const mapDispatchToProps = dispatch =>{


  return{

   
    onSendMessageForUser: message => dispatch(sendMessageForUser(message))

  }

}




export default connect(mapStateToProps, mapDispatchToProps)(Contacts)