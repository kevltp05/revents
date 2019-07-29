
import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  input: { value, onChange, onBlur, ...restInput },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={value ? new Date(value) : null}
        onChange={onChange}
        onBlur={onBlur}
        {...restInput}
      />
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  )
}

export default DateInput;

// import React from 'react'
// import { Form, Label } from 'semantic-ui-react';
// import DatePicker from 'react-datepicker';
// // DatePicker has some of its own styling already
// import 'react-datepicker/dist/react-datepicker.css';

// // ...rest is the rest of the properties that we will pass into
// // the component. We are spreading the rest of the properties
// const DateInput = ({
//     input, 
//     width, 
//     type, 
//     placeholder, 
//     meta: {touched, error},
//     ...rest
// }) => {
//     return (
//         <Form.Field error={touched && !!error}>
//             <DatePicker 
//                 // What ever the rest of the properties are that are passed in
//                 // will be put into the datepicker
//                 {...rest}
//                 placeholderText={placeholder}
//                 // We need new Date so that the input value is a Javascript object
//                 selected={input.value ? new Date(input.value) : null}
//                 // We need this for redux form so it knows when something has changed or been clicked
//                 onChange={input.OnChange}
//                 onBlur={input.onBlur}
//                 onChangeRaw={(e) => e.preventDefault()}
//            />
//            {touched && error && <Label basic color='red'>{error}</Label>}
//         </Form.Field>
//     )
// }

// export default DateInput
