import React, { Component } from 'react';
import ReservationItem from './../components/ReservationItem';
import { withNavigation } from 'react-navigation';

class ReservationDetailScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'REQUEST DETAILS'
    };
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return <ReservationItem item={item} />;
  }
}

export default withNavigation(ReservationDetailScreen);
