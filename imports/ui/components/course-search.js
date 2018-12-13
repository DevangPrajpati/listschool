import React from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Session } from 'meteor/session';
import i18n from 'meteor/universe:i18n';

const handleInsertCourse = (event) => {
  const target = event.target;
  const search = target.value.trim();
  Session.set('CourseSearch', search);
};
const T = i18n.createComponent();

export const CourseSearch = () => (
  <FormGroup className="school-search-form">
    <InputGroup>
      <InputGroup.Addon className="school-search-form-addon">
        <Glyphicon glyph="search" />
      </InputGroup.Addon>
      <T _translateProps={['placeholder']}>
        <FormControl
          className="school-search-form-input"
          id="schoolSearch"
          type="text"
          onKeyUp={ handleInsertCourse }
          placeholder="searchForASchoolCountryCityCourse"
        />
      </T>
    </InputGroup>
  </FormGroup>
);
