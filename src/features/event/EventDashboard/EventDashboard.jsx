import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

const mapStateToProps = (state) => ({
  events: state.events
})

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashboard extends Component {
    // state = {
    //     isOpen: false,
    //     selectedEvent: null
    // }

    // handleCreateFormOpen = () => {
    //   this.setState({
    //     isOpen: true,
    //     selectedEvent: null
    //   })
    // }

    // handleFormCancel = () => {
    //   this.setState({
    //     isOpen: false
    //   })
    // }

    // handleCreateEvent = (newEvent) => {
    //   newEvent.id = cuid();
    //   newEvent.hostPhotoURL = '/assets/user.png';

    //   this.props.createEvent(newEvent)
    //   // We destructured the events from prevState and then
    //   // used the spread operator to add the newEvent into the events array
    //   this.setState(({events}) => ({
    //     // events: [...events, newEvent],
    //     isOpen: false
    //   }))
    // }

    // handleSelectEvent = (event) => {
    //   this.setState({
    //     selectedEvent: event,
    //     isOpen: true
    //   })
    // }

    // handleUpdateEvent = (updatedEvent) => {
    //   // We want to get info from prevState, so we destructure events
    //   this.props.updateEvent(updatedEvent)
    //   // this.setState(({events}) => ({
    //   //   // events: events.map(event => {
    //   //   //   if (event.id === updatedEvent.id) {
    //   //   //     return {...updatedEvent}
    //   //   //   } else {
    //   //   //     return event
    //   //   //   }
    //   //   // }),
    //   //   isOpen: false,
    //   //   selectedEvent: null
    //   // }))
    // }

    handleDeleteEvent = (id) => {
      // this.setState(({events}) => ({
      //   events: events.filter(e => e.id !== id)
      // }))
      this.props.deleteEvent(id);
    }

    render() {
        // const { isOpen, selectedEvent } = this.state;
        const { events } = this.props;

        return (
                <Grid>
                    <Grid.Column width={10}>
                        <EventList 
                          events={events}
                          deleteEvent={this.handleDeleteEvent} 
                          // selectEvent={this.handleSelectEvent}
                          />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <h2>Activity Feed</h2>
                        {/* <Button 
                        onClick={this.handleCreateFormOpen} 
                        positive content='CreateEvent' />
                            {isOpen && 
                              <EventForm  
                                // Using key to see whether a selected event exists, if it does
                                // we will set the key to its id, if not false
                                // This lets us update the data in the form when we click view
                                // on different events 
                                key={selectedEvent ? selectedEvent.id : 0}
                                updateEvent={this.handleUpdateEvent}
                                selectedEvent={selectedEvent}
                                createEvent={this.handleCreateEvent} 
                                cancelFormOpen={this.handleFormCancel}/>}  */}
                    </Grid.Column>
                </Grid>      
        );
    }
}

export default connect(mapStateToProps, actions)(EventDashboard);

// Before redux
// When the page loads isOpen is false and selectedEvent is null(doesn't have an id)
// this causes the form to be closed, when the create Event button is clicked it causes
// handleCreateFormOpen to run which sets isOpen to true, opening the form
// once the form is filled out and the submit button is clicked, onSubmit is run, which calls
// handleFormSubmit, this checks to see if there is an id, 
//         if not then createEvent is called
// which runs handleCreateEvent. The selectedEvent has a new id created for it and the events array
// from the state is destructured and the new selectedEvent is added to the events array, isOpen
// is set to false and the form closestIndexTo.
//             if there is an id updateEvent is called which runs, handleUpdateEvent.
// this takes the selectedEvent object and compares it to the prevState of the objects in
// the events array, if there is a match of their ids then the changes to the selectedEvent 
// will be made. isOpen is set to false and selectedEvent is set back to null.
// 
// When the view button is clicked for an eventListItem, selectEvent is called
// and the event object is passed to it which runs handleSelectEvent  
// this sets the selectedEvent in the state to the event object that it was passed
// and sets isOpen to true so that the form opens

// When the form component opens and mounts componentDidMount runs and checks to see
// if the selectedEvent passed to it is null, if it is not, then it updates
// its state to the props on the selected event that was passed to it

// After Redux
// We have brought in our actions and put them in an object called actions that
// we passed into the connect function. We also brought in mapStateToProps to 
// which is getting the initialState from the eventReducer file.
// We can now use our reducers through this.props and then the reducer we want to use
// and pass in the argument that we want
// I kept the old code, but commented it out
// 