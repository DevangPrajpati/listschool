import React from 'react';
import { browserHistory } from 'react-router';
import { Row, Grid, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { sendSchoolSuggestion } from '/imports/api/users/methods';
import { getInputValue } from '/imports/modules/get-input-value';
import i18n from 'meteor/universe:i18n';

export class SuggestSchool extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const args = {
      email: getInputValue(this.refs.email),
      name: getInputValue(this.refs.name),
      schoolName: getInputValue(this.refs.schoolName),
      schoolCountry: getInputValue(this.refs.schoolCountry),
      schoolCity: getInputValue(this.refs.schoolCity),
      comments: getInputValue(this.refs.comments),
    };

    sendSchoolSuggestion.call(args, (error) => {
      if (error) {
        Bert.alert(error, 'warning');
      } else {
        Bert.alert('Sent!', 'success');
        browserHistory.push('/');
      }
    });
  }

  render() {
    const T = i18n.createComponent();
    return (
      <Grid className="main-app-container">
        <Row>
          <Col xs={ 12 }>
            <div className="form-view-container">
              <h4 className="page-header"><T>suggestSchool</T></h4>
              <p className="form-view-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi natus culpa nobis mollitia nulla ipsum accusantium atque neque minima quis!
              </p>
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel><T>email</T>*</ControlLabel>
                  <FormControl
                    type="email"
                    ref="email"
                    name="email"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>name</T> *</ControlLabel>
                  <FormControl
                    type="text"
                    ref="name"
                    name="name"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>schoolName</T>*</ControlLabel>
                  <FormControl
                    type="text"
                    ref="schoolName"
                    name="schoolName"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>schoolCountry</T>*</ControlLabel>
                  <FormControl
                    type="text"
                    ref="schoolCountry"
                    name="schoolCountry"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>schoolCity</T> *</ControlLabel>
                  <FormControl
                    type="text"
                    ref="schoolCity"
                    name="schoolCity"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>comments</T></ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    ref="comments"
                    name="comments"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success"><T>send</T></Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
