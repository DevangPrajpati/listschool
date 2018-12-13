import React from 'react';
import Rating from 'react-rating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import { Glyphicon, Col, Image } from 'react-bootstrap';
import { Countries } from '/imports/api/countries/countries';
import { Cities } from '/imports/api/cities/cities';
import { Favorites } from '/imports/api/favorites/favorites';
import { insertFavorite, removeFavorite } from '/imports/api/favorites/methods';
import SchoolHelper from '/imports/modules/school-helper';
import { Images } from '/imports/api/images/images';
import { browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';

export class School extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      isComparing: false,
    };
    this.close = this.close.bind(this);
    this.goToSchoolView = this.goToSchoolView.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleCompare = this.toggleCompare.bind(this);
  }

  close() {
    Session.set('GivenFeedback', false);
  }

  goToSchoolView() {
    browserHistory.push(`/school/${this.props.school.slug}`);
  }

  toggleFavorite(event) {
    event.stopPropagation();
    const userId = Meteor.userId();
    const compare = Session.get('Compare');

    if (userId) {
      const school = this.props.school;
      const favorite = Favorites.findOne({ user: userId, school: school._id });
      if (favorite) {
        removeFavorite.call({ _id: favorite._id });

        delete compare[school._id];
        Session.set('Compare', compare);
        this.setState({ isComparing: false });

        this.setState({ isFavorite: false });
      } else {
        insertFavorite.call({ school: school._id });

        this.setState({ isFavorite: true });
      }
    } else {
      Bert.alert('Log in, salve e compare suas escolas favoritas.', 'warning');
    }
  }

  toggleCompare(event) {
    event.stopPropagation();

    const school = this.props.school;
    const compare = Session.get('Compare');

    if (compare[school._id]) {
      delete compare[school._id];
      Session.set('Compare', compare);
      this.setState({ isComparing: false });
    } else {
      if (Object.keys(compare).length >= 2) {
        Bert.alert('Você pode comparar apenas duas escolas de uma só vez', 'warning');
        return;
      }

      compare[school._id] = school;
      Session.set('Compare', compare);
      this.setState({ isComparing: true });
    }
  }

  render() {
    const userId = Meteor.userId();
    const school = this.props.school;
    const city = Cities.findOne(school.cityId);
    const country = Countries.findOne(city.country);
    const compare = Session.get('Compare');
    const average = SchoolHelper.schoolAverages(school);
    const gridView = this.props.gridView;

    let imageRender = (
      <Image
        src="/school-logo-placeholder.jpg"
        rounded
        responsive
      />
    );
    if (school.profile.avatar) {
      const image = Images.findOne({ _id: school.profile.avatar });
      let src = '';
      if (image && image.link().length > 0) {
        src = image.link();
      } else {
        src = school.profile.avatar;
      }

      imageRender = (
        <Image
          src={src}
          rounded
          responsive
        />
      );
    }

    let compareIcon = this.state.isComparing ? 'check' : 'unchecked';
    let favoriteClass = this.state.isFavorite ? 'fa-heart is-favorite' : 'fa-heart-o';

    if (compare[school._id]) {
      compareIcon = 'check';
    }

    let compareRender = null;

    if (Favorites.findOne({ user: userId, school: school._id })) {
      favoriteClass = 'fa-heart is-favorite';
      if (this.props.canCompare) {
        compareRender = (
          <div className="school-compare">
            <Glyphicon onClick={this.toggleCompare} glyph={compareIcon} />
          </div>
        );
      }
    }
    const T = i18n.createComponent();
    return (
      <Col xs={12} md={gridView ? 4 : 12} lg={gridView ? 3 : 12}>
        <div
          className={gridView ? 'school' : 'school list-view'}
          onClick={this.goToSchoolView}
        >
          <div className="school-main">
            <div className="school-image">
              {imageRender}
            </div>
            <div className="school-label">
              <div className="school-label-name">{school.name}</div>
              <div className="school-label-city">{city.name}</div>
              <div className="school-label-country">{country.name}</div>
              <div className="school-rating" >
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.overall}
                />
              </div>
            </div>
            <div className="school-fav-icon" onClick={this.toggleFavorite}>
              <i className={`fa ${favoriteClass}`}></i>
            </div>
            {compareRender}
          </div>
          <div className="school-second">
            <div>
              <div className="school-label">
                <div className="school-label-name">{school.name}</div>
              </div>
              <div>
                <span className="rating-label"><T>qualityOfTeaching</T></span>
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.qualityOfTeaching}
                />
              </div>
              <div>
                <span className="rating-label"><T>teachingMaterial</T></span>
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.teachingMaterial}
                />
              </div>
              <div>
                <span className="rating-label"><T>socialExtraActivities</T></span>
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.socialExtraActivities}
                />
              </div>
              <div>
                <span className="rating-label"><T>schoolLocation</T></span>
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.schoolLocation}
                />
              </div>
              <div>
                <span className="rating-label"><T>housing</T></span>
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.housing}
                />
              </div>
              <button className="school-view-button"><T>details</T></button>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

School.propTypes = {
  school: React.PropTypes.object,
  canCompare: React.PropTypes.bool,
  gridView: React.PropTypes.bool,
};
