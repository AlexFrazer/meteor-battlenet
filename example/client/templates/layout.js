AccountsTemplates.configure({
  hideSignUpLink: true
});

AccountsTemplates.configureRoute('signIn', {
  redirect: function() {
    var user = Meteor.user();
    if(user) {
      Router.go('CharacterList', { _id: user._id });
    }
  }
});

Template.registerHelper('avatarUrl', function(character) {
  return "https://us.battle.net/static-render/us/" + character.thumbnail;
});
