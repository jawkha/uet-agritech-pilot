import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  Image
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

import { apiEndpoints } from './../api/apiEndpoints';
import AppLogo from './../assets/app-logo.png';

class LoginScreen extends Component {
  state = {
    cnic: '',
    password: '',
    errorMessage:
      'Please check your login details and try again. The credentials provided are invalid.',
    displayErrorMessage: false
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#2491F6'
    }
  };

  getUserCnicFromStorage = async () => {
    try {
      const userCnic = await AsyncStorage.getItem('@cnic');
      if (userCnic) {
        this.setState({ cnic: userCnic }, () =>
          console.log(`User CNIC ${this.state.cnic} fetched from async storage.`)
        );
      }
    } catch (e) {
      this.setState(
        {
          errorMessage: 'An error occurred in fetching CNIC value from async storage'
        },
        () => console.log(this.state, e)
      );
    }
  };

  saveUserCnicInStorage = async () => {
    try {
      await AsyncStorage.setItem('@cnic', this.state.cnic);
    } catch (e) {
      this.setState(
        {
          errorMessage: 'An error occurred in storing CNIC value in async storage'
        },
        () => console.log(this.state, e)
      );
    }
  };

  alertUser = (type, content) => {
    Alert.alert(type, content, [
      {
        text: 'OK',
        onPress: () => console.log('OK Button pressed')
      }
    ]);
  };

  componentDidMount() {
    this.getUserCnicFromStorage();
  }

  handleCnicInputChange = text => {
    /**
     * We are using a RegEx to prevent the user from entering non-digit characters
     * since we know the CNIC numbers in Pakistan are made up of only numeric characters.
     */
    this.setState(
      { displayErrorMessage: false, cnic: text.replace(/\D/g, '') }
      // console.log(this.state.cnic)
    );
  };

  handlePasswordInputChange = text => {
    /**
     * We are using a RegEx to prevent the user from entering white space since
     * the password is expected to be a string of non-white space characters.
     */
    this.setState(
      { displayErrorMessage: false, password: text.replace(/\s/g, '') }
      // console.log(this.state.password)
    );
  };

  isValidCNIC = () => {
    /**
     * Provide validation parameters for the CNIC here
     * For now, it only checks that the ID string has a length of 13 numeric characters
     * Also, make sure the error message is updated to reflect the requirements of
     * the CNIC.
     */
    const cnic = this.state.cnic;
    if (cnic && cnic.length === 13) {
      console.log(
        `Performing basic validation on the provided CNIC. CNIC ${cnic} has 13 digits and should be sent to the server for further validation.`
      );
      return true;
    } else {
      this.setState(
        {
          errorMessage:
            'Please check your login details and try again. The credentials provided are invalid.'
        },
        () => this.alertUser('Error', this.state.errorMessage)
      );
      return false;
    }
  };

  handlePress = async => {
    this.setState({ displayErrorMessage: false });
    const baseUrl = apiEndpoints.ownerAuth.url;
    const { cnic, password } = this.state;
    const constructedUrl = `${baseUrl}?cnic=${cnic}&pwd=${password}`;
    if (this.isValidCNIC() === true) {
      /**
       * Here we first confirm that the user is connected to the internet and
       * that a network request can be made for user login.
       */
      return NetInfo.fetch().then(NetInfoState => {
        console.log('Connection type', NetInfoState);
        console.log('Is connected?', NetInfoState.isConnected);
        if (NetInfoState.isConnected === false) {
          this.setState(
            {
              errorMessage:
                'You do not seem to be connected to the internet. Please check your connection settings and try again.'
            },
            () => this.alertUser('Error', this.state.errorMessage)
          );
        } else {
          console.log('Connected to internet');
          return fetch(constructedUrl)
            .then(response => response.json())
            .then(data => {
              console.log({ data });
              if (data.success === 0) {
                this.setState(
                  {
                    errorMessage:
                      'The login credentials are incorrect. Please try again using the correct CNIC and password combination.'
                  },
                  () => this.alertUser('Error', this.state.errorMessage)
                );
              } else {
                console.log('Login successful');
                const { navigation } = this.props;
                const userData = {
                  userCnic: this.state.cnic,
                  userProfileData: data.Owner[0]
                };
                this.saveUserCnicInStorage().then(() => {
                  navigation.navigate('Choices', { userData });
                });
              }
            });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2491F6" />
        <Image source={AppLogo} style={styles.logo} />
        <TextInput
          style={styles.cnicInput}
          onChangeText={this.handleCnicInputChange}
          value={this.state.cnic}
          placeholder="CNIC"
          placeholderTextColor="#2491F6"
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.passwordInput}
          onChangeText={this.handlePasswordInputChange}
          value={this.state.password}
          placeholder="PASSWORD"
          placeholderTextColor="#2491F6"
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    height: 200,
    width: 300,
    marginBottom: 30
  },
  cnicInput: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    borderColor: '#2491F6',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#2491F6',
    fontWeight: 'normal',
    letterSpacing: 5
  },
  passwordInput: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    borderColor: '#2491F6',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#2491F6',
    fontWeight: 'normal'
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
  },
  button: {
    height: 50,
    width: 250,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#2491F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal'
  }
});
