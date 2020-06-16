import React,{ Component  } from "react";
import { View,Text,StyleSheet, PermissionsAndroid, Alert, FlatList, TouchableOpacity } from "react-native";
import Header from '../components/Header'
import ContactsAPI from 'react-native-contacts';
import GeneralItem from "../components/GeneralItem";





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
               
                    this.setState({contactsList})
                    
                
              }
            })
          
        
        
        })




    }



    render(){

        return(
            <View style={styles.container}>
                <Header contacts name={'Contatos'} goBack={() => this.props.navigation.navigate('Home')} />
                <FlatList keyExtractor={ item => item.phoneNumbers[0].number} data={this.state.contactsList} 
                renderItem={ 
                    item =>
                    <TouchableOpacity onPress ={() => this.props.navigation.navigate('Chat')}>
                        <GeneralItem  image={require('../../assets/imgs/bugPerfil.png')} 
                        name={item.item.displayName}   type={'contacts'} />   
                    </TouchableOpacity>
                    } />

            </View>


        )


    }



}


const styles = StyleSheet.create({




})




export default Contacts