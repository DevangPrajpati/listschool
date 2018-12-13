import React from 'react';
import {Bert} from 'meteor/themeteorchef:bert';
import {removeFacility} from '/imports/api/facilities/methods';
import {AdminListComponent} from "../common-utils/admin-list-component";

export class AdminFacilities extends AdminListComponent {

  handleEdit() {
    const facility = this.props.facility;
    this.goToEdit(facility._id, 'facilities');
  }

  handleRemove() {
    const facility = this.props.facility;
    this.remove(removeFacility, facility._id, "Facility");
  }

  render() {
    const facility = this.props.facility;
    return this.renderList(facility, facility.facilityName);
  }
}

AdminFacilities.propTypes = { facility: React.PropTypes.object };
