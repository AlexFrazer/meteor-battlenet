Battlenet.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'battlenet'});

  // if the service is not already configured, throw a new error.
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('battlenet', config, options);

  var scope = [];
  if (options && options.requestPermissions) {
    scope = options.requestPermissions.join('+');
  }

  var loginUrl = 'https://us.battle.net/oauth/authorize' +
    '?response_type=code' + '&client_id=' + config.clientId +
    '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl('_oauth/battlenet?close')) +
    '&scope=' + scope + '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.showPopup(
    loginUrl,
    _.bind(credentialRequestCompleteCallback, null, credentialToken)
  );
};
