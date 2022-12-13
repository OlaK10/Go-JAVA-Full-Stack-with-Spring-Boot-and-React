import React, {Component} from 'react'
import {Redirect, Route} from 'react-router'
import AuthenticationService from '../../API/todo/AuthenticationService.js'


class AuthenticatedRoute extends Component {

    render() {
            if (AuthenticationService.isUserLoggedIn()) {
                // redirect to route
                return <Route {...this.props}/>
            } else {
                return <Redirect to="/login"/>
            }
    }
} export default AuthenticatedRoute


