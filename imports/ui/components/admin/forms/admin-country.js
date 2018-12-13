import React from 'react';
import { browserHistory } from 'react-router';
import { Glyphicon, Col, Row } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeCountry } from '/imports/api/countries/methods';

export class AdminCountry extends React.Component {
  handleEdit() {
    const country = this.props.country;

    browserHistory.push(`/admin/countries/${country._id}/edit`);
  }

  handleRemove() {
    const country = this.props.country;

    if (confirm('Are you sure? This is permanent.')) {
      removeCountry.call({
        _id: country._id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Country removed!', 'success');
        }
      });
    }
  }

  render() {
    const country = this.props.country;
    return (
      <div className="admin-list-item" key={ country._id }>
        <Row>
          <Col xs={6} md={9}>
            {country.name}
          </Col>
          <Col xs={6} md={3} className="admin-list-btns">
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

AdminCountry.propTypes = { country: React.PropTypes.object };
