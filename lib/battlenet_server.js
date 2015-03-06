var OAuth = Package.oauth.OAuth;

var urlUtil = Npm.require('url');

OAuth.registerService('battlenet', 2, null, function(query) {

  var response = getTokenResponse(query);
  var accessToken = response.accessToken;
  var identity = getIdentity(accessToken);
  var profileUrl = identity.siteStandardProfileRequest.url;
  var urlParts = urlUtil.parse(profileUrl, true);

  var serviceData = {
    id: urlParts.query.id || Random.id(),
    accessToken: accessToken,
    expiresAt: (+new Date) + (1000 * response.expiresIn)
  };

  return {
    serviceData: serviceData,
    options: {
      profile: {}
    }
  };
});

// checks whether a string parses as JSON
var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'battlenet'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var responseContent;
  try {
    responseContent = Meteor.http.post(
      "https://us.battle.net/oauth/token?grant_type=authorization_code" +
      "?grant_type=authorization_code" +
      "&code=" + query.code +
      "&redirect_uri=" + encodeURIComponent(Meteor.absoluteUrl("_oauth/battlenet?close")) +
      "&client_id=" + config.clientId +
      "&client_secret=" + OAuth.openSecret(config.secret)
     ).content;
  } catch (err) {
    throw new Error("Failed to complete OAuth handshake" + err.message);
  }

  // If 'responseContent' does not parse as JSON, it is an error.
  if (!isJSON(responseContent)) {
    throw new Error("Failed to complete OAuth handshake" + responseContent);
  }

  // Success! Extract access token and expiration
  var parsedResponse = JSON.parse(responseContent);
  var accessToken = parsedResponse.access_token;
  var expiresIn = parsedResponse.expires_in;

  if (!accessToken) {
    throw new Error("Failed to complete OAuth handshake " + Battlenet._urls.service +
      "-- can't find access token in HTTP response. " + responseContent);
  }

  return {
    accessToken: accessToken,
    expiresIn: expiresIn
  };
};

var getIdentity = function (accessToken) {
  try {
    return Meteor.http.get("https://us.api.battle.net/wow/user/characters", {
      params: {oauth2_access_token: accessToken, format: 'json'}}).data;
  } catch (err) {
    throw new Error("Failed to fetch identity from Battlenet. " + err.message);
  }
};

Battlenet.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
