/* eslint-disable no-underscore-dangle */

import faker from 'faker';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';
import {Countries} from '/imports/api/countries/countries';
import {Cities} from '/imports/api/cities/cities';
import {Subjects} from '/imports/api/subjects/subjects';
import {Schools} from '/imports/api/schools/schools';
import {Facilities} from '/imports/api/facilities/facilities';
import {SchoolFeedbacks} from '/imports/api/school-feedbacks/school-feedbacks';
import {Users} from '/imports/api/users/users';

const users = [{
  email: 'listaschool@gmail.com',
  password: 'password123456',
  profile: {
    firstName: 'Leonardo',
    lastName: 'Sona',
  },
  roles: ['admin'],
}];

users.forEach(({email, password, profile, roles}) => {
  const userExists = Users.findOne({'emails.address': email});

  if (!userExists) {
    const userId = Accounts.createUser({email, password, profile});
    Roles.addUsersToRoles(userId, roles, Roles.GLOBAL_GROUP);
  }
});

if (!Countries.findOne({name: 'Brazil'})) {
  const adminUser = Users.findOne({'emails.address': 'listaschool@gmail.com'});

  const getCountry = Countries.insert({
    name: 'Brazil',
    profile: {
      currency: faker.finance.currencyCode(),
      vaccines: faker.hacker.phrase(),
      visa: faker.random.boolean(),
    },
  });

  const getSpCity = Cities.insert({
    name: 'Sao Paulo',
    country: getCountry,
    profile: {
      small: faker.random.boolean(),
      town: faker.random.boolean(),
      beach: faker.random.boolean(),
      large: faker.random.boolean(),
      campus: faker.random.boolean(),
      bicycle: faker.random.boolean(),
      sports: faker.random.boolean(),
      snow: faker.random.boolean(),
      sunny: faker.random.boolean(),
      glamour: faker.random.boolean(),
      outdoors: faker.random.boolean(),
      academic: faker.random.boolean(),
      countryside: faker.random.boolean(),
      mountain: faker.random.boolean(),
      minimum_wage: faker.internet.url(),
      current_time: faker.internet.url(),
      cosft_of_life: faker.internet.url(),
      wheather: faker.internet.url(),
      youtube: faker.internet.url(),
    },
  });

  const getMgCity = Cities.insert({
    name: 'Belo Horizonte',
    country: getCountry,
    profile: {
      small: faker.random.boolean(),
      town: faker.random.boolean(),
      beach: faker.random.boolean(),
      large: faker.random.boolean(),
      campus: faker.random.boolean(),
      bicycle: faker.random.boolean(),
      sports: faker.random.boolean(),
      snow: faker.random.boolean(),
      sunny: faker.random.boolean(),
      glamour: faker.random.boolean(),
      outdoors: faker.random.boolean(),
      academic: faker.random.boolean(),
      countryside: faker.random.boolean(),
      mountain: faker.random.boolean(),
      minimum_wage: faker.internet.url(),
      current_time: faker.internet.url(),
      cosft_of_life: faker.internet.url(),
      wheather: faker.internet.url(),
      youtube: faker.internet.url(),
    },
  });
  Subjects.insert({
    subjectName: "general",
  });
  Subjects.insert({
    subjectName: "highSchool",
  });
  Subjects.insert({
    subjectName: "intensive",
  });
  Subjects.insert({
    subjectName: "junior",
  });
  Subjects.insert({
    subjectName: "languageCertification",
  });
  Subjects.insert({
    subjectName: "lastMinute",
  });
  Subjects.insert({
    subjectName: "multiLocation",
  });
  Subjects.insert({
    subjectName: "oneToOne",
  });
  Subjects.insert({
    subjectName: "coursePlusProfession",
  });
  Subjects.insert({
    subjectName: "coursePlusSportCulture",
  });
  Subjects.insert({
    subjectName: "promotion",
  });
  Subjects.insert({
    subjectName: "semiIntensive",
  });
  Subjects.insert({
    subjectName: "senior",
  });
  Subjects.insert({
    subjectName: "studyAndWork",
  });
  Subjects.insert({
    subjectName: "volunteer",
  });
  Subjects.insert({
    subjectName: "work",
  });
  Subjects.insert({
    subjectName: "year",
  });
  Subjects.insert({
    subjectName: "semester",
  });
  Subjects.insert({
    subjectName: "certificate",
  });
  Subjects.insert({
    subjectName: "diploma",
  });
  Subjects.insert({
    subjectName: "advancedDiploma",
  });
  Subjects.insert({
    subjectName: "degree",
  });
  Subjects.insert({
    subjectName: "graduateCertificate",
  });

  Facilities.insert({
    facilityName: "adaptedForStudentsWithLearningDifficulty"
  });
  Facilities.insert({
    facilityName: "afterClassSeminars",
  });
  Facilities.insert({
    facilityName: "airConditioningInClassrooms",
  });
  Facilities.insert({
    facilityName: "computerLab",
  });
  Facilities.insert({
    facilityName: "culturalTrips",
  });
  Facilities.insert({
    facilityName: "disabledToilet",
  });
  Facilities.insert({
    facilityName: "vendingMachine",
  });
  Facilities.insert({
    facilityName: "eatingArea",
  });
  Facilities.insert({
    facilityName: "electronicWhiteboardInClassrooms",
  });
  Facilities.insert({
    facilityName: "freeCoffee",
  });
  Facilities.insert({
    facilityName: "freeWifi",
  });
  Facilities.insert({
    facilityName: "freeParking",
  });
  Facilities.insert({
    facilityName: "freeWaterDispenser",
  });
  Facilities.insert({
    facilityName: "fridgeForStudents",
  });
  Facilities.insert({
    facilityName: "gamesRoom",
  });
  Facilities.insert({
    facilityName: "heatingInClassrooms",
  });
  Facilities.insert({
    facilityName: "kitchenForStudents",
  });
  Facilities.insert({
    facilityName: "library",
  });
  Facilities.insert({
    facilityName: "lounge",
  });
  Facilities.insert({
    facilityName: "microwaveForStudents",
  });
  Facilities.insert({
    facilityName: "microwaveForStudents",
  });
  Facilities.insert({
    facilityName: "movieRoom",
  });
  Facilities.insert({
    facilityName: "socialActivities",
  });
  Facilities.insert({
    facilityName: "sportsActivities",
  });
  Facilities.insert({
    facilityName: "studyingArea",
  });
  Facilities.insert({
    facilityName: "tvInClassrooms",
  });
  Facilities.insert({
    facilityName: "tvRoom",
  });
  Facilities.insert({
    facilityName: "videoGameConsole",
  });
  Facilities.insert({
    facilityName: "wheelchairAccess",
  });

  const school1 = Schools.insert({
    name: 'Escola CCAA',
    description: faker.hacker.phrase(),
    cityId: getSpCity,
    // accommodations: {
    //   familyHouse: faker.random.boolean(),
    //   hotel: faker.random.boolean(),
    //   studentResidence: faker.random.boolean(),
    // },
    // facilities: {
    //   accessibility: faker.random.boolean(),
    //   transfer: faker.random.boolean(),
    //   insurance: faker.random.boolean(),
    //   job_support: faker.random.boolean(),
    //   description: faker.hacker.phrase(),
    // },
    schoolCourses: [],
    accommodations: [],
    facilities: [],
    profile: {
      address: faker.address.streetAddress(),
      website: faker.internet.url(),
      facebook: faker.internet.url(),
      twitter: faker.internet.url(),
      instagram: faker.internet.url(),
      currency: faker.finance.currencyCode(),
      language: "ENG",
    },
  });

  const school2 = Schools.insert({
    name: 'Escola Cultura',
    description: faker.hacker.phrase(),
    cityId: getSpCity,
    schoolCourses: [],
    accommodations: [],
    facilities: [],
    profile: {
      address: faker.address.streetAddress(),
      website: faker.internet.url(),
      facebook: faker.internet.url(),
      twitter: faker.internet.url(),
      instagram: faker.internet.url(),
      currency: faker.finance.currencyCode(),
      language: "PT",
    },
  });

  const school3 = Schools.insert({
    name: 'Escola Cultura Inglesa',
    description: faker.hacker.phrase(),
    cityId: getMgCity,
    schoolCourses: [],
    accommodations: [],
    facilities: [],
    profile: {
      address: faker.address.streetAddress(),
      website: faker.internet.url(),
      facebook: faker.internet.url(),
      twitter: faker.internet.url(),
      instagram: faker.internet.url(),
      currency: faker.finance.currencyCode(),
      language: "PT",
    },
  });

  [1, 2, 3].map(() => {
    const grades = {
      qualityOfTeaching: 1 + (faker.random.number() % 5),
      teachingMaterial: 1 + (faker.random.number() % 5),
      schoolFacilities: 1 + (faker.random.number() % 5),
      socialExtraActivities: 1 + (faker.random.number() % 5),
      schoolLocation: 1 + (faker.random.number() % 5),
      housing: 1 + (faker.random.number() % 5),
    };

    SchoolFeedbacks.insert({
      user: adminUser._id,
      school: school1,
      grades,
      comment: faker.hacker.phrase(),
    });

    return 1;
  });

  [1, 2, 3].map(() => {
    const grades = {
      qualityOfTeaching: 1 + (faker.random.number() % 5),
      teachingMaterial: 1 + (faker.random.number() % 5),
      schoolFacilities: 1 + (faker.random.number() % 5),
      socialExtraActivities: 1 + (faker.random.number() % 5),
      schoolLocation: 1 + (faker.random.number() % 5),
      housing: 1 + (faker.random.number() % 5),
    };

    SchoolFeedbacks.insert({
      user: adminUser._id,
      school: school2,
      grades,
      comment: faker.hacker.phrase(),
    });

    return 1;
  });

  [1, 2, 3].map(() => {
    const grades = {
      qualityOfTeaching: 1 + (faker.random.number() % 5),
      teachingMaterial: 1 + (faker.random.number() % 5),
      schoolFacilities: 1 + (faker.random.number() % 5),
      socialExtraActivities: 1 + (faker.random.number() % 5),
      schoolLocation: 1 + (faker.random.number() % 5),
      housing: 1 + (faker.random.number() % 5),
    };

    SchoolFeedbacks.insert({
      user: adminUser._id,
      school: school3,
      grades,
      comment: faker.hacker.phrase(),
    });

    return 1;
  });
}
