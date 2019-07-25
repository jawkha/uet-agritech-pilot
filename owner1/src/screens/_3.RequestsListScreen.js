import React, { Component } from 'react';

import { apiEndpoints } from './../api/apiEndpoints';
import ListContainer from './../components/ListContainer';
import RequestItem from './../components/RequestItem';

class RequestsListScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'OPEN REQUESTS'
    };
  };

  render() {
    return (
      <ListContainer
        baseUrl={apiEndpoints.ownerViewPendingRequests.url}
        ChildComponent={RequestItem}
      />
    );
  }
}

export default RequestsListScreen;
