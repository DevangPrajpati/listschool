import React from 'react';
import Rating from 'react-rating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import { Glyphicon, Col, Row, Image } from 'react-bootstrap';
import { Countries } from '/imports/api/countries/countries';
import { Cities } from '/imports/api/cities/cities';
import { Subjects } from '/imports/api/subjects/subjects';
import { Schools } from '/imports/api/schools/schools';
import { Favorites } from '/imports/api/favorites/favorites';
import { insertFavorite, removeFavorite } from '/imports/api/favorites/methods';
import SchoolHelper from '/imports/modules/school-helper';
import { Images } from '/imports/api/images/images';
import { browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';
import _ from 'lodash';

export class Course extends React.Component {
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
    const course = this.props.course;
    const school = Schools.findOne({ 'schoolCourses.course': course._id });
    browserHistory.push(`/school/${school.slug}/${course._id}`);
  }

  toggleFavorite(event) {
    event.stopPropagation();
    const userId = Meteor.userId();
    const compare = Session.get('Compare');

    if (userId) {
      const course = this.props.course;
      const favorite = Favorites.findOne({ user: userId, course: course._id });
      if (favorite) {
        removeFavorite.call({ _id: favorite._id });

        delete compare[course._id];
        Session.set('Compare', compare);
        this.setState({ isComparing: false });

        this.setState({ isFavorite: false });
      } else {
        insertFavorite.call({ course: course._id });

        this.setState({ isFavorite: true });
      }
    } else {
      Bert.alert('Log in, salve e compare suas escolas favoritas.', 'warning');
    }
  }

  toggleCompare(event) {
    event.stopPropagation();

    const course = this.props.course;
    const compare = Session.get('Compare');

    if (compare[course._id]) {
      delete compare[course._id];
      Session.set('Compare', compare);
      this.setState({ isComparing: false });
    } else {
      if (Object.keys(compare).length >= 2) {
        Bert.alert('Você pode comparar apenas duas escolas de uma só vez', 'warning');
        return;
      }

      compare[course._id] = course;
      Session.set('Compare', compare);
      this.setState({ isComparing: true });
    }
  }

  // getCoursePrice(schoolCourse) {
  //   // console.log('schooll course------->', schoolCourse)
  //   const courseFilter = Session.get('CourseFilter');

  //   let coursePriceForTimeFramesBeginningInWeek1 = schoolCourse.coursePrice && schoolCourse.coursePrice.filter(coursePrice => coursePrice.weekBeginNumber === 1)[0];
  //   // console.log('courseFilter-------------->', courseFilter)

  //   console.log('coursePriceForTimeFramesBeginningInWeek1------->', coursePriceForTimeFramesBeginningInWeek1);
  //   if (coursePriceForTimeFramesBeginningInWeek1) {
  //     if (coursePriceForTimeFramesBeginningInWeek1.isInclusivePrice) {
  //       return '$' + parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceInclusive);
  //     } else {
  //       const min_duration = schoolCourse.min_duration || coursePriceForTimeFramesBeginningInWeek1.minimumWeeks
  //       const max_duration = schoolCourse.max_duration;
  //       const filteredDuration = courseFilter.duration;
  //       if (filteredDuration && filteredDuration > 0) {
  //         return '$' + parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceForWeek) * parseFloat(filteredDuration);
  //       }
  //       return '$' + parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceForWeek) * parseFloat(min_duration);
  //     }
  //   } else {
  //     return 'N/A';
  //   }
  // }

  getCoursePrice(schoolCourse) {

    let courseFilter = Session.get('CourseFilter');
    
    console.log(schoolCourse)

    let coursePriceForTimeFramesBeginningInWeek1 = schoolCourse.coursePrice && schoolCourse.coursePrice.find((coursePrice) => {
      return courseFilter.duration >= coursePrice.weekBeginNumber &&  courseFilter.duration <= coursePrice.weekEndNumber;
    });

    console.log(coursePriceForTimeFramesBeginningInWeek1)

    const min_duration = schoolCourse.min_duration || coursePriceForTimeFramesBeginningInWeek1.minimumWeeks
    const max_duration = schoolCourse.max_duration;
    const filteredDuration = courseFilter.duration;

    if (coursePriceForTimeFramesBeginningInWeek1) {
      if (coursePriceForTimeFramesBeginningInWeek1.isInclusivePrice == true) {
        return '$' + parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceInclusive);
      } else {
        if (filteredDuration && filteredDuration > 0) {
          return '$' + parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceForWeek) * parseFloat(filteredDuration);
        }
        return '$' + parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceForWeek) * parseFloat(min_duration);
      }
    } else {
      return 'N/A';
    }

  }


  render() {
    const userId = Meteor.userId();
    const course = this.props.course;
    const school = Schools.findOne({ 'schoolCourses.course': course._id });
    const city = Cities.findOne(school && school.cityId);
    const country = Countries.findOne(city && city.country);
    const compare = Session.get('Compare');
    const average = SchoolHelper.schoolAverages(school);
    const gridView = this.props.gridView;
    const subject = Subjects.findOne({ _id: course.subject })
    const subjectName = subject && subject.subjectName;

    let imageRender = (
      <Image
        src="/school-logo-placeholder.jpg"
        rounded
        responsive
      />
    );
    if (school && school.profile.avatar) {
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

    if (school && compare[school._id]) {
      compareIcon = 'check';
    }

    let compareRender = null;

    if (Favorites.findOne({ user: userId, course: course._id })) {
      favoriteClass = 'fa-heart is-favorite';
      if (this.props.canCompare) {
        compareRender = (
          <div className="course-compare">
            <Glyphicon onClick={this.toggleCompare} glyph={compareIcon} />
          </div>
        );
      }
    }
    const T = i18n.createComponent();
    return (
      < Col xs = { 12} md = { gridView? 4 : 12} lg = { gridView? 3 : 12} >
        <div
          className={gridView ? 'course' : 'course list-view'}
          onClick={this.goToSchoolView}
        >
          <div className="course-main">
            <div className="course-image">
              {imageRender}
            </div>
            <div className="course-label">
              <div className="course-label-name">{course && course.courseName}</div>
              <div className="course-label-intensity">{course && course.hours_week ? course.hours_week + ' weeks' : null}</div>
              <div className="course-label-level">{course && course.level_required ? 'Level Required - ' + course.level_required : null}</div>
              <div className="course-label-type">{course && subjectName ? 'Type - ' + subjectName : null}</div>
              <div className="course-label-school">{school && school.name}</div>
              <div className="course-label-city">{city && city.name}</div>
              <div className="course-label-country">{country && country.name}</div>
              <div className="course-rating" >
                <Rating
                  empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.overall}
                />
              </div>

              <div className='course-price pull-right badge badge-pill badge-light'> {this.getCoursePrice(course)}</div>
            </div>

            <div className="course-fav-icon" onClick={this.toggleFavorite}>
              <i className={`fa ${favoriteClass}`}></i>
            </div>
            {compareRender}
          </div>
          <div className="course-second">
            <div>
              <div className="course-label">
                <div className="course-label-name">{course.courseName}</div>
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
              <Row>
                <button className="course-view-button"><T>details</T></button>
              </Row>
              <Row>
                <button className="course-book-button"><T>bookNow</T></button>
              </Row>
            </div>
          </div>
        </div>
      </Col >
    );
  }
}

Course.propTypes = {
  course: React.PropTypes.object,
  canCompare: React.PropTypes.bool,
  gridView: React.PropTypes.bool,
};
