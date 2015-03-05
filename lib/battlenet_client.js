Battlenet = {};

Battlenet.requestCredential = function(options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === "function") {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({ service: "battlenet" });
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

	var credentialToken = Random.secret();
	var redirectUrl = encodeURIComponent(Meteor.absoluteUrl('_oauth/battlenet?close'));

	var loginStyle = OAuth._loginStyle('battlenet', config, options);
	var state = OAuth._stateParam(loginStyle, credentialToken);

	// https://dev.battle.net/docs/read/oauth
  var loginUrl = 'https://us.battle.net/oauth/authorize?'+
			'response_type=code' + '&client_id='+ config.appId +
			'&redirect_uri=' + redirectUrl +
      '&scope=wow.profile&state=' + state;

	console.log(loginUrl);

  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};
