import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({ 
    input, 
    type,
    multiple, 
    options, 
    placeholder, 
    meta: {touched, error} 
}) => {
    return (
        <Form.Field error={touched && !!error}>
           {/* We needed to add in our own properties in value and onChange because we are
                using the Select component and it won't work otherwise */}
            <Select 
                value={input.value || null }
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
                multiple={multiple}
            />
            {touched && error && 
                <Label basic color='red'>
                    {error}
                </Label>
            }
        </Form.Field>
    )
}

export default SelectInput
