Meteor.publish('userCharacters', function(id) {
  if(this.userId) {
    return Meteor.users.find({ _id: id }, {
      fields: { "profile.characters": true },
      sort: { "profile.characters.level": -1 }
    })
  }
})
