Package.describe({
  name: "corvid:battlenet",
  summary: "OAuth2 authentication handler for battlenet login",
  version: "1.0.0",
  git: "https://github.com/AlexFrazer/battlenet-auth.git"
});

Package.onUse(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.use('oauth2@1.1.2', ['client', 'server']);
  api.use('http@1.0.10', ['client', 'server']);
  api.use(['underscore@1.0.2', 'service-configuration@1.0.3'], ['client', 'server']);
  api.use(['random@1.0.2', 'templating@1.0.11'], 'client');

  api.export('Battlenet');

  api.addFiles(
    ['lib/battlenet_configure.html', 'lib/battlenet_configure.js'],
    'client');
  api.addFiles('lib/battlenet_common.js', ['client', 'server']);
  api.addFiles('lib/battlenet_server.js', 'server');
  api.addFiles('lib/battlenet_client.js', 'client');
});
