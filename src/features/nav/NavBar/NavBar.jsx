import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { logout } from '../../auth/authActions';

const actions = {
    openModal,
    logout
}

// Since we have connect we can now get our auth from the store
const mapStateToProps = (state) => ({
    auth: state.auth
})

class NavBar extends Component {
    // We are now getting our state from the store
    // state = {
    //     authenticated: false
    // }

    handleSignIn = () => {
        this.props.openModal('LoginModal')
    }

    handleRegister = () => {
        this.props.openModal('RegisterModal')
    }

    handleSignOut = () => {
        // this.setState({ authenticated: false});
        this.props.logout()
        this.props.history.push('/');
    }

    render() {
        const { auth } = this.props;
        const authenticated = auth.authenticated;

        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img src="/assets/logo.png" alt="logo" />
                        Re-vents
                    </Menu.Item>
                    
                    <Menu.Item exact as={NavLink} to='/events' name="Events" />
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
                        <SignedInMenu  signOut={this.handleSignOut} currentUser={auth.currentUser} />
                    ) : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}
                    
                    
                </Container>
            </Menu>
        )
    }
}

// withRouter allows us to using capabilities without actually having the
// component in a <Route>, we needed this to use the history object with NavBar
export default withRouter(
    connect(
      mapStateToProps,
      actions
    )(NavBar)
);