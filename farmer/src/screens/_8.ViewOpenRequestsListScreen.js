import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

import OpenRequestListItem from './../components/OpenRequestListItem';

class ViewOpenRequestsListScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'OPEN REQUESTS',
      headerStyle: {
        backgroundColor: '#3CB371'
      },
      headerTintColor: '#FFFFFF'
    };
  };

  get userProfile() {
    const { navigation } = this.props;
    const data = navigation.getParam('userData');

    return data;
  }

  get openReservationRequestsList() {
    const { navigation } = this.props;
    const data = navigation.getParam('openReservationRequestsList');

    return data;
  }

  handleItemPress = item => {
    const { navigation } = this.props;
    const userData = this.userProfile;

    navigation.navigate('Request Detail', {
      userData,
      item
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.openReservationRequestsList.map((item, index) => (
          <OpenRequestListItem
            handleItemPress={this.handleItemPress}
            key={index}
            openRequestItem={item}
          />
        ))}
      </ScrollView>
    );
  }
}

export default ViewOpenRequestsListScreen;

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
    // paddingVertical: 5
  }
});
