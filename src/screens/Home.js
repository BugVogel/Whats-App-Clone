
import React, {Component} from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Image,
TextInput
} from 'react-native';

import Header from '../components/Header' 
import Menu from '../components/Menu'
import GeneralItem from '../components/GeneralItem'

import AcessContacts from '../components/AcessContacts'


import ImagePicker from 'react-native-image-picker'
import  Icon  from 'react-native-vector-icons/FontAwesome';


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


 
    render(){



      let view = this.state.imageStatus == null ?
      <View style={styles.container}>
            <Header name={null} goBack={null} />
            <Menu window={this.state.window}  updateWindow={this.updateWindow}/>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Chat')}>
              <GeneralItem lastMessage={'Fala mano...'} image={require('../../assets/imgs/bugPerfil.png')} name={'Bruno Vogel'} timeLastMessage={'14:30'} numMesages={5} type={this.state.window}/>
            </TouchableOpacity>
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

export default Home;
