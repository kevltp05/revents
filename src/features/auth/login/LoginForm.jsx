import React from 'react';
import { connect } from "react-redux";
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login } from '../authActions';

const actions = {
    login
}

// We are getting handleSubmit from redux forms, the handleSubmit will take
// login action and then return the form data when it is submitted
const LoginForm = ({login, handleSubmit}) => {
  return (
    <Form error size="large" onClick={handleSubmit(login)} autoComplete='off' >
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(
    null, actions
)(reduxForm({form: 'LoginForm'})(LoginForm));