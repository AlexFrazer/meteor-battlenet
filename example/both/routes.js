Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound"
});

Router.map(function() {

  this.route('characterList', {
    waitOn: function() {
      return Meteor.subscribe('userCharacters', Meteor.userId());
    },
    path: '/',
    controller: 'CharacterController',
    action: 'characterList'
  });

  this.route('characterShow', {
    waitOn: function() {
      return Meteor.subscribe('userCharacters', this.params.userId);
    },
    path: '/:userId/:realm/:characterName',
    controller: 'CharacterController',
    action: 'characterShow'
  })
});
