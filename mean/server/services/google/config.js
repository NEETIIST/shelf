 ROOTFOLDER = "0B-je9j5AlDQSN1hESldTdENHQ0E";
 google = require('googleapis');
 fs = require('fs');
 service = google.drive('v2');
 OAuth2 = google.auth.OAuth2;
 oauth2Client = new OAuth2("447918343020-v6nna41qs6lon9s58sfkruq1hid9j1h8.apps.googleusercontent.com", 
                "30Fm8I1-JPMhI2Yb8x3XSquT", 
                "http://shelf.n1z.pt/auth/google/callback");

oauth2Client.setCredentials({
  	access_token: 'ya29.WwK2FEJhJCr0EM66bi380AKbR3l_pyhxrqQZJPy4gSLLXzlKWAQyX9ST_bvSoxXke9wU',
  	refresh_token: '1/T1f6XX0gfcE4bZGBrZJ7YW3rimOUiEIfrWoMd0iADGM'
});