Meteor.methods({
  pvp: function(realm, characterName) {
    var clientId = ServiceConfiguration.configurations.findOne({ service: "battlenet" }).clientId;
    var requestUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?fields=pvp&locale=en_US&apikey=" + clientId;
    return Meteor.http.get(requestUrl).data.pvp;
  },
  talents: function(realm, characterName) {
    var clientId = ServiceConfiguration.configurations.findOne({ service: "battlenet" }).clientId;
    var requestUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?fields=talents&locale=en_US&apikey=" + clientId;
    var talents = Meteor.http.get(requestUrl).data.talents;
    return _.findWhere(talents, { selected: true });
  }
});
