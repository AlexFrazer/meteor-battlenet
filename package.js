Package.describe({
  name: "afrazer:battlenet",
  summary: "OAuth authentication with battlenet",
  documentation: "README.md",
  version: "1.0.3",
  git: "https://github.com/AlexFrazer/battlenet-auth.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0.4');
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.use('underscore', ['client', 'server']);
  api.use(['random', 'templating@1.0.11'], 'client');

  api.addFiles(
    ['lib/battlenet_configure.html', 'lib/battlenet_configure.js'],
    'client');
  api.addFiles('lib/battlenet_common.js', ['client', 'server']);
  api.addFiles('lib/battlenet_server.js', 'server');
  api.addFiles('lib/battlenet_client.js', 'client');
});
