import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Row, Col, Tab, Nav, NavItem, Glyphicon, Button, Image } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { SchoolFeedbackForm } from '/imports/ui/components/school-feedback-form';
import SchoolHelper from '/imports/modules/school-helper';
import { SchoolProfile } from '/imports/ui/components/school-profile';
import CityHelper from '/imports/modules/city-helper';
import { CityProfile } from '/imports/ui/components/city-profile';
import { CityFeedbackForm } from '/imports/ui/components/city-feedback-form';
import { Favorites } from '/imports/api/favorites/favorites';
import { insertFavorite, removeFavorite } from '/imports/api/favorites/methods';
import i18n from 'meteor/universe:i18n';

class School extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
    this.imageRender = this.imageRender.bind(this);
    this.schoolActions = this.schoolActions.bind(this);
    this.schoolFeedback = this.schoolFeedback.bind(this);
    this.cityFeedback = this.cityFeedback.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }
  imageRender() {
    if (this.props.school.profile.avatar) {
      const image = this.props.image;
      let src = '';
      if (image && image.link().length > 0) {
        src = image.link();
      } else {
        src = this.props.school.profile.avatar;
      }
      return (
        <Image src={src} rounded responsive style={{ float: 'left', marginBottom: '5px' }} />
      );
    }
    return null;
  }
  toggleGivenFeedback() {
    console.log('wchodze');
    const userId = Meteor.userId();
    if (userId) {
      Session.set('GivenFeedback', !Session.get('GivenFeedback'));
    } else {
      Bert.alert('Você precisa fazer o login para adicionar um feedback', 'warning');
    }
  }
  schoolActions() {
    const testGivenFeedback = Session.get('GivenFeedback');
    const T = i18n.createComponent();
    if (testGivenFeedback) {
      return (
        <span onClick={this.toggleGivenFeedback}>
          <Glyphicon glyph="search"/> <T>information</T>
        </span>
      );
    }
    return (
      <span onClick={this.toggleGivenFeedback}>
        <Glyphicon glyph="pencil"/> <T>vote</T>
      </span>
    );
  }
  schoolFeedback() {
    const testGivenFeedback = Session.get('GivenFeedback');
    if (testGivenFeedback) {
      return <SchoolFeedbackForm school={this.props.school} />;
    }
    let subjectsSubscription = Meteor.subscribe('subjects');
    let schoolCoursesSubscription = Meteor.subscribe(('schoolCourses'));
    if (subjectsSubscription.ready() && schoolCoursesSubscription.ready()) {
      const average = SchoolHelper.schoolAverages(this.props.school);
      const feedbacks = SchoolHelper.schoolFeedbacks(this.props.school);
      const subjects = SchoolHelper.schoolSubjects(this.props.school);
      return <SchoolProfile school={this.props.school}
                            average={average}
                            feedbacks={feedbacks}
                            subjects={subjects}
      />;
    }
  }
  cityFeedback() {
    const city = this.props.city;
    const testGivenFeedback = Session.get('GivenFeedback');

    if (testGivenFeedback) {
      return <CityFeedbackForm city={city} />;
    }

    const average = CityHelper.cityAverages(city);
    const feedbacks = CityHelper.cityFeedbacks(city);
    const profile = CityHelper.cityProfile(city);

    return <CityProfile city={city}
                        average={average}
                        feedbacks={feedbacks}
                        profile={profile} />;
  }
  toggleFavorite() {
    const userId = Meteor.userId();
    if (this.state.isFavorite) {
      const favorite = Favorites.findOne({ user: userId, school: this.props.school._id });
      removeFavorite.call({ _id: favorite._id });
      this.setState({ isFavorite: false });
    } else {
      insertFavorite.call({ school: this.props.school._id });
      this.setState({ isFavorite: true });
    }
  }
  render() {
    const T = i18n.createComponent();
    const school = this.props.school;
    const city = this.props.city;
    const country = this.props.country;
    let favoriteClass = this.state.isFavorite ? 'fa-heart is-favorite' : 'fa-heart-o';
    let websiteRender = '';
    let facebookRender = '';
    let twitterRender = '';
    let instagramRender = '';
    if (school.profile.website) {
      websiteRender = (
        <small>
          <a href={school.profile.website} target="_blank" style={{ color: '#b4bcc2' }}>
            {school.profile.website}
          </a>
        </small>
      );
    }

    if (school.profile.facebook) {
      facebookRender = (
        <a className="social-network" href={school.profile.facebook} target="_blank">
          <i className="fa fa-facebook"></i>
        </a>
      );
    }

    if (school.profile.twitter) {
      twitterRender = (
        <a className="social-network" href={school.profile.twitter} target="_blank">
          <i className="fa fa-twitter"></i>
        </a>
      );
    }

    if (school.profile.instagram) {
      instagramRender = (
        <a className="social-network" href={school.profile.instagram} target="_blank">
          <i className="fa fa-instagram"></i>
        </a>
      );
    }
    if (Favorites.findOne({ user: Meteor.userId(), school: this.props.school._id })) {
      favoriteClass = 'fa-heart is-favorite';
    }
    return (
      <div className="school-view-container">
        <Row>
          <Col xs={4} lg={2}>
            <div className="school-view-logo">
              {this.imageRender()}
            </div>
          </Col>
          <Col xs={8} lg={10}>
            <div>
              <div className="school-view-fav-icon" onClick={this.toggleFavorite}>
                <i className={`fa ${favoriteClass}`}></i>
              </div>
              <span className="school-view-title">{school.name}</span>
            </div>
            <div className="school-view-place">
              <small>{city.name} / {country.name}</small>
            </div>
            <div>
              {websiteRender}
            </div>
            <div>
              {facebookRender}
              {twitterRender}
              {instagramRender}
            </div>
          </Col>
        </Row>
        <Tab.Container id="left-tabs-example" className="school-view-tabs" defaultActiveKey="first">
          <Row>
            <Col xs={12} className="school-view-tabs-items">
              <div className="school-view-actions">
                {this.schoolActions()}
              </div>
              <Nav bsStyle="pills">
                <NavItem eventKey="first" className="tab-item">
                  <T>school</T>
                </NavItem>
                <NavItem eventKey="second" className="tab-item">
                  <T>city</T>
                </NavItem>
                <NavItem eventKey="third" className="tab-item">
                  <T>course</T>
                </NavItem>
              </Nav>
            </Col>
            <Col xs={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  {this.schoolFeedback()}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {this.cityFeedback()}
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

School.propTypes = {
  school: React.PropTypes.object.isRequired,
  city: React.PropTypes.object.isRequired,
  country: React.PropTypes.object.isRequired,
  image: React.PropTypes.object.isRequired,
  course: React.PropTypes.object,
};

export default School;
