Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('Home', {
    path: '/',
    template: 'home'
  });

  this.route('CharacterList', {
    waitOn: function() {
      return Meteor.subscribe('characters', this.params._id);
    },
    path: '/:_id',
    template: 'characterList',
    data: function() {
      return Characters.find({ userId: this.params._id });
    }
  });

  this.route('CharacterShow', {
    waitOn: function() {
      return Meteor.subscribe('character', this.params.realm, this.params.name);
    },
    path: '/:realm/:name',
    template: 'characterShow',
    data: function() {
      return Characters.findOne({
        realm: this.params.realm,
        name: this.params.name
      })
    }
  });
});
