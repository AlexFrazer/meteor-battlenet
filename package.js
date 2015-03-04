Package.describe({
  summary: "Login service for Battlenet accounts"
});

Package.on_use(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files(
    ['configure.html', 'configure.js'],
    'client');

  api.add_files('common.js', ['client', 'server']);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
});
