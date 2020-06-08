
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
            <Header  />
            <Menu updateWindow={this.updateWindow}/>
            <TouchableOpacity>
              <GeneralItem image={require('../../assets/imgs/bugPerfil.png')} name={'Bruno Vogel'} timeLastMesage={'14:30'} numMesages={5} type={this.state.window}/>
              <GeneralItem image={require('../../assets/imgs/blankProfile.jpg')} name={'Alicia Gomes'} timeLastMesage={'19:21'} numMesages={10} type={this.state.window}/>
            </TouchableOpacity>
            
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
