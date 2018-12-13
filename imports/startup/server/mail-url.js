import { Meteor } from 'meteor/meteor';

const smtp = {
  username: Meteor.settings.private.mailgun.login,
  password: Meteor.settings.private.mailgun.password,
  server: 'smtp.mailgun.org',
  port: 587,
};

process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp.username)}:${encodeURIComponent(smtp.password)}@${encodeURIComponent(smtp.server)}:${smtp.port}`;
