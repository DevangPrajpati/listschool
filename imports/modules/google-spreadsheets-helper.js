import { Meteor } from 'meteor/meteor';
import { Countries } from '/imports/api/countries/countries';
import { Cities } from '/imports/api/cities/cities';
import { Schools } from '/imports/api/schools/schools';

const spreadsheetName = 'Schools';
const serviceKey = 'listaschool-140913';
const serviceEmail = `${serviceKey}@appspot.gserviceaccount.com`;

const GoogleSpreadsheetsHelper = {};
const spreadsheetPropNames = {};
const schoolPropNames = {};

const rowToSchool = (row) => {
  const doc = {};

  Object.keys(row).forEach((colNum) => {
    const propName = spreadsheetPropNames[colNum];
    if (propName) {
      let docValue = row[colNum];
      if (docValue === 'TRUE') { docValue = true; }
      if (docValue === 'FALSE') { docValue = false; }
      doc[propName] = docValue;
    }
  });

  const newDoc = {};
  Object.keys(doc).forEach((prop) => {
    if (prop.split('.').length > 1) {
      const propName = prop.split('.');
      if (!newDoc[propName[0]]) { newDoc[propName[0]] = {}; }

      newDoc[propName[0]][propName[1]] = doc[prop];
    } else {
      newDoc[prop] = doc[prop];
    }
  });

  const country = Countries.findOne({ name: newDoc.city.country });
  const city = Cities.findOne({ name: newDoc.city.name, country: country._id });
  newDoc.cityId = city._id;

  return newDoc;
};

const schoolToRow = (school) => {
  const row = {};
  Object.keys(schoolPropNames).forEach((key) => {
    const pCol = schoolPropNames[key];

    let propName = key;
    if (propName.split('.').length > 1) {
      propName = propName.split('.');
      row[pCol] = school[propName[0]][propName[1]];
    } else {
      row[pCol] = school[propName];
    }
  });

  return row;
};

const pullAllSchools = () => {
  const result = Meteor.call('spreadsheet/fetch2', spreadsheetName, '1', { email: serviceEmail });

  if (!result) {
    throw new Meteor.Error('schools.download.resultNotFound',
                           'We did not found a result to download');
  }

  // Gather property names
  Object.keys(result.rows[1]).forEach((colNum) => {
    spreadsheetPropNames[colNum] = result.rows[1][colNum];
  });

  Object.keys(result.rows).forEach((rowNum) => {
    if (rowNum !== '1') {
      const doc = rowToSchool(result.rows[rowNum]);

      const currentSchool = Schools.findOne({ name: doc.name, cityId: doc.cityId });
      if (currentSchool) {
        Schools.update(currentSchool._id, { $set: doc });
      } else {
        Schools.insert(doc);
      }
    }
  });
};

const writeAllSchools = () => {
  const sampleSchool = Schools.findOne();

  if (!sampleSchool) {
    throw new Meteor.Error('schools.upload.empty',
                           'There is no Schools to upload.');
  }

  const spreadsheet = {};
  spreadsheet[1] = {};
  let col = 1;

  // Gather property names
  Object.keys(Schools.schema.schema()).forEach((prop) => {
    if (typeof sampleSchool[prop] !== 'object') {
      spreadsheet[1][col] = prop;
      schoolPropNames[prop] = col;
      col++;
    }
  });

  let row = 2;
  Schools.find({}, { sort: { _id: 1 } }).forEach((school) => {
    spreadsheet[row] = schoolToRow(school);
    spreadsheet[row][col] = new Date().toLocaleString();
    row++;
  });

  Meteor.call('spreadsheet/update', spreadsheetName, '1', spreadsheet, { email: serviceEmail });
};

GoogleSpreadsheetsHelper.pullAllSchools = pullAllSchools;
GoogleSpreadsheetsHelper.writeAllSchools = writeAllSchools;

export default GoogleSpreadsheetsHelper;
