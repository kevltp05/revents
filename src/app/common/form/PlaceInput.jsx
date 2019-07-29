import React from 'react';
import PlacesAutoComplete from 'react-places-autocomplete'
import { Form, Label, Segment, List } from 'semantic-ui-react';

const PlaceInput = ({
        input: {value, onChange, onBlur}, 
        width, 
        placeholder,
        onSelect,
        options,
        meta: {touched, error}
    }) => {
    return (
        <PlacesAutoComplete
            value={value}
            onChange={onChange}
            searchOptions={options}
            onSelect={onSelect}
        >
            {/* We are using {} for an expression and then running the google
                part with () and then destructuring with more {} from the objects google
                returns */}
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <Form.Field error={touched && !!error}>
                    <input {...getInputProps({placeholder, onBlur})} />
                    {touched && error && <Label basic color='red'>{error}</Label>}
                    {/* First we check to see if there are any suggestions that google
                    sent back and then we will render them if there are */}
                    {suggestions.length > 0 && (
                        <Segment style={{
                                marginTop: 0, 
                                position: 'absolute', 
                                zIndex: 1000, 
                                width: '100%'
                            }}>
                            {/* we also get a loading flag from google, if its loading we will show Loading */}
                            {loading && <div>Loading...</div>}
                            <List selection>
                                {/* We are taking the suggestions that google provided and are mapping over them
                                and creating a list item for each one. We are also spreading out the getSuggestionItemPRops
                                that google sent and making them available to the List Item */}
                                {suggestions.map(suggestion => (
                                    <List.Item {...getSuggestionItemProps(suggestion)}>
                                        <List.Header>
                                            {suggestion.formattedSuggestion.mainText}
                                        </List.Header>
                                        <List.Description>
                                            {suggestion.formattedSuggestion.secondaryText}
                                        </List.Description>
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                    )}
                </Form.Field>
            )}
        </PlacesAutoComplete>
    )
}

export default PlaceInput
