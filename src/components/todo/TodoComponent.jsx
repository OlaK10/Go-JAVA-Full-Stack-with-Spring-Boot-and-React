import React, {Component} from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoService from '../../API/todo/TodoDataService.js'
import AuthenticationService from '../../API/todo/AuthenticationService.js'

class TodoComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        
    }

    componentDidMount() {

        if (this.state.id===-1)
            return

        let username = AuthenticationService.getLoggedInUsername()
        TodoService.getTodo(username, this.state.id)
        .then(
            response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            })
        )
    }

    render() {
        //let description = this.state.description
        //let targetDate = this.state.targetDate
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{description,targetDate}} onSubmit={this.onSubmit} validate={this.validate} validateOnBlur={false} validateOnChange={false} enableReinitialize={true}>
                        {
                            (props) => (
                                <div>
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button> 

                                    </Form>
                                </div>
                            )

                        }
                    </Formik>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        
        let username = AuthenticationService.getLoggedInUsername()

        if (this.state.id === -1) {
            TodoService.addTodo(username, 
                {   
                    id: this.state.id,
                    description: values.description,
                    targetDate: values.targetDate
                }).then(() => {this.props.history.push("/todos")})
        } else {
            TodoService.updateTodo(username, this.state.id, 
                {   
                    id: this.state.id,
                    description: values.description,
                    targetDate: values.targetDate
                }).then(() => {this.props.history.push("/todos")})
        }
        
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter a description"
        } else if(values.description.length < 5) {
            errors.description = "Description should have at least 5 characters"
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid target date"
        }
        
        return errors
    }





} export default TodoComponent

