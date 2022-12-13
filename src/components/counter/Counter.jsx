import React, {Component} from 'react'
import './Counter.css'
import PropTypes from 'prop-types'


class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);
    }

    increment(by) { 
        console.log(`increment - ${by}`);
        
        this.setState(
            
            (prevState) => {
            return {counter: prevState.counter + by}
            }
        )
    
    }

    reset() {
        
        this.setState({
            counter: 0
        })


    }

    render() {
        return (
          <div className="counter">

            <div className="counters">
                <div className="counter_add">
                    <CounterButton by={1} incrementMethod={this.increment}/>
                    <CounterButton by={5} incrementMethod={this.increment}/>
                    <CounterButton by={10} incrementMethod={this.increment}/>
                </div>
                <div className="counter_sub">
                    <CounterButton by={-1} incrementMethod={this.increment}/>
                    <CounterButton by={-5} incrementMethod={this.increment}/>
                    <CounterButton by={-10} incrementMethod={this.increment}/>
                </div>
            </div>
            
            <span className="count">{this.state.counter}</span>
            <button className="reset" onClick={this.reset}>Reset</button>

          </div>
          
        );
    }


}





class CounterButton extends Component {

    // Define the initial state in the constructor
    // state: counter = 0;

    constructor() {
        super();
        this.state = {
            counter: 0
        }
        // method binding
        this.increment = this.increment.bind(this);
    }


    render() {
        return ( 
            <div className="counter">
                <button onClick={this.increment}>{this.props.by}</button>
            </div>
        )
    }

    increment() { // Update state
        this.setState({
            counter: this.state.counter + this.props.by
        })
        this.props.incrementMethod(this.props.by);
    }
    
}

// setting default properties for the objects
CounterButton.defaultProps = {
    by : 1
}

// setting type checks
CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter