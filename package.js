Package.describe({
  summary: "Login service for battlenet accounts"
});

Package.onUse(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth2@1.1.2', ['client', 'server']);
  api.use('oauth@1.1.3', ['client', 'server']);
  api.use('http@1.0.10', ['client', 'server']);
  api.use(['underscore@1.0.2', 'service-configuration@1.0.3'], ['client', 'server']);
  api.use(['random@1.0.2', 'templating@1.0.11'], 'client');

  api.export('battlenet');

	api.add_files(
  ['lib/battlenet_configure.html', 'lib/battlenet_configure.js'],
  'client');

  api.add_files('lib/battlenet_account.js');
  api.add_files('lib/battlenet_client.js', 'client');
  api.add_files('lib/battlenet_server.js', 'server');
});
