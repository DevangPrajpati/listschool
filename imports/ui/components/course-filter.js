import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Session} from 'meteor/session';
import i18n from 'meteor/universe:i18n';
import SliderInput from '../elements/slider-input';
import {Checkbox} from "../elements/Checkbox";

const handleFilterCourse = (value, type, isChecked) => {
  const courseFilter = Session.get('CourseFilter');
  // const isActive = event.target.classList.toggle('active');
  // console.log(value, type, isChecked);
  // console.log(courseFilter);
  const addIfNotThere = (arr, item) => {
    if (arr && arr.indexOf(item) === -1) {
      arr.push(item);
    }
    return arr;
  };

  const removeItemFromArr = (t, v, s) => {
    if (s[t] && s[t].length) {
      const newTypeArr = s[t].filter((elem) => elem !== v);
      s[t] = newTypeArr; // eslint-disable-line
    }
    return s;
  };

  // TODO refactor, remove DOM operations change to state
  if (isChecked) {
    addIfNotThere(courseFilter[type], value);
    // event.target.classList.add('active');
    Session.set('CourseFilter', courseFilter);
  } else {
    const newCourseFilter = removeItemFromArr(type, value, courseFilter);
    // event.target.classList.remove('active');
    Session.set('CourseFilter', newCourseFilter);
  }
};

const TooltipButton = ({ buttonId, buttonText, className, type, T }) => {
  return (<div className={className} onClick={(e) => handleFilterCourse(buttonId, type, e)}>
    <T>{buttonText}</T>
  </div>);
};

TooltipButton.propTypes = {
  buttonId: React.PropTypes.string,
  buttonText: React.PropTypes.string,
  tooltipValue: React.PropTypes.string,
  className: React.PropTypes.string,
  type: React.PropTypes.string,
};

export const CourseFilter = ({ languages, countries, subjects, price, duration }) => {
  const T = i18n.createComponent();
  return (
    <div>
      <Row className="show-grid" style={{paddingBottom: '5px'}}>
        <Col xs={12}>
          <div className="home-filters-wrapper">

          </div>
        </Col>
      </Row>
      <Row className="show-grid" style={{paddingBottom: '5px'}}>
        <Col xs={12}>
          <div className="home-filters-wrapper">
            <h1><T>language</T>:</h1>
            {languages.map((lang, index) => (
              <Checkbox
                onClick={(value, isChecked) => {
                  handleFilterCourse(lang, "langs", isChecked)
                }}
                labelToTranslateAndDisplay={lang}
                key={index}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row className="show-grid" style={{paddingBottom: '5px'}}>
        <Col xs={12}>
          <div className="home-filters-wrapper">
            <h1><T>location</T>:</h1>
            {countries.map((country, index) => (
              <Checkbox
                onClick={(value, isChecked) => {
                  handleFilterCourse(country, "countries", isChecked)
                }}
                labelToTranslateAndDisplay={country}
                key={index}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row className="show-grid" style={{paddingBottom: '5px'}}>
        <Col xs={12}>
          <div className="home-filters-wrapper">
            <h1><T>subject</T>:</h1>
            {subjects.map((subject, index) => (
              <Checkbox
                onClick={(value, isChecked) => {
                  handleFilterCourse(subject._id, "courses", isChecked)
                }}
                labelToTranslateAndDisplay={subject.subjectName}
                key={index}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row className="show-grid" style={{paddingBottom: '5px'}}>
          <SliderInput 
            val={price} 
            label = {"price"} 
            maximumValue = {5000} 
            stepValue = {10} unit = {"$"}
            onChange = {(val, callback)=>{
              const courseFilter = Session.get('CourseFilter');
              courseFilter.price = val;
              Session.set('CourseFilter', courseFilter);
              callback ? callback(courseFilter) : null;
            }}
            />
      </Row>
      <Row className="show-grid" style={{paddingBottom: '5px'}}>
          <SliderInput 
            val={price} 
            label = {"duration"} 
            maximumValue = {52} 
            stepValue = {1} 
            unit = {"weeks"}
            onChange = {(val, callback)=>{
              const courseFilter = Session.get('CourseFilter');
              courseFilter.duration = val;
              Session.set('CourseFilter', courseFilter);
              callback ? callback(courseFilter) : null;
            }}
            />
      </Row>
    </div>
  );
};

CourseFilter.propTypes = {
  languages: React.PropTypes.array,
  countries: React.PropTypes.array,
  courses: React.PropTypes.array,
  price: React.PropTypes.number,
  duration: React.PropTypes.number,
  T: React.PropTypes.object
};
