Template.characterShow.helpers({
  avatarUrl: function() {
    return "https://us.battle.net/static-render/us/" + this.thumbnail;
  },
  bracket: function(bracket) {
    console.log(this.pvp);
    return this.pvp.brackets['ARENA_BRACKET_' + bracket].rating;
  }
});

Template.characterShow.rendered = function() {
  var self = this;
  Meteor.call('getPvPStats', this.data.realm, this.data.name, function(err, result) {
    _.each(result.pvp.brackets, function(val, key) {
      $('#' + key).append('<h3>' + val.rating + '</h3>')
    });
  });
}
