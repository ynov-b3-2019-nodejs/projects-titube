var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const db = require('./database/connection');

exports.authenticate = function ()

{


  // If modifying these scopes, delete your previously saved credentials
  // at ~/.credentials/youtube-nodejs-quickstart.json
  var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content), getTopVideos);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  function storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) throw err;
      console.log('Token stored to ' + TOKEN_PATH);
    });
    console.log('Token stored to ' + TOKEN_PATH);
  }


  /**
   * Lists the names and IDs of up to 10 files.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
 /* function getChannel(auth) {
    var service = google.youtube('v3');
    service.channels.list({
      auth: auth,
      part: 'snippet,contentDetails,statistics',
      forUsername: 'GoogleDevelopers'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                    'it has %s views.',
                    channels[0].id,
                    channels[0].snippet.title,
                    channels[0].statistics.viewCount);
      }
    });
  }*/

  async function getCategories(auth) {
    var service = google.youtube('v3');
    service.videoCategories.list({
      auth: auth,
      part: 'snippet',
      regionCode: 'FR',
      forUsername: 'GoogleDevelopers'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log('Les catégories sont :')
        channels.forEach(element => {
          console.log("id :" + element.id);
          console.log("title :" + element.snippet.title);
          db.InsertCategorie( element.id ,  element.snippet.title );

        });

      }
    });
  }

  async function getTopVideos(auth) {
    var service = google.youtube('v3');
    service.videos.list({
      auth: auth,
      part: 'statistics,snippet',
      regionCode: 'FR',
      chart: 'mostPopular',
        maxResults: 10,
        videoCategoryId: '44'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log('Les vidéos sont :')
          //console.log(channels);
        channels.forEach(element => {
          //console.log("id :" + element.id);
          //console.log("like :" + element.statistics.likeCount);
          //console.log("viewCount :" + element.statistics.viewCount);
          //console.log("title :" + element.snippet.title);
            console.log(element.snippet);
          console.log("Description :" + element.snippet.description);
          //console.log("thunb url :" + element.snippet.thumbnails.high.url);
          //console.log("category id :" + element.snippet.categoryId);
          //console.log("channel title :" + element.snippet.channelTitle);


          //db.InsertVideos( "Trailers", element.snippet.description, element.snippet.channelTitle, element.id,   element.snippet.title,  element.statistics.viewCount, element.snippet.thumbnails.high.url );



          //console.log("id :" + element.);
        });
      }
    });
  }
}
