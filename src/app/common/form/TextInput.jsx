import React from 'react'
import { Form, Label } from 'semantic-ui-react';

// We are creating this component to pass it into EventForm as a component to
// use in our redux form
// Here we are destructuring props from redux form that we can use
const TextInput = ({ 
        input, 
        width, 
        type, 
        placeholder, 
        meta: {touched, error} 
    }) => {
    return (
        // the !!error checks to see if there is an error object, if there
        // is not, then we don't have an error
        <Form.Field error={touched && !!error}>
            {/* We are spreadubg the input object from redux form so we have access
            to all of its different states, such as onBlur onFocuse et. */}
            <input {...input} placeholder={placeholder} type={type} />
            {/* If the field has been touched, and has an error, then it will display the error in a label */}
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

export default TextInput
