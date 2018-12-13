import React from 'react';
import {browserHistory} from 'react-router';
import {Col, Glyphicon, Row} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {T} from "../../../../utils/translation-utils";

export class AdminListComponent extends React.Component {

  goToEdit(itemId, label) {
    browserHistory.push(`/admin/${label}/${itemId}/edit`);
  }

  remove(removeMethod, id, labelWhatRemoved) {
    if (confirm('Are you sure? This is permanent.')) {
      removeMethod.call({
        _id: id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(`${labelWhatRemoved} removed!`, 'success');
        }
      });
    }
  }

  renderList = (item, displayItem) => {
    return (
      <div className="admin-list-item" key={ item._id }>
        <Row>
          <Col xs={4} md={3}>
            <T>{displayItem}</T>
          </Col>
          <Col xs={8} md={3} mdOffset={3} className="admin-list-btns">
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
  };
}
