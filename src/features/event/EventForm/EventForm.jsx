import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';
import cuid from 'cuid';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0]
    }    

    return {
        event
    }
}

const actions = {
    createEvent,
    updateEvent,
    deleteEvent
}

class EventForm extends Component {
    state = { ...this.props.event }

    componentDidMount() {
        if (this.props.selectedEvent !== null) {
            this.setState({
                // The spread operator spreads out all the 
                // individual properties of the object
                ...this.props.selectedEvent
            })
        }
    }

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.id) {
            this.props.updateEvent(this.state)
            this.props.history.push(`/events/${this.state.id}`)
        } else {
            const newEvent = {
                ...this.state,
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            }
            this.props.createEvent(newEvent)   
            this.props.history.push(`/events`)
        }
    }

    handleInputChange = (e) => {
        this.setState({
            // Since we named our input we can reference it with
            // object bracket notation through the event object
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { title, date, city, venue, hostedBy } = this.state;

        return (
            <Segment>
                <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
                    <Form.Field>
                        <label>Event Title</label>
                        <input 
                            name='title'
                            onChange={this.handleInputChange}
                            value={title}
                            placeholder="Event Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input 
                            type="date" 
                            placeholder="Event Date"
                            name='date'
                            onChange={this.handleInputChange}
                            value={date} />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input
                            name='city'
                            onChange={this.handleInputChange}
                            value={city}
                            placeholder="City event is taking place" />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input 
                            name='venue'
                            onChange={this.handleInputChange}
                            value={venue}
                            placeholder="Enter the Venue of the event" />
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input 
                            name='hostedBy'
                            onChange={this.handleInputChange}
                            value={hostedBy}
                            placeholder="Enter the name of person hosting" />
                    </Form.Field>
                        <Button positive type="submit">
                        Submit
                        </Button>
                        {/* history.goBack uses the browser history to go back to the previous page */}
                    <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
            </Segment>
        )
    }
}

export default connect(mapStateToProps, actions)(EventForm);

// We imported the actions we created and then put them into an action object,
// which we then connected to redux by passing it in to connect()