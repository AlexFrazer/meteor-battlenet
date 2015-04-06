Meteor.publish('characters', function(userId) {
  return Characters.find({ userId: userId });
});

Meteor.publish('character', function(realm, characterName) {
  return Characters.find({
    realm: realm,
    name: characterName
  });
});
