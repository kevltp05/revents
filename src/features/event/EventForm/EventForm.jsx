import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
    state = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.props.createEvent(this.state)
    }

    handleInputChange = (e) => {
        this.setState({
            // Since we named our input we can reference it with
            // object bracket notation through the event object
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { cancelFormOpen } = this.props;
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
                    <Button type="button" onClick={cancelFormOpen}>Cancel</Button>
            </Form>
            </Segment>
        )
    }
}

export default EventForm;
