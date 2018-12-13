import React from 'react';
import Rating from 'react-rating';
import { Panel, Button, Glyphicon, Col, Row, ButtonGroup } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeSchoolFeedback } from '/imports/api/school-feedbacks/methods';
import { Users } from '/imports/api/users/users';
import i18n from 'meteor/universe:i18n';

export class AdminSchoolFeedback extends React.Component {
  handleRemove() {
    const school = this.props.schoolFeedback;

    if (confirm('Are you sure? This is permanent.')) {
      removeSchoolFeedback.call({
        _id: school._id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('School feedback removed!', 'success');
        }
      });
    }
  }

  render() {
    const T = i18n.createComponent();
    const schoolFeedback = this.props.schoolFeedback;
    const userEmail = Users.findOne(schoolFeedback.user).emails[0].address;
    let overall = 0;

    overall = overall + schoolFeedback.grades.qualityOfTeaching;
    overall = overall + schoolFeedback.grades.teachingMaterial;
    overall = overall + schoolFeedback.grades.schoolFacilities;
    overall = overall + schoolFeedback.grades.socialExtraActivities;
    overall = overall + schoolFeedback.grades.schoolLocation;
    overall = overall + schoolFeedback.grades.housing;
    overall = overall / 6;

    return (
      <Panel key={ schoolFeedback._id }>
        <Row>
          <Col xs={ 3 } >
            {userEmail}
          </Col>
          <Col xs={ 3 } >
            <Rating empty="fa fa-star-o"
                    full="fa fa-star"
                    readonly={true}
                    initialRate={overall}
            />
          </Col>
          <Col xs={ 3 } xsOffset={ 3 }>
            <ButtonGroup justified>
              <Button href="#" bsStyle="danger" onClick={ this.handleRemove.bind(this) }>
                <Glyphicon glyph="remove" /> <T>remove</T>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    );
  }
}

AdminSchoolFeedback.propTypes = { schoolFeedback: React.PropTypes.object };
