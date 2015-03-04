(function () {
	Meteor.loginWithBattlenet = function (callback) {
		var config = Accounts.configuration.findOne({service: 'battlenet'});
		if (!config) {
			callback && callback(new Accounts.ConfigError("Service not configured"));
			return;
		}
		var state = Meteor.uuid();

		var required_scope = ['user'];
		var scope = [];
		if (Accounts.battlenet._options && Meteor.accounts.battlenet._options.scope)
			scope = Meteor.accounts.battlenet._options.scope;
		scope = _.union(scope, required_scope);
		var flat_scope = _.map(scope, encodeURIComponent).join('+');

		var loginUrl =
		      'https://us.battle.net/oauth/authorize' +
		      '?client_id=' + config.clientId +
		      '&scope=' + flat_scope +
		      '&redirect_uri=' + Meteor.absoluteUrl('_oauth/battlenet?close') +
		      '&state=' + state;

		Accounts.oauth.initiateLogin(state, loginUrl, callback);
	};
}) ();
