import React from 'react'
import {connect} from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

// ownProps gives the component the data it needs from its own props to 
// access data from the store, it is an optional argument
const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id

    let event = {}

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0]
    } 

    return { 
        event
    }
}

// we are destructuring the event out of props that we got from 
// mapStateToProps. The ownProps used its props to get the specific id
// from react router with match.params.id
// We then used this to compare its eventId to the ids in the state,
// mapStateToProps allowed us to use these two at the same time and connect
// this component to the state
const EventDetailedPage = ({event}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}

export default connect(mapStateToProps)(EventDetailedPage)
