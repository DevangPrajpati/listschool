import React from 'react';
import { connectField } from 'uniforms';
import { BooleanField } from 'uniforms-bootstrap3';

export const BooleanForm = props => (
  <div className="checkbox">
    <label>
      <input
        type="checkbox"
        checked={props.value}
        onChange={event => props.onChange(event.target.checked)}
      />
      {props.placeholder}
    </label>
  </div>
);

BooleanForm.propTypes = {
  value: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
}

export default connectField(BooleanForm, {
  mapProps: x => x,     // Map field props. Useful to prepare different
                        // props set for external components.
                        // Example:
                        //     mapProps: props => ({...props, change: props.onChange})

  baseField: BooleanField, // connectField returns create HOC inherited from baseField class.

  initialValue: true,   // Pass true, to set initial value, when it is not defined.
  includeParent: false, // Pass true, to receive parent props.
  includeInChain: true,  // Pass true, to stay visible, in nested fields.
});
