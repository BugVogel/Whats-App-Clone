import React, {Component}  from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ActivityIndicatorComponent} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commom from '../common'
import { connect} from 'react-redux'
import {signIn, login} from '../storage/actions/user'
import {sendMessageForUser} from '../storage/actions/message'




const initialState = {

        name: '',
        email: '',
        password : '',
        confirmPassword: '',
        phone: '',
        registerMode: false,
    


}



class Login extends Component {


    state={
        ...initialState
    
    }


    componentDidUpdate = prevProps =>{

        if(   this.props.logged){
           
            this.props.navigation.navigate('Home')
        }

    }

    



    registerUser = () =>{


        if(this.state.password != this.state.confirmPassword){

            this.props.onSendMessageForUser({
                title: 'Problemas ao registrar',
                message: 'A confirmação de password falhou, confira os campos de senha'

            })
            this.setState({password: '', confirmPassword: ''})
            return

        }

        this.props.onRegisterUser({

            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone

        })

        this.setState({...initialState})
       

        


    }



    loginUser = () => {

        this.props.onLoginUser({...this.state})
        this.setState({...initialState})


    }



    render(){


    


        return(

            
            <View style={styles.container}>
                {this.props.loading == true ? <ActivityIndicator style={{flex:1}} size={'large'}/> : 
                <View style={styles.subContainer}>
                    <Icon  name={"whatsapp"} size={50} color={commom.colors.primary} />
                    <Text style={styles.title}>WHATS APP CLONE</Text>
                    <View style={styles.inputContainer}>
                        {this.state.registerMode == true ?  
                        <TextInput value={this.state.name} onChangeText={name => this.setState({name})} style={styles.input} placeholder={"Nome"}/>
                        : null
                        }
                        <TextInput value={this.state.email} onChangeText={email => this.setState({email})} style={styles.input} placeholder={"Email"}/>
                        <TextInput value={this.state.password} onChangeText={password => this.setState({password})} style={styles.input} secureTextEntry={true}  placeholder={"Senha"}/>
                        {this.state.registerMode ==true ? [
                        <TextInput key={'0'} secureTextEntry={true} value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({confirmPassword})} style={styles.input} placeholder={"Confirmar Senha"}/>,
                        <TextInput key={'1'} value={this.state.phone} onChangeText={phone => this.setState({phone})} style={styles.input} placeholder={"Telefone"}/>]
                        : null
                        }

                    </View>
                    <TouchableOpacity onPress={ this.state.registerMode != true ? this.loginUser :  this.registerUser} style={styles.loginButton}>
                        <Text style={styles.textLoginButton}>{this.state.registerMode != true ? 'Entrar' : 'Cadastrar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () =>  this.setState({registerMode: !this.state.registerMode})} style={styles.registerLinkContainer}>
                        <Text style={styles.registerText}>{this.state.registerMode == false ? 'Ainda não possui uma conta ?' : 'Já possui uma conta ?'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerLinkContainer}>
                        <Text style={styles.registerText}>Entrar com número de telefone</Text>
                    </TouchableOpacity>


                </View>
                }
            </View>

                    

        )




    }






}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:commom.colors.secundary,
        alignItems: 'center',
        justifyContent: 'center',
     
    },
    subContainer:{
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        marginBottom: 30
    },
    title:{
        fontSize: 20,
        marginBottom: 20,
        fontFamily: commom.fonts.primary,
        color:commom.colors.primary,
        marginTop: 10
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
      
       

    },
    input:{
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 15,
        padding: 7,
        borderRadius: 5,

    },
    registerText:{
        fontSize: 20,
        color: commom.colors.primary,

    },
    loginButton:{
        padding: 10,
        width: '95%',
        backgroundColor: commom.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
       
        
    },
    textLoginButton:{
        fontSize: 15,
        color:'white',

    },
    registerLinkContainer:{
        marginTop: 12,
    }



})


const mapStateToProps = ({user}) => {

    return{
        loading: user.loading,
        logged: user.logged

    }


}


const mapDispatchToProps = dispatch => {


    return {

        onRegisterUser: user => dispatch(signIn(user)),
        onSendMessageForUser: message => dispatch(sendMessageForUser(message)),
        onLoginUser: user => dispatch(login(user))

    }


}


export default connect(mapStateToProps,mapDispatchToProps)(Login)