# Battlenet for Meteor
Based on a number of other OAuth libraries. Credit to these guys for the
guidance:

- [Meteor-linkedin](https://github.com/yefim/meteor-linkedin)
- [Meteor-accounts-instagram](https://github.com/yubozhao/meteor-accounts-instagram)
- [Meteor-accounts-stripe](https://github.com/khamoud/meteor-accounts-stripe)

NOTE: Currently not working.

### How to use in development

```
$ git clone https://github.com/AlexFrazer/battlenet-auth.git
$ cd [My-Meteor-Project]
$ mkdir packages
$ ln -s [/path/to/battlenet-auth] [/path/to/your/project/packages]
$ meteor add corvid:battlenet
```

This will react to `{{>loginButtons}}` in the `accounts-ui` package so you only need to put that in

### Resetting API keys
While your project is running, in terminal, do the following:

```
$ meteor mongo
MongoDB shell version: 2.4.12
connecting to: 127.0.0.1:3001/meteor
meteor:PRIMARY> db.meteor_accounts_loginServiceConfiguration.drop()
```
