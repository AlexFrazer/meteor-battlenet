# Battlenet for Meteor
Authenticate Battle.net users on your site.

## Usage

### Configuration

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


### Using authentication
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

---

### Known issues

#### SSL
In order for this package to work, you **must** use `https://` and SSL.
You might see the following error message in your _server_ console if it fails.

```
W20150318-16:05:20.101(-4) (oauth_server.js:78) Unable to parse state from OAuth query:
W20150318-16:05:20.102(-4) (oauth_server.js:78) Unable to parse state from OAuth query:
W20150318-16:05:20.103(-4) (oauth_server.js:398) Error in OAuth Server: invalid_request
```

**Possible Solution on Mac OS X**

Add a line to `/etc/hosts` to alias an `https://` site.
```
127.0.0.1 https://yoursite.com/
```

Set up and install `nginx`

```
$ brew install nginx
$ mkdir -p /usr/local/etc/nginx/sites-enabled
$ vim /usr/local/etc/nginx/sites-enabled/yoursite.com
```
Here is a sample configuration
```
# Upstreams
upstream subdomain {
  server 127.0.0.1:3000;
}

# HTTP Server
server {
  listen 80;
  server_name yoursite.com;
  rewrite ^ https://$server_name$request_uri permanent;
  try_files $uri/index.html $uri.html $uri @yoursite;
}

# HTTPS Server
server {
  listen 443 ssl;
  server_name yoursite.com;

  root /usr/share/nginx/html;
  error_log /usr/local/etc/nginx/sites-available/error.log crit;

  ssl_session_timeout 5m;
  ssl_certificate /usr/local/etc/nginx/ssl/afrazer.com.crt;
  ssl_certificate_key /usr/local/etc/nginx/ssl/afrazer.com.key;
  ssl_prefer_server_ciphers on;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

  location / {
    proxy_pass http://subdomain/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forward-Proto http;
    proxy_set_header X-Nginx-Proxy true;
    proxy_redirect off;
  }
}
```
Then, you must set the `ROOT_URL` of your application to be the `https://` site and restart nginx

```
$ sudo nginx -s stop && sudo nginx
$ export ROOT_URL="https://yoursite.com"
```

## Future feature plans
Please feel free to leave a request in the `issues` tab on this github page, or to submit a pull request.
I am planning to implement the following in the `Battlenet` export for easier use:

- Search through characters
- Add extra scope, allowing fetching of more player details
- Add features for guild support

---

### Credit where credit is due.
Based on a number of other OAuth libraries. Credit to these guys for the guidance:

- [Meteor-linkedin](https://github.com/yefim/meteor-linkedin)
- [Meteor-accounts-instagram](https://github.com/yubozhao/meteor-accounts-instagram)
- [Meteor-accounts-stripe](https://github.com/khamoud/meteor-accounts-stripe)

Also, big thanks to Stack overflow python for help with oauth as well.
