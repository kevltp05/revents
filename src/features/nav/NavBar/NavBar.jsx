import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';

class NavBar extends Component {
    state = {
        authenticated: false
    }

    handleSignIn = () => {
        this.setState({
            authenticated: true
        })
    }

    handleSignOut = () => {
        this.setState({ authenticated: false});
        this.props.history.push('/');
    }

    render() {
        const { authenticated } = this.state;

        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img src="/assets/logo.png" alt="logo" />
                        Re-vents
                    </Menu.Item>
                    
                    <Menu.Item as={NavLink} to='/events' name="Events" />
                    <Menu.Item as={NavLink} to='/people' name="People" />
                    <Menu.Item as={NavLink} to='/test' name="Test" />

                    <Menu.Item>
                        <Button 
                            as={Link} 
                            to='/createEvent' 
                            floated="right" 
                            positive 
                            inverted 
                            content="Create Event" />
                    </Menu.Item>

                    {authenticated ? (
                        <SignedInMenu  signOut={this.handleSignOut} />
                    ) : <SignedOutMenu signIn={this.handleSignIn} />}
                    
                    
                </Container>
            </Menu>
        )
    }
}

// withRouter allows us to using capabilities without actually having the
// component in a <Route>, we needed this to use the history object with NavBar
export default withRouter(NavBar);