import React from 'react';
import {Bert} from 'meteor/themeteorchef:bert';
import {removeSubject} from '/imports/api/subjects/methods';
import {AdminListComponent} from "../common-utils/admin-list-component";

export class AdminSubjects extends AdminListComponent {

  handleEdit() {
    const subject = this.props.subject;
    this.goToEdit(subject._id, 'subjects');
  }

  handleRemove() {
    const subject = this.props.subject;
    this.remove(removeSubject, subject._id, "Subject");
  }

  render() {
    const subject = this.props.subject;
    return this.renderList(subject, subject.subjectName);
  }
}

AdminSubjects.propTypes = { subject: React.PropTypes.object };
