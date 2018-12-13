import React from 'react';
import {Alert} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import {AdminAccommodations} from "./admin-accommodations";

export const AdminAccommodationsList = ({accommodations: accommodations}) => {
  const T = i18n.createComponent();
  return (
    accommodations.length === 0 ? <Alert bsStyle="warning"><T>noAccommodationsYet</T></Alert> :
      <div>
        {accommodations.map((accommodation) => <AdminAccommodations key={accommodation._id} accommodation={accommodation}/>)}
      </div>);
};

AdminAccommodationsList.propTypes = {
  accommodations: React.PropTypes.array,
};
