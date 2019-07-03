import React, { Component } from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {
        // title: '',
        // date: '',
        // city: '',
        // venue: '',
        // hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0]
    }    

    // We are using the redux prop initialValues to pass in the information to populate 
    // the form. If there is an event it will automatically fill in the values
    // if not then the values will be blank
    return {
        initialValues: event,
        event
    }
}

const actions = {
    createEvent,
    updateEvent,
    deleteEvent
}

// This is from reValidate, we pass in the field such as title and then the validation
// that we want to use with a message
const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired({message: 'The category is required'}),
    description: composeValidators(
        isRequired({message: 'Please enter a description'}),
        hasLengthGreaterThan(4)({message: 'The description needs to be at least 5 characters'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
})

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
    // state = { ...this.props.event }

    // componentDidMount() {
    //     if (this.props.selectedEvent !== null) {
    //         this.setState({
    //             // The spread operator spreads out all the 
    //             // individual properties of the object
    //             ...this.props.selectedEvent
    //         })
    //     }
    // }

   onFormSubmit = values => {
        // e.preventDefault();
        if (this.props.initialValues.id) {
            this.props.updateEvent(values)
            this.props.history.push(`/events/${this.props.initialValues.id}`)
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                hostedBy: 'Bob'
            }
            this.props.createEvent(newEvent)   
            this.props.history.push(`/events/${newEvent.id}`)
        }
    }

    // handleInputChange = (e) => {
    //     this.setState({
    //         // Since we named our input we can reference it with
    //         // object bracket notation through the event object
    //         [e.target.name]: e.target.value
    //     })
    // }

    render() {
        // const { title, date, city, venue, hostedBy } = this.state;
        // We are getting some props from reduxForm
        const { history, initialValues, invalid, submitting, pristine } = this.props;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='teal' content='Event Details' />
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>
                            <Field 
                                name='title' 
                                component={TextInput} 
                                placeholder='Event Title' />
                            <Field 
                                name='category' 
                                type="text"
                                component={SelectInput} 
                                options={category}
                                placeholder='Give your event a name' />
                            <Field 
                                name='description' 
                                component={TextArea} 
                                rows={3}
                                placeholder='Tell us about your event' />
                            <Header sub color='teal' content='Event Location Details' />
                            <Field 
                                name='city' 
                                component={TextInput} 
                                placeholder='Event City' />
                            <Field 
                                name='venue' 
                                component={TextInput} 
                                placeholder='Event Venue' />
                            <Field 
                                name='date' 
                                component={DateInput} 
                                placeholder='Event Date'
                                showTimeSelect
                                timeFormat='HH:mm'
                                dateFormat='dd LLL yyyy h:mm a'                               />
                            {/* <Form.Field>
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
                            </Form.Field> */}
                                <Button disabled={invalid || submitting || pristine } positive type="submit">
                                Submit
                                </Button>
                                {/* history.goBack uses the browser history to go back to the previous page.
                                    Previously we had onClick={this.props.history.goBack} */}
                            <Button type="button" 
                            // They need to be arrow functions because they use parenthesis and 
                            // they will be immediately run if they aren't
                                onClick={
                                    initialValues.id 
                                        ? () => history.push(`/events/${initialValues.id}`)
                                        : () => history.push(`/events`)}
                                    >Cancel</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
            
        )
    }
}

export default connect(mapStateToProps, actions)(reduxForm({form: 'eventForm', validate})(EventForm));

// We imported the actions we created and then put them into an action object,
// which we then connected to redux by passing it in to connect()
// Later we added in reduxForm, the order here is important because reduxForm is
// a higher order component like connect. It takes in the form object and the 
// EventForm as parameters and returns a function, which connect then uses
// Later we used reValidate and made a validate function that takes all the fields
// that we want to validate and we passed it in as an argument into reduxForm