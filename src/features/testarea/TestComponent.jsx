import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';

const mapStateToProps = (state) => ({
    // Have to use test because that's what its called in our root reducer
    data: state.test.data
})

const mapDispatchToProps = {
    incrementCounter, 
    decrementCounter
}

class TestComponent extends Component {
    render() {
        const { data, incrementCounter, decrementCounter } = this.props;

        return (
            <div>
                <h1>Test Component</h1>
                <h2>The answer is: {data}</h2>
                <Button onClick={incrementCounter} positive content='Increment' />
                <Button onClick={decrementCounter} negative content='Decrement' />
            </div>
        )
    }
}

// Using mapDispatchToProps we are passing our actions to our connect function,
// the actions are then available as props in our component
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)

// We connect our components to the state through connect() which
// has the state that we want (mapStateToProps) as an argument, this is then
// passed into our component as props that we can then use