import   thunk from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import user from './reducers/user'
import messageForUser from './reducers/message'




const reducers = combineReducers({

    user: user,
    messageForUser: messageForUser

})


const storageConfig = () => {

    return createStore(reducers, compose(applyMiddleware(thunk)))

}


export default storageConfig