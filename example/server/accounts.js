/**
 * For the purposes of quicker querying in the future,
 * whenever a user registers, their characters are added
 * to a collection for more easy maintenance
 */
Accounts.onCreateUser(function(options, user) {
  if(options.profile.characters) {
    _.each(options.profile.characters, function(character) {
      var doc = _.extend(character, {
        userId: user._id
      });

      Characters.insert(doc);
    });
  }
  return user;
});
