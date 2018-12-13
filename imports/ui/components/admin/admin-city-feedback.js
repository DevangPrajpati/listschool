import React from 'react';
import Rating from 'react-rating';
import { Panel, Button, Glyphicon, Col, Row, ButtonGroup } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeCityFeedback } from '/imports/api/city-feedbacks/methods';
import { Users } from '/imports/api/users/users';
import i18n from 'meteor/universe:i18n';

export class AdminCityFeedback extends React.Component {
  handleRemove() {
    const city = this.props.cityFeedback;

    if (confirm('Are you sure? This is permanent.')) {
      removeCityFeedback.call({
        _id: city._id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('City feedback removed!', 'success');
        }
      });
    }
  }

  render() {
    const T = i18n.createComponent();
    const cityFeedback = this.props.cityFeedback;
    const userEmail = Users.findOne(cityFeedback.user).emails[0].address;
    let overall = 0;

    overall = overall + cityFeedback.grades.accessibility;
    overall = overall + cityFeedback.grades.costOfLife;
    overall = overall + cityFeedback.grades.leisure;
    overall = overall + cityFeedback.grades.publicTransport;
    overall = overall + cityFeedback.grades.qualityOfLife;
    overall = overall + cityFeedback.grades.safety;
    overall = overall / 6;

    return (
      <Panel key={ cityFeedback._id }>
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

AdminCityFeedback.propTypes = { cityFeedback: React.PropTypes.object };
