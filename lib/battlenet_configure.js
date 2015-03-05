Template.configureLoginServiceDialogForBattlenet.siteUrl = function () {
	return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForBattlenet.fields = function () {
  return [
    {property: 'appId', label: 'Client id '},
    {property: 'secret', label: 'Secret Key'}
  ];
};
