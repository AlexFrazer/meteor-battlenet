Battlenet.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'battlenet'});

  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = encodeURIComponent(Random.id());
  var loginStyle = OAuth._loginStyle('battlenet', config, options);
  var scope = 'wow.profile';

  var loginUrl = "https://us.battle.net/oauth/authorize" +
    '?response_type=code' +
		'&client_id=' + config.clientId +
    '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl("_oauth/battlenet?close")) +
    '&scope=' + scope +
		'&state=' + OAuth._stateParam(loginStyle, credentialToken);

  console.log(loginUrl);

  OAuth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};
