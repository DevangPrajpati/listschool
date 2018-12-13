import React from 'react';
import Rating from 'react-rating';
import {BaseField, connectField} from 'uniforms';
import {Table} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

export const GradeForm = props => {
  const T = i18n.createComponent();
  return (
    <Table bordered>
      <tbody className="grade-form">
      <tr>
        <td><T>{props.label}</T></td>
        <td>
          <Rating empty="fa fa-star-o"
                  full="fa fa-star"
                  initialRate={props.value}
                  onChange={value => props.onChange(value)}
          />
        </td>
      </tr>
      </tbody>
    </Table>
  );
};

GradeForm.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default connectField(GradeForm, {
  mapProps: x => x,     // Map field props. Useful to prepare different
                        // props set for external components.
                        // Example:
                        //     mapProps: props => ({...props, change: props.onChange})

  baseField: BaseField, // connectField returns create HOC inherited from baseField class.

  initialValue: true,   // Pass true, to set initial value, when it is not defined.
  includeParent: false, // Pass true, to receive parent props.
  includeInChain: true,  // Pass true, to stay visible, in nested fields.
});
