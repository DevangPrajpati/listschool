import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { connectField } from 'uniforms';
import { BaseField } from 'uniforms-bootstrap3';
import { Images } from '/imports/api/images/images';

const handleEditFile = (event, props) => {
  if (event.currentTarget.files && event.currentTarget.files[0]) {
    const upload = Images.insert({
      file: event.currentTarget.files[0],
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);

    upload.on('start', () => {
      Bert.alert('Upload in progress', 'warning');
    });

    upload.on('end', (error, fileObj) => {
      if (error) {
        Bert.alert(error, 'danger');
      } else {
        Bert.alert('Upload completed!', 'success');
        props.onChange(fileObj._id);
      }
    });

    upload.start();
  }
};

export const ImageForm = props => (
  <div>
    <label>
      <input
        type="file"
        checked={props.value}
        onChange={event => handleEditFile(event, props)}
      />
    </label>
  </div>
);

export default connectField(ImageForm, {
  mapProps: x => x,     // Map field props. Useful to prepare different
                        // props set for external components.
                        // Example:
                        //     mapProps: props => ({...props, change: props.onChange})

  baseField: BaseField, // connectField returns create HOC inherited from baseField class.

  initialValue: true,   // Pass true, to set initial value, when it is not defined.
  includeParent: false, // Pass true, to receive parent props.
  includeInChain: true,  // Pass true, to stay visible, in nested fields.
});
