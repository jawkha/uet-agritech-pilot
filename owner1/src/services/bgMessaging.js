import firebase from 'react-native-firebase';

export default async message => {
  console.log('Logging message from bgMessaging.js', { message });

  return Promise.resolve();
};
