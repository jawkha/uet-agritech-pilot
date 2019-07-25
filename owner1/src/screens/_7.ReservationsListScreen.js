import React, { Component } from 'react';

import { apiEndpoints } from './../api/apiEndpoints';
import ListContainer from './../components/ListContainer';
import ReservationItem from './../components/ReservationItem';

class ReservationsListScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'ACCEPTED REQUESTS'
    };
  };

  render() {
    return (
      <ListContainer
        baseUrl={apiEndpoints.ownerViewAcceptedRequests.url}
        ChildComponent={ReservationItem}
      />
    );
  }
}

export default ReservationsListScreen;
