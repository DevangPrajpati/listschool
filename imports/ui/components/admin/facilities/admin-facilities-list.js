import React from 'react';
import {Alert} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import {AdminFacilities} from "./admin-facilities";

export const AdminFacilitiesList = ({facilities: facilities}) => {
  const T = i18n.createComponent();
  return (
    facilities.length === 0 ? <Alert bsStyle="warning"><T>noSchoolFacilitiesYet</T></Alert> :
      <div>
        {facilities.map((facility) => <AdminFacilities key={facility._id} facility={facility}/>)}
      </div>);
};

AdminFacilitiesList.propTypes = {
  facilities: React.PropTypes.array,
};
