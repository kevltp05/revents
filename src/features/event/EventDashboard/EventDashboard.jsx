import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

const eventsFromDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {
    state = {
        events: eventsFromDashboard,
        isOpen: false,
        selectedEvent: null
    }

    // handleIsOpenToggle = () => {
    //     // Before we passed in prevState and used  prevState.isOpen
    //     // Instead we destructured it into isOpen
    //     this.setState(({isOpen}) => ({
    //         isOpen: !isOpen
    //     }))
    // }

    handleCreateFormOpen = () => {
      this.setState({
        isOpen: true,
        selectedEvent: null
      })
    }

    handleFormCancel = () => {
      this.setState({
        isOpen: false
      })
    }

    handleCreateEvent = (newEvent) => {
      newEvent.id = cuid();
      newEvent.hostPhotoURL = '/assets/user.png';

      // We destructured the events from prevState and then
      // used the spread operator to add the newEvent into the events array
      this.setState(({events}) => ({
        events: [...events, newEvent],
        isOpen: false
      }))
    }

    handleSelectEvent = (event) => {
      this.setState({
        selectedEvent: event,
        isOpen: true
      })
    }

    handleUpdateEvent = (updatedEvent) => {
      // We want to get info from prevState, so we destructure events
      this.setState(({events}) => ({
        events: events.map(event => {
          if (event.id === updatedEvent.id) {
            return {...updatedEvent}
          } else {
            return event
          }
        }),
        isOpen: false,
        selectedEvent: null
      }))
    }

    handleDeleteEvent = (id) => {
      this.setState(({events}) => ({
        events: events.filter(e => e.id !== id)
      }))
    }

    render() {
        const { events, isOpen, selectedEvent } = this.state;

        return (
                <Grid>
                    <Grid.Column width={10}>
                        <EventList 
                          events={events}
                          deleteEvent={this.handleDeleteEvent} 
                          selectEvent={this.handleSelectEvent}/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button 
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
                                cancelFormOpen={this.handleFormCancel}/>} 
                    </Grid.Column>
                </Grid>      
        );
    }
}

export default EventDashboard;

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