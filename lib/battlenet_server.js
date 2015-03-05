Battlenet = {};

OAuth.registerService('battlenet', 2, null, function(query) {
  var response    = getTokenResponse(query);
  var accessToken = response.accessToken;

  var serviceData = {
    accessToken: accessToken
  };

  serviceData.id = serviceData.uid;
  delete serviceData.uid;

  return {
    serviceData: serviceData,
    options: {}
  };
});

var getTokenResponse = function(query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'battlenet'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var responseContent;
  try {
    responseContent = Meteor.http.post(
      "https://us.battle.net/oauth/token" +
        '?grant_type=authorization_code' +
        '&code=' + query.code +
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/battlenet?close') +
        '&client_id=' + config.appId +
        '&client_secret=' + OAuth.openSecret(config.secret)
    ).content;
  } catch (err) {
    throw _.extend(new Error(err.message), {response: err.response});
  }
  var parsedResponse = JSON.parse(responseContent);
  var accessToken = parsedResponse.access_token;

  return {
    accessToken: accessToken
  };
};

var getIdentity = function(accessToken) {
  try {
    Meteor.http.get();
  } catch(error) {
  }
}

Battlenet.retrieveCredential = function(credentialToken) {
  return OAuth.retrieveCredential(credentialToken);
};
