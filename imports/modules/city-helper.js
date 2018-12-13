import { CityFeedbacks } from '/imports/api/city-feedbacks/city-feedbacks';

const CityHelper = {};

const cityFeedbacks = (city) => (CityFeedbacks.find({ city: city._id }).fetch());

const cityAverages = (city) => {
  const feedbacks = cityFeedbacks(city);
  const averages = {};

  if (feedbacks.length > 0) {
    averages.accessibility = feedbacks.map((a) => a.grades.accessibility).reduce((a, b) => (a + b));
    averages.costOfLife = feedbacks.map((a) => a.grades.costOfLife).reduce((a, b) => (a + b));
    averages.leisure = feedbacks.map((a) => a.grades.leisure).reduce((a, b) => (a + b));
    averages.publicTransport = feedbacks.map((a) => a.grades.publicTransport).reduce((a, b) => (a + b));
    averages.qualityOfLife = feedbacks.map((a) => a.grades.qualityOfLife).reduce((a, b) => (a + b));
    averages.safety = feedbacks.map((a) => a.grades.safety).reduce((a, b) => (a + b));
    let overall = 0;
    Object.keys(averages).forEach((key) => {
      averages[key] = averages[key] / feedbacks.length;
      overall = overall + averages[key];
    });

    averages.overall = overall / Object.keys(averages).length;

    return averages;
  }

  return averages;
};

const cityProfile = (city) => {
  const profile = [];

  if (city.profile.small) { profile.push('small'); }
  if (city.profile.town) { profile.push('town'); }
  if (city.profile.beach) { profile.push('beach'); }
  if (city.profile.large) { profile.push('large'); }
  if (city.profile.campus) { profile.push('campus'); }
  if (city.profile.bicycle) { profile.push('bicycle'); }
  if (city.profile.sports) { profile.push('sports'); }
  if (city.profile.snow) { profile.push('snow'); }
  if (city.profile.sunny) { profile.push('sunny'); }
  if (city.profile.glamour) { profile.push('glamour'); }
  if (city.profile.outdoors) { profile.push('outdoors'); }
  if (city.profile.academic) { profile.push('academic'); }

  return profile;
};

CityHelper.cityAverages = cityAverages;
CityHelper.cityFeedbacks = cityFeedbacks;
CityHelper.cityProfile = cityProfile;


export default CityHelper;
