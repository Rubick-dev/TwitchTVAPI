var API_KEY = "vffqx1g11p6hth17tppjuc1zr1vrwm";
var OAUTH_TOKEN = "g5smvs4gs8a5msnc2v7px6zxmz3pgk";
var channelids = ["79776140", "109564866", "30816637", "36481935"]
var channels = [
                  {
                    "ChannelName": "freecodecamp",
                    "ChannelID": "79776140"
                  },
                  {
                    "ChannelName": "dotatv247",
                    "ChannelID": "109564866"
                  },
                  {
                  "ChannelName": "AdmiralBulldog",
                  "channelID": "30816637"
                  },
                  {
                    "ChannelName": "ESL_DOTA2",
                    "channelID": "36481935"
                  }
                ];

var url = "https://api.twitch.tv/helix/streams?user_id=";

channelids.forEach(user_id => {
  $.ajax({  
    type:     'GET',  
    url:      url + user_id,  
    dataType: 'json',  
    headers:  {  
      'Client-ID': API_KEY,  
      'Authorization':  'Bearer ' + OAUTH_TOKEN  
    },  
    success: function(dataR) { 
      console.log(dataR);
      if (dataR.data.length === 0) {
        // console.log("0");
        // streamStatus(0);
      } else {
        // console.log("Stream is live");
      }
    },
    error: function () {
      alert("Something went wrong with your search, please refresh the page and try again");
    }  
 
  });
});

console.log(channels[1]);
// function streamStatus(channelids)