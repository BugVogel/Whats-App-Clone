
import React, {Component} from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity
} from 'react-native';

import Header from '../components/Header' 
import Menu from '../components/Menu'
import GeneralItem from '../components/GeneralItem'
import ContactsButton from '../components/ContactsButton'



class Home extends Component  {


    state={
      window: 'chats'

    }


    updateWindow = window => {


     
      this.setState({window})

      
    }
 
    render(){
      

      return(

        <View style={styles.container}>
            <Header name={null} goBack={null} />
            <Menu updateWindow={this.updateWindow}/>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Chat')}>
              <GeneralItem image={require('../../assets/imgs/bugPerfil.png')} name={'Bruno Vogel'} timeLastMesage={'14:30'} numMesages={5} type={this.state.window}/>
            </TouchableOpacity>
            <ContactsButton />
            
        </View>
      )


    }

};

const styles = StyleSheet.create({

    container:{
        flex:1,

    }
  
});

export default Home;
