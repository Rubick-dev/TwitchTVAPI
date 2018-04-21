// This is the CLIENT-ID followed by OAUTH TOKEN for Twitch.TV Helix API
var API_KEY = "vffqx1g11p6hth17tppjuc1zr1vrwm";
var OAUTH_TOKEN = "g5smvs4gs8a5msnc2v7px6zxmz3pgk";
var channelNames = ["freecodecamp", "dotatv247", "AdmiralBulldog", "ESL_DOTA2", "beyondthesummit" ];
var url = "https://api.twitch.tv/helix/users?login="
var url2 = "https://api.twitch.tv/helix/streams?user_id=";

channelNames.forEach(userLogin => {
  
  $.ajax({  
    type:     'GET',  
    url:      url + userLogin,  
    dataType: 'json',
    headers:  {  
      'Client-ID': API_KEY,  
      'Authorization':  'Bearer ' + OAUTH_TOKEN  
    },  
    success: function(dataR) { 
      var loginID, displayName, ProfileIMG;
      var loginID = dataR.data[0].id;
      var displayName = dataR.data[0].display_name;
      var displayIMG = dataR.data[0].profile_image_url;
      
      streamStatus(loginID, displayName, displayIMG);
    },
    error: function () {
      alert("Something went wrong with your search, please refresh the page and try again");
    }  
  });
});

function streamStatus(loginID, displayName, displayIMG) {
  $.ajax({  
    type:     'GET',  
    url:      url2 + loginID,  
    dataType: 'json',
    headers:  {  
      'Client-ID': API_KEY,  
      'Authorization':  'Bearer ' + OAUTH_TOKEN  
    },  
    success: function(dataR2) {
      let html = ""; 
      var streamMsg = "";
      var urlLink = "";
            
      if (dataR2.data.length === 0) {
        html = `<li class="offline"><img class="image" src="${displayIMG}"> <span class="name">${displayName}</span> - "Streamer Currently offline, check back later"</li>`;
        document.getElementById("insert").innerHTML += html;
      } else {
        streamMsg = dataR2.data[0].title;
        var begin = dataR2.data[0].thumbnail_url.indexOf('live_user_') + 10; //10 is the length of 'live_user_'
        var end = dataR2.data[0].thumbnail_url.lastIndexOf('-\{width\}');
        var username = dataR2.data[0].thumbnail_url.slice(begin, end);
        urlLink = 'https://www.twitch.tv/' + username;
        html = `<li class="online"><a href="${urlLink}" target="_blank"><img class="image" src="${displayIMG}"></a> <span class="name">${displayName}</span> - "${streamMsg}" </li>`;
        console.log(html);
        document.getElementById("insert").innerHTML += html;
      }
    },
    error: function () {
      alert("Something went wrong with your search, please refresh the page and try again");
    }  
  });
};