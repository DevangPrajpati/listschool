import React from 'react';
import Rating from 'react-rating';
import {Table, Badge, Col, Label, ResponsiveEmbed} from 'react-bootstrap';
import {Users} from '/imports/api/users/users';
import i18n from 'meteor/universe:i18n';

const renderFeedback = (feedback) => {
  if (!feedback.comment) {
    return null;
  }

  const userName = Users.findOne(feedback.user).profile.firstName;
  const T = i18n.createComponent();
  return (
    <div key={feedback._id}>
      <h4><T>lastComment</T></h4>
      <span>{userName} - {feedback.comment}</span>
    </div>
  );
};

const renderAddressMap = (address) => {
  if (address) {
    const addressSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCtiZVQ9bUG7DxXRImTb6y5sIJzcqy68L0&q=${address}`;
    return (
      <ResponsiveEmbed a16by9>
        <embed src={addressSrc}/>
      </ResponsiveEmbed>
    );
  }

  return '';
};

export const SchoolProfile = ({school, average, feedbacks, subjects}) => {
  const T = i18n.createComponent();
  return (
    <div>
      <Col sm={12} md={8}>
        <h4 style={{textAlign: 'center'}}>
          <T>recommended</T>
        </h4>
        <h4 style={{textAlign: 'center'}}>
          <Rating
            empty="fa fa-star-o"
            full="fa fa-star"
            readonly={true}
            initialRate={average.overall}
          />
        </h4>
        <h4>
          <Badge>{feedbacks.length}</Badge><T>feedbacks</T>
        </h4>
        <Table responsive hover>
          <tbody className="table-inline">
          <tr>
            <td><T>qualityOfTeaching</T></td>
            <td className="text-right">
              <Rating
                empty="fa fa-star-o"
                full="fa fa-star"
                readonly={true}
                initialRate={average.qualityOfTeaching}
              />
            </td>
          </tr>
          <tr>
            <td><T>teachingMaterial</T></td>
            <td className="text-right">
              <Rating
                empty="fa fa-star-o"
                full="fa fa-star"
                readonly={true}
                initialRate={average.teachingMaterial}
              />
            </td>
          </tr>
          <tr>
            <td><T>schoolFacilities</T></td>
            <td className="text-right">
              <Rating
                empty="fa fa-star-o"
                full="fa fa-star"
                readonly={true}
                initialRate={average.schoolFacilities}
              />
            </td>
          </tr>
          <tr>
            <td><T>socialExtraActivities</T></td>
            <td className="text-right">
              <Rating
                empty="fa fa-star-o"
                full="fa fa-star"
                readonly={true}
                initialRate={average.socialExtraActivities}
              />
            </td>
          </tr>
          <tr>
            <td><T>schoolLocation</T></td>
            <td className="text-right">
              <Rating
                empty="fa fa-star-o"
                full="fa fa-star"
                readonly={true}
                initialRate={average.schoolLocation}
              />
            </td>
          </tr>
          <tr>
            <td><T>housing</T></td>
            <td className="text-right">
              <Rating
                empty="fa fa-star-o"
                full="fa fa-star"
                readonly={true}
                initialRate={average.housing}
              />
            </td>
          </tr>
          </tbody>
        </Table>
        <h4><T>location</T></h4>
        {renderAddressMap(school.profile.address)}
      </Col>
      <Col sm={12} md={4}>
        <h4><T>tags</T></h4>
        {subjects.map((subject) => (
          <Label key={ subject } bsStyle="primary"><T>{subject}</T></Label>
        ))}
        <div className="school-view-comments">
          {feedbacks.map((feedback) => renderFeedback(feedback))}
        </div>
      </Col>
    </div>
  );
};

SchoolProfile.propTypes = {
  school: React.PropTypes.object,
  average: React.PropTypes.object,
  feedbacks: React.PropTypes.array,
  subjects: React.PropTypes.array,
  lastFeedback: React.PropTypes.object,
};
