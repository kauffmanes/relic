import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { Site } from '../models';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Alert
} from 'react-native';

function HomeScreen({ navigation }) {

  const [sites, updateSites] = React.useState([]);
  const [errorMessage, updateErrorMessage] = React.useState(null);
  const [name, changeName] = React.useState('');
  const [description, changeDescription] = React.useState('');
  const [tenant, setTenant] = React.useState('');

  React.useEffect(() => {
    fetchUserInfo(setTenant);
    fetchSites();
    const subscription = DataStore.observe(Site).subscribe(() => fetchSites());
    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserInfo(setTenant) {
    // get the access token of the signed in user
    const {accessToken} = await Auth.currentSession();
    // get the tenant from the top of the cognito groups list
    const cognitogroups = accessToken.payload['cognito:groups'];
    const tenant = cognitogroups[0];
    setTenant(tenant);
  }

  async function fetchSites() {
    try {
      const sites = await DataStore.query(Site);
      updateSites(sites);
    } catch(err) {
      updateErrorMessage(err);
    }
  }

  // create sites here
  async function createSite() {
    // validation
    if (!name || !description || !tenant) {
      Alert.alert('Name and desc and tenant are required.');
      return;
    }

    try {
      await DataStore.save(new Site({ name, description, tenant }));
      changeName('');
      changeDescription('');
    } catch(err) {
      console.log(err);
      Alert.alert(err);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button title="User Details" onPress={() => navigation.navigate('SignUp')} />
            <Text style={styles.sectionDescription}>Your tenant is {tenant}</Text>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Sites</Text>
              <Text style={styles.sectionDescription}>
                {Array.isArray(sites) && sites.map(site => (
                  <Text key={site.id}>{site.name} | {site.tenant}</Text>
                ))}
              </Text>
              <TextInput
                value={name}
                placeholder="Site Name"
                onChangeText={(text) => changeName(text)}
                autoFocus
              />
              <TextInput
                value={description}
                placeholder="Site Description"
                onChangeText={(text) => changeDescription(text)}
              />
              <Button title='create new site' onPress={createSite} />
              <Text>{errorMessage}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    // backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    // color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
});

export default HomeScreen;
