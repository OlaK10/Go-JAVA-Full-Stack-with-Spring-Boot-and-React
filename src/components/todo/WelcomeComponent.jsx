import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import HelloWorldService from '../../API/todo/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            welcomeMsg: ""
        }

        this.getWelcomeMsg = this.getWelcomeMsg.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleErrorResponse = this.handleErrorResponse.bind(this)
    }


    render() {
        return ( 
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}, See your todos <Link to="/todos">here</Link>
            </div>
            <div>
                Click here to get a custom message.
            </div>
            <div className="container"><button onClick={this.getWelcomeMsg} className="btn btn-success">Get msg</button></div>
            <div className="container">
                {this.state.welcomeMsg}
            </div>
              
            </> 
        )
    }

    getWelcomeMsg() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleErrorResponse(error))

    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMsg: response.data.msg})
    }

    handleErrorResponse(error) {
        console.log(error.response.data.message)
        let errorMsg = ""
        if (error.message) 
            errorMsg += error.message;
        if (error.response && error.response.data)
            errorMsg += error.response.data;

        this.setState({welcomeMsg: errorMsg})
    }



} export default WelcomeComponent