import React from 'react';
import Rating from 'react-rating';
import { Table, Row, Col, Label } from 'react-bootstrap';
import SchoolHelper from '/imports/modules/school-helper';
import CityHelper from '/imports/modules/city-helper';
import { Cities } from '/imports/api/cities/cities';
import i18n from 'meteor/universe:i18n';

// import { Images } from '/imports/api/images/images';
//
// const renderImage = (school) => {
//   const image = Images.findOne({ _id: school.profile.avatar });
//   if (image) {
//     return (
//         <Image src={image.link()}
//               rounded
//               responsive
//               style={{ float: 'left', marginBottom: '5px' }}
//         />
//     );
//   }
//
//   return '';
// };

export class Compare extends React.Component {
  render() {
    const schools = this.props.schools;
    const averages = {};
    schools.map((school) => (averages[school._id] = SchoolHelper.schoolAverages(school)));
    const cityAverages = {};
    const cityProfile = {};
    schools.forEach((school) => {
      if (!cityAverages[school.cityId]) {
        const city = Cities.findOne(school.cityId);
        cityAverages[school.cityId] = CityHelper.cityAverages(city);
        cityProfile[school.cityId] = CityHelper.cityProfile(city);
      }
    });
    const T = i18n.createComponent();

    return (
      schools.length === 0 ? <div></div> :
      <Row>
        <Col xs={ 12 }>
          <h4 className="page-header">Compare</h4>
        </Col>
        <Col xs={ 4 } style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <Table responsive bordered hover striped>
            <tbody>
                <tr><td><strong><T>school</T></strong></td></tr>
                <tr><td><strong><T>city</T></strong></td></tr>
                <tr><td><strong><T>recommended</T></strong></td></tr>
                <tr><td><strong><T>qualityOfTeaching</T></strong></td></tr>
                <tr><td><strong><T>teachingMaterial</T></strong></td></tr>
                <tr><td><strong><T>schoolFacilities</T></strong></td></tr>
                <tr><td><strong><T>socialExtraActivities</T></strong></td></tr>
                <tr><td><strong><T>schoolLocation</T></strong></td></tr>
                <tr><td><strong><T>housing</T></strong></td></tr>
                <tr><td><strong><T>studyAndWork</T></strong></td></tr>
                <tr><td><strong><T>cityType</T></strong></td></tr>
            </tbody>
          </Table>
        </Col>
        {schools.map((school) => (
          <Col xs={ 4 } key={ school._id } style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Table responsive bordered hover striped>
              <tbody>
                  <tr><td>{school.name}</td></tr>
                  <tr><td>{school.city.name}</td></tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].overall}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].qualityOfTeaching}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].teachingMaterial}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].schoolFacilities}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].socialExtraActivities}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].schoolLocation}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Rating empty="fa fa-star-o"
                              full="fa fa-star"
                              readonly={true}
                              initialRate={averages[school._id].housing}
                      />
                    </td>
                  </tr>
                  {/*<tr><td>{school.courses.studyWork ? 'Sim' : 'Não'}</td></tr>*/}
                  <tr>
                    <td>
                      {cityProfile[school.cityId].map((profileItem) => (
                        <Label key={ profileItem } bsStyle="primary">{profileItem}</Label>
                      ))}
                    </td>
                  </tr>
              </tbody>
            </Table>
          </Col>
        ))}
      </Row>
    );
  }
}

Compare.propTypes = { schools: React.PropTypes.array };
