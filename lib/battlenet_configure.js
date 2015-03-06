Template.configureLoginServiceDialogForBattlenet.base_url = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForBattlenet.fields = function () {
  return [
    {property: 'clientId', label: 'API Key'},
    {property: 'secret', label: 'Secret Key'}
  ];
};
