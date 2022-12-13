import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from '../../API/todo/AuthenticationService.js'
import { withRouter } from 'react-router';

class HeaderComponent extends Component {

    render() {

        let userLogged = AuthenticationService.isUserLoggedIn();
        console.log(userLogged);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="http://www.google.com" className="navbar-brand">TODO APP</a>
                    </div>
                    <ul className="navbar-nav">
                        {userLogged && <li><Link className="nav-link" to="/welcome/Ola">Home</Link></li>}
                        {userLogged && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!userLogged && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {userLogged && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
            
        )
    }

} export default withRouter(HeaderComponent);