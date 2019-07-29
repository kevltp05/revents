import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import HomePage from '../../features/home/HomePage';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/ModalManager';
 
class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
         <Route path="/" exact component={HomePage} />
         <Route 
         // Here we are saying that if the path has a / with anything
         // after it we will render this other fragment with routes
          path='/(.+)'
          render={() => (
           <Fragment>
            <NavBar />
            <Container className="main">
              {/* We added in Switch and used withRouter so that we could use a key
                  to know when a component has changed. Before the data wouldn't change
                  when going betwee createEvent and manage/:id */}
              <Switch key={this.props.location.key}>
                <Route exact path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailedPage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailedPage} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path={["/createEvent", "/manage/:id"]} component={EventForm} />
                <Route path="/test" component={TestComponent} />
              </Switch>
            </Container>
          </Fragment>
         )}
      />
      </Fragment>
    );
  }
}
 
// withRouter lets our app have access to the routing props
export default withRouter(App);