import React, {Component} from 'react'
import AuthenticationService from '../../API/todo/AuthenticationService.js'
import { ErrorMessage, Field, Form, Formik } from 'formik'


class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ' ',
            password: ' '
        }

        this.validate = this.validate.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }


    validate(values) {
        
        console.log(values)

        let errors = {}
        if(values.password.length < 5) {
            errors.password = "Password should have at least 5 characters"
        }

        return errors
    }

    loginClicked(values) {
        /* 
        AuthenticationService.executeBasicAuthService(values.username, values.password)
        .then(() => {
            AuthenticationService.registerSuccessfulLogin(values.username, values.password)
            this.props.history.push(`/welcome/${values.username}`)}
        )
        .catch(() => {
            console.log("There is an auth problem")}
        ) */

        AuthenticationService.executeJWTAuthService(values.username, values.password)
        .then((response) => {
            AuthenticationService.registerSuccessfulLoginJWT(values.username, response.data.token)
            this.props.history.push(`/welcome/${values.username}`)}
        )
        .catch(() => {
            console.log("There is an auth problem")}
        )

    }

    render() {
        let username = ""
        let password = ""
        return ( 
            <div>
                <h1>Login</h1>
                <div className="container">
                    <Formik initialValues={{username, password}} onSubmit={this.loginClicked} validate={this.validate} validateOnBlur={false} validateOnChange={false} enableReinitialize={true}>
                            {
                                (props) => (
                                    <div>
                                        <Form>
                                            <ErrorMessage name="username" component="div" className="alert alert-warning"/>
                                            <ErrorMessage name="password" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Username</label>
                                                <Field className="form-control" type="text" name="username"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Password</label>
                                                <Field className="form-control" type="password" name="password"/>
                                            </fieldset>
                                            <button className="btn btn-success" type="submit">Login</button> 

                                        </Form>
                                    </div>
                                )
                            }
                        </Formik>
                </div>
            </div> 
        )
    }


} export default LoginComponent