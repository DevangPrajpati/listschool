import React from 'react';
import { browserHistory } from 'react-router';
import { Panel, Button, Glyphicon, Col, Row, ButtonGroup } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { Countries } from '/imports/api/countries/countries';
import { removeCity } from '/imports/api/cities/methods';

export class AdminCity extends React.Component {
  handleShow() {
    const city = this.props.city;

    browserHistory.push(`/admin/cities/${city._id}`);
  }

  handleEdit() {
    const city = this.props.city;

    browserHistory.push(`/admin/cities/${city._id}/edit`);
  }

  handleRemove() {
    const city = this.props.city;

    if (confirm('Are you sure? This is permanent.')) {
      removeCity.call({
        _id: city._id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('City removed!', 'success');
        }
      });
    }
  }

  render() {
    const city = this.props.city;
    const country = Countries.findOne(city.country);

    return (
      <div className="admin-list-item" key={ city._id }>
        <Row>
          <Col xs={6} md={3}>
            {city.name}
          </Col>
          <Col xs={6} md={3}>
            <Glyphicon glyph="globe" /> {country.name}
          </Col>
          <Col xs={12} md={4} mdOffset={2} className="admin-list-btns">
            <a href="#" className="admin-list-item-btn" onClick={ this.handleShow.bind(this) }>
              <Glyphicon glyph="search" /> Show
            </a>
            <a href="#" className="admin-list-item-btn" onClick={ this.handleEdit.bind(this) }>
              <Glyphicon glyph="pencil" /> Edit
            </a>
            <a href="#" className="admin-list-item-btn" onClick={ this.handleRemove.bind(this) }>
              <Glyphicon glyph="remove" /> Remove
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

AdminCity.propTypes = { city: React.PropTypes.object };
