import React,{ Component  } from "react";
import { View,Text,StyleSheet, PermissionsAndroid, Alert, FlatList, TouchableOpacity } from "react-native";
import Header from '../components/Header'
import ContactsAPI from 'react-native-contacts';
import GeneralItem from "../components/GeneralItem";
import {listFriends} from '../storage/actions/chat'
import { connect} from 'react-redux'
import {sendMessageForUser} from '../storage/actions/message'





class Contacts extends Component{


    state ={

        contactsList : null

    }

    componentDidMount = () =>{

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'This app would like to view your contacts.',
              buttonPositive: 'Please accept bare mortal'
            }
          ).then(() => {
            ContactsAPI.getAll((err, contactsList) => {


              if (err === 'denied'){
                Alert.alert('Houve um problema', 'Não foi possivel obter os contatos do celular, acesso negado')
              } else {
               
                    const listPhones = contactsList.map( item => {

                      return item.phoneNumbers[0].number

                    })
            
                    this.props.getListFriends(contactsList)

                    
                    
                
              }
            })
          
        
        
        })




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
                <FlatList keyExtractor={ item => item.key} data={this.props.friendsList} 
                renderItem={ 
                    item =>

                  <TouchableOpacity onPress ={() => this.createChat(item.item.haveWhatsAppAccount, item.item.id,item.item.displayName )}>
                      <GeneralItem  image={require('../../assets/imgs/bugPerfil.png')} 
                      name={item.item.displayName} haveWhatsAppAccount={item.item.haveWhatsAppAccount}   type={'contacts'} />   
                  </TouchableOpacity>

                    } />

            </View>


        )


    }



}



const styles = StyleSheet.create({

  container:{

  }

})



const mapStateToProps = ({chat}) =>{

  return{

    friendsList: chat.friendsList

  }


}





const mapDispatchToProps = dispatch =>{


  return{

    getListFriends: listPhones => dispatch(listFriends(listPhones)),
    onSendMessageForUser: message => dispatch(sendMessageForUser(message))

  }

}




export default connect(mapStateToProps, mapDispatchToProps)(Contacts)