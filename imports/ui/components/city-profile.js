import React from 'react';
import Rating from 'react-rating';
import {Table, Badge, Col, Label, ResponsiveEmbed} from 'react-bootstrap';
import {T} from "../../utils/translation-utils";

const renderYoutube = (youtubeId) => {
  if (youtubeId) {
    const youtubeSrc = `http://www.youtube.com/embed/${youtubeId}`;
    return (
      <ResponsiveEmbed a16by9>
        <embed src={youtubeSrc}/>
      </ResponsiveEmbed>
    );
  }

  return '';
};

export const CityProfile = ({city, average, feedbacks, profile}) => {
  return (
    <div>
      <Col xs={12} md={8}>
        <h4 style={{textAlign: 'center'}}>
          <T>recommended</T>
        </h4>
        <h4 style={{textAlign: 'center'}}>
          <Rating empty="fa fa-star-o"
                  full="fa fa-star"
                  readonly={true}
                  initialRate={average.overall}
          />
        </h4>
        <h4><Badge>{feedbacks.length}</Badge><T>feedbacks</T></h4>
        <Table responsive hover>
          <tbody className="table-inline">
          <tr>
            <td><T>accessibility</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.accessibility}
              />
            </td>
          </tr>
          <tr>
            <td><T>costOfLife</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.costOfLife}
              />
            </td>
          </tr>
          <tr>
            <td><T>leisure</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.leisure}
              />
            </td>
          </tr>
          <tr>
            <td><T>publicTransport</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.publicTransport}
              />
            </td>
          </tr>
          <tr>
            <td><T>costOfLife</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.costOfLife}
              />
            </td>
          </tr>
          <tr>
            <td><T>qualityOfLife</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.qualityOfLife}
              />
            </td>
          </tr>
          <tr>
            <td><T>safety</T></td>
            <td className="text-right">
              <Rating empty="fa fa-star-o"
                      full="fa fa-star"
                      readonly={true}
                      initialRate={average.safety}
              />
            </td>
          </tr>
          </tbody>
        </Table>
        <h4><i className="fa fa-youtube-play" aria-hidden="true"></i><T>youtube</T></h4>
        {renderYoutube(city.profile.youtube)}
      </Col>
      <Col xs={12} md={4}>
        <h4><T>tags</T></h4>
        {profile.map((profileItem) => (
          <Label key={ profileItem } bsStyle="primary"><T>{profileItem}</T></Label>
        ))}
      </Col>
    </div>
  );
};
CityProfile.propTypes = {
  city: React.PropTypes.object,
  average: React.PropTypes.object,
  feedbacks: React.PropTypes.array,
  profile: React.PropTypes.array,
};
