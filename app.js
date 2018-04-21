  // This is the CLIENT-ID followed by OAUTH TOKEN for Twitch.TV Helix API
  // -------------------------------------------- //
  var API_KEY = "vffqx1g11p6hth17tppjuc1zr1vrwm";
  var OAUTH_TOKEN = "g5smvs4gs8a5msnc2v7px6zxmz3pgk";
  // ------------------------------------------- //
  var channelNames = ["freecodecamp", "dotatv247", "AdmiralBulldog", "ESL_DOTA2", "beyondthesummit" ];
  var url = "https://api.twitch.tv/helix/users?login="
  var url2 = "https://api.twitch.tv/helix/streams?user_id=";

  //Iterate through each channelName and run an ajax call for each one individually.
  
window.onload = function() {
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
        // Collect and store the info needed from this Ajax call then run the function with the required data.
        streamStatus(loginID, displayName, displayIMG);
      },
      error: function () {
        alert("Something went wrong with your search, please refresh the page and try again");
      }  
    });
  });

  // This function runs another ajax call to get the remaining required data. Then builds out the HTML with the required fields.
  // This CSS and HTML is a little poor quality however the focus on the project was to the API work so focused on that.
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
        
        // This checks if the stream is live or not and builds accordingly.
        if (dataR2.data.length === 0) {
          html = `<li class="offline"><img class="image" src="${displayIMG}"> <span class="name">${displayName}</span> - "Streamer Currently offline, check back later"</li>`;
          document.getElementById("insert").innerHTML += html;
        } else {
          streamMsg = dataR2.data[0].title;
          // Following 4 lines builds out the link address for the stream.
          var begin = dataR2.data[0].thumbnail_url.indexOf('live_user_') + 10;
          var end = dataR2.data[0].thumbnail_url.lastIndexOf('-\{width\}');
          var username = dataR2.data[0].thumbnail_url.slice(begin, end);
          urlLink = 'https://www.twitch.tv/' + username;
          html = `<li class="online"><a href="${urlLink}" target="_blank"><img class="image" src="${displayIMG}"></a> <span class="name">${displayName}</span> - "${streamMsg}" </li>`;
          document.getElementById("insert").innerHTML += html;
        }
      },
      error: function () {
        alert("Something went wrong with your search, please refresh the page and try again");
      }  
    });
  };
};