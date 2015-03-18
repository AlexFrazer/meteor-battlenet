# Battlenet for Meteor
Authenticate users with battle.net on your site.
Allows you to

## BIG IMPORTANT NOTE
In order for this package to work, you _must_ use `https://` and SSL.
You might see the following error message in your _server_ console if it fails.

```
W20150318-16:05:20.101(-4) (oauth_server.js:78) Unable to parse state from OAuth query:
W20150318-16:05:20.102(-4) (oauth_server.js:78) Unable to parse state from OAuth query:
W20150318-16:05:20.103(-4) (oauth_server.js:398) Error in OAuth Server: invalid_request
```

I enabled SSL locally using nginx and editting the `/etc/hosts`.

## Usage

#### Download and log in

First download the project.

```
meteor add corvid:battlenet
```

If you are using an `accounts-ui` package, this will appear with `{{>loginButtons}}` in a template.

```
<template name="bar">
  <div class="container">
    {{>loginButtons}}
  </div>
</template>
```

On the first use, you can use `Configure Battlenet` and follow the instructions to get set up.

Alternatively, you can manually add the service configuration. Add the following in server side code,
adding your client id and secret.

```
ServiceConfiguration.configurations.remove({
  service: "battlenet"
});

ServiceConfiguration.configurations.insert({
  service: "battlenet",
  clientId: "{ your client id }",
  scope:'wow.profile',
  secret: "{ your app's secret }"
});
```


#### Data on account retrieval
When a user is authenticated, their profile will be populated with their World of Warcraft character
list.

```
{
  _id: "akjdjsnaksdna",
  profile: {
    characters: [{
      achievementPoints: 7000,
      battlegroup: "Cyclone",
      class: 7,
      gender: 1,
      guild: "Ascension",
      guildRealm: "Draenor",
      level: 100,
      name: "Crowmo",
      race: 11,
      realm: "Draenor",
      spec: {
        backgroundImage: "bg-shaman-enhancement",
        description: "A totemic warrior who strikes foes with weapons imbued with elemental power.",
        icon: "spell_shaman_improvedstormstrike",
        name: "Enhancement",
        order: 1,
        role: "DPS"
      },
      thumbnail: "draenor/someurl.jpg"
    }]
  }
}
```

## Known issues
Currently, the scope is confined to `wow.profile` and the profile is the basic user info without extra fields.

## Feature feature plans
Please feel free to leave a request in the `issues` tab on this github page, or to submit a pull request.
I am planning to implement the following in the `Battlenet` export for easier use:

- Search through characters
- Add extra scope, allowing fetching of more player details

---

### Credit where credit is due.
Based on a number of other OAuth libraries. Credit to these guys for the guidance:

- [Meteor-linkedin](https://github.com/yefim/meteor-linkedin)
- [Meteor-accounts-instagram](https://github.com/yubozhao/meteor-accounts-instagram)
- [Meteor-accounts-stripe](https://github.com/khamoud/meteor-accounts-stripe)

Also, big thanks to Stack overflow python for help with oauth as well.
