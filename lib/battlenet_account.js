Accounts.oauth.registerService('battlenet');

if (Meteor.isClient) {
  Meteor.loginWithBattlenet = function(options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Battlenet.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.battlenet'],
    forOtherUsers: [
      'services.battlenet.id'
    ]
  });
}
