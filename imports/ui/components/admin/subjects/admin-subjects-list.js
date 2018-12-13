import React from 'react';
import {Alert} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import {AdminSubjects} from "./admin-subjects";

export const AdminSubjectsList = ({subjects: subjects}) => {
  const T = i18n.createComponent();
  return (
    subjects.length === 0 ? <Alert bsStyle="warning"><T>noSubjectsYet</T></Alert> :
      <div>
        {subjects.map((subject) => <AdminSubjects key={subject._id} subject={subject}/>)}
      </div>);
};

AdminSubjectsList.propTypes = {
  subjects: React.PropTypes.array,
};
