/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
  const tenant = event.request.userAttributes['custom:tenant'];

  const groupParams = {
    GroupName: tenant,
    UserPoolId: event.userPoolId
  };

  const addUserParams = {
    GroupName: tenant,
    UserPoolId: event.userPoolId,
    Username: event.userName
  };

  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }

  // add user to their tenant group
  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }

  const addAdminParams = {
    GroupName: 'admin',
    UserPoolId: event.userPoolId,
    Username: event.userName
  };
  
  // add new users that create account via signup page to the admin group
  // a new tenant's user is always an admin
  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup(addAdminParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }

};
