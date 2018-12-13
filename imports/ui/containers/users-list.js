import { composeWithTracker } from 'react-komposer';
import { Users } from '../../api/users/users';
import { UsersList } from '../components/users-list';
import { Meteor } from 'meteor/meteor';
import { Loading } from '../components/loading';

const filterUsers = () => {
  // const favorites = Favorites.find({ user: Meteor.userId() }).fetch();
  // const schoolIds = favorites.map((favorite) => (favorite.school));
  const users = Users.find({ 'profile.public': true }).fetch();

  return users;
};

const composer = (props, onData) => {
  const userSubscription = Meteor.subscribe('users');
  if (userSubscription.ready()) {
    const users = filterUsers();

    onData(null, { users });
  }
};

export default composeWithTracker(composer, Loading)(UsersList);
