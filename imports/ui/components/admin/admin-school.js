import React from 'react';
import { browserHistory } from 'react-router';
import { Glyphicon, Col, Row } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { Countries } from '/imports/api/countries/countries';
import { Cities } from '/imports/api/cities/cities';
import { removeSchool } from '/imports/api/schools/methods';
import i18n from 'meteor/universe:i18n';

export class AdminSchool extends React.Component {
  handleShow() {
    const school = this.props.school;

    browserHistory.push(`/admin/schools/${school._id}`);
  }

  handleEdit() {
    const school = this.props.school;

    browserHistory.push(`/admin/schools/${school._id}/edit`);
  }

  handleRemove() {
    const school = this.props.school;

    if (confirm('Are you sure? This is permanent.')) {
      removeSchool.call({
        _id: school._id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('School removed!', 'success');
        }
      });
    }
  }

  render() {
    const school = this.props.school;
    const city = Cities.findOne(school.cityId);
    const country = Countries.findOne(city.country);
    const T = i18n.createComponent();

    return (
      <div className="admin-list-item" key={ school._id }>
        <Row>
          <Col xs={6} md={3}>
            {school.name}
          </Col>
          <Col xs={6} md={3}>
            <Glyphicon glyph="globe" /> {city.name} / {country.name}
          </Col>
          <Col xs={12} md={3} mdOffset={3} className="admin-list-btns">
            <a href="#" className="admin-list-item-btn" onClick={ this.handleShow.bind(this) }>
              <Glyphicon glyph="search" /> <T>show</T>
            </a>
            <a href="#" className="admin-list-item-btn" onClick={ this.handleEdit.bind(this) }>
              <Glyphicon glyph="pencil" /> <T>edit</T>
            </a>
            <a href="#" className="admin-list-item-btn" onClick={ this.handleRemove.bind(this) }>
              <Glyphicon glyph="remove" /> <T>delete</T>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

AdminSchool.propTypes = { school: React.PropTypes.object };
