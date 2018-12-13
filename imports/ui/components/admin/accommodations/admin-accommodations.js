import React from 'react';
import {Bert} from 'meteor/themeteorchef:bert';
import {removeAccommodation} from '/imports/api/accommodations/methods';
import {AdminListComponent} from "../common-utils/admin-list-component";

export class AdminAccommodations extends AdminListComponent {

  handleEdit() {
    const accommodation = this.props.accommodation;
    this.goToEdit(accommodation._id, 'accommodations');
  }

  handleRemove() {
    const accommodation = this.props.accommodation;
    this.remove(removeAccommodation, accommodation._id, "Accommodation");
  }

  render() {
    const accommodation = this.props.accommodation;
    return this.renderList(accommodation, accommodation.accommodationName);
  }
}

AdminAccommodations.propTypes = { accommodation: React.PropTypes.object };
