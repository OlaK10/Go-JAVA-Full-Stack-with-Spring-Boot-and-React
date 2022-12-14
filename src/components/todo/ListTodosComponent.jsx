import React, {Component} from 'react'
import TodoService from '../../API/todo/TodoDataService.js'
import AuthenticationService from '../../API/todo/AuthenticationService.js'
import moment from 'moment'


class ListTodosComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [], 
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        
    }

    componentDidMount() {
        // make a call to the API and refresh the todos
        this.refreshTodos();
    }


    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUsername();
        console.log("ID: " + id + " " + username);
        TodoService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message: `Delete of todo ${id} was successful.`})
            }
        )
    }

    updateTodoClicked(id) {
        //route to TodoComponent
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked() {
        console.log("new todo")
        this.props.history.push(`/todos/-1`)
    }
    

    refreshTodos(id) {
        let username = AuthenticationService.getLoggedInUsername();
        TodoService.retrieveAllTodos(username)
        .then(response => {
                //console.log(response)
                this.setState({todos: response.data})
                this.refreshTodos();
        })
    }


    render() {
        return ( 
            <div>
                <h1>List Todos!</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Completed?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(todo =>
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            </tr>)
                        }
                        
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={() => this.addTodoClicked()}>Add</button>
                </div>
                </div>
            </div> 
        )
    }







} export default ListTodosComponent