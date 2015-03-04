(function() {
  Accounts.battlenet.setSecret = function(secret) {
    Accounts.battlenet._secret = secret;
  };

  Accounts.oauth.registerService('battlenet', 2, function(query) {
    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);
    return {
      options: {
        services: {
          battlenet: {
            id: identity.id,
            accessToken: accessToken,
            email: identity.email
          }
        }
      }
    };
  })

  var getAccessToken = function(query) {
    var config = Accounts.configuration.findOne({ service: 'battlenet' });
    if(!config)
      throw new Accounts.ConfigError('Service not configured');

    var result = Meteor.http.post(
      'https://us.battle.net/oauth/token',
      { headers: { Accept: 'application/json' },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: config.secret,
          redirect_uri: Meteor.absoluteUrl("_oauth/battlenet?close"),
          state: query.state
        }
      }
    )
    if(result.error)
      throw result.error;
    if(result.data.error)
      throw result.data;
    return result.data.access_token;
  };

  var getIdentity = function(access_token) {
    var result = Meteor.http.get(
      "https://us.api.battle.net/wow/user/characters",
      { params: {access_token: access_token} }
    )
    if(result.error) throw result.error;
    return result.data;
  };
})();
