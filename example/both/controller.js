CharacterController = RouteController.extend({
  characterList: function() {
    this.render('characterList', {
      data: {
        characters: Meteor.users.findOne(Meteor.userId()).profile.characters
      }
    });
  },

  characterShow: function() {
    var user = Meteor.users.findOne(this.params.userId);
    var player = _.findWhere(user.profile.characters, {
      name: this.params.characterName,
      realm: this.params.realm
    });

    this.render('characterShow', {
      data: player
    });
  }
})
