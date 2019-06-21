import React from 'react'
import { Segment, Container, Icon, Button, Header, Image } from 'semantic-ui-react';

// We destructure the history from the props object passed in from Router
const HomePage = ({history}) => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                <Image
                    size='massive'
                    src='/assets/logo.png'
                    alt='logo'
                    style={{ marginBottom: 12 }}
                />
                Re-vents
                </Header>
                <Button onClick={() => history.push('/events')} size='huge' inverted>
                    Get started
                <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage
