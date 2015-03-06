if (typeof Battlenet === 'undefined') {
  Battlenet = {};
  /**
  Battlenet._urls = {
    service: "Battlenet",
    token: "https://us.battle.net/oauth/token?grant_type=authorization_code",
    authorize: "https://us.battle.net/oauth/authorize",
    redirect: encodeURIComponent(Meteor.absoluteUrl("_oauth/battlenet?close"))
  }*/
}

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
    ]
  });
}
