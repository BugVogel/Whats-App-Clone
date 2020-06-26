
import React, {Component} from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Image,
TextInput,
PermissionsAndroid,
FlatList
} from 'react-native';
import Header from '../components/Header' 
import Menu from '../components/Menu'
import GeneralItem from '../components/GeneralItem'
import AcessContacts from '../components/AcessContacts'
import ImagePicker from 'react-native-image-picker'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {getChats} from '../storage/actions/chat'
import ContactsAPI from 'react-native-contacts';
import {listFriends} from '../storage/actions/chat'


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
 
  };


  const initialState = {

    window: 'chats',
    imageStatus :null,
    subtitleStatus: null
  }




class Home extends Component  {


    state={
      ...initialState
    }



    componentDidMount= () =>{


      this.props.onGetChats(this.props.id) //Get chats


      PermissionsAndroid.request( //Get contacts list
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
      
    }) //End request



  






    }
   


    updateWindow = window => {


     
      this.setState({window})

      if(window == 'camera'){

        this.setStatus()
      }

      
    }


    setStatus = () =>{

      ImagePicker.showImagePicker(options, (response) => {
       
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
          this.setState({window: 'chats'})
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          this.setState({window: 'chats'})
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
         const imageStatus = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            imageStatus,
            window: 'chats'
          });
          

        }
      });


    }


    closeImageStatus = () =>{

      this.setState({imageStatus:null, subtitleStatus: null})

    }


    sendStatus = () =>{

      this.setState({...initialState})

    }



    createChat = (id, name) => {

      this.props.navigation.navigate('Chat',{receiverId:id,name})



    }


 
    render(){

    
      //console.log(this.props.friendsList)

      let view = this.state.imageStatus == null ?
      <View style={styles.container}>
            <Header goLogin={() => this.props.navigation.navigate('Login')} name={null} goBack={null} />
            <Menu window={this.state.window}  updateWindow={this.updateWindow}/>
            <FlatList keyExtractor={item => item[0]} data={this.props.chats} renderItem={item =>{

      
            
              let name = null
        

              for(var i=0; i< this.props.friendsList.length; i++){

                
                if(item.item[0] == this.props.friendsList[i].id){
                  name = this.props.friendsList[i].displayName
                  break;
                }


              }

              //console.log(item)
  
              return (
              <TouchableOpacity onPress={() => this.createChat(item.item[0], name || item.item[1].phone) }>
                <GeneralItem  lastMessage={item.item[1].lastMessage} image={require('../../assets/imgs/blankProfile.jpg')} name={name || item.item[1].phone} timeLastMessage={item.item[1].timeLastMessage.split('/')[1]} numMesages={Object.keys(item.item[1]).length-3} type={this.state.window}/>
              </TouchableOpacity>
              )
              
              

            }} />


            <AcessContacts navigation={this.props.navigation} />
        </View>
      
        :
        <View style={styles.containerImageStatus}>
        <TouchableOpacity onPress={this.closeImageStatus} style={styles.closeImageButton}>
          <Icon  name={'close'} size={20} color={'black'}  />
        </TouchableOpacity>
        <Image style={{flex:1}} source={this.state.imageStatus} /> 
    
        <View style={styles.subtitleStatus}>
          <TextInput onSubmitEditing={ this.sendStatus} placeholderTextColor="white"  style={{marginLeft: 10, color:'white'}} placeholder={"Digite uma legenda para a foto..."}  value={this.state.subtitleStatus} onChangeText={subtitleStatus => this.setState({subtitleStatus})} />
        </View>
      
      </View>

      
        
       




      return(
        <View style={{flex:1}}>
          {view}
        </View>
      )


    }

};

const styles = StyleSheet.create({

    container:{
        flex:1,

    },
    containerImageStatus:{
      flex:1
    },
    closeImageButton:{
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: 1,
      opacity: 0.5
    },
    subtitleStatus:{

      position:'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: 'black',
      opacity: 0.7,

    },
  
  
});



const mapStateToProps = ({user, chat}) =>{

  return{

      id: user.id,
      chats:chat.chats,
      friendsList: chat.friendsList

  }



}


const mapDispatchToProps = dispatch =>{


  return{

    onGetChats: id => dispatch(getChats(id)),
    getListFriends: listPhones => dispatch(listFriends(listPhones)),

  }



}

export default  connect(mapStateToProps,mapDispatchToProps)(Home);
