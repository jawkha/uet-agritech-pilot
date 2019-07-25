import React, { Component } from 'react';

import { apiEndpoints } from './../api/apiEndpoints';
import ListContainer from './../components/ListContainer';
import HistoryItem from './../components/HistoryItem';

class ReservationsHistoryScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'RESERVATION HISTORY'
    };
  };

  render() {
    return (
      <ListContainer baseUrl={apiEndpoints.ownerViewHistory.url} ChildComponent={HistoryItem} />
    );
  }
}

export default ReservationsHistoryScreen;
