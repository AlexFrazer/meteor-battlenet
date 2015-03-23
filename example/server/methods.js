Meteor.methods({
  getPvPStats: function(realm, characterName) {
    this.unblock();
    var api = ServiceConfiguration.configurations.findOne({service: 'battlenet'});
    var baseUri = "https://us.api.battle.net/wow/character/";
    return Meteor.http.get(
      baseUri + "/" +
      realm + "/" +
      characterName +
      "?fields=pvp&locale=en_US&apikey=" + api.clientId
    ).data;
  }
});
