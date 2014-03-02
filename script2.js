      /*
       * Polling the player for information
       */
       
      // Update a particular HTML element with a new value
      function updateHTML(elmId, value) {
        document.getElementById(elmId).innerHTML = value;
      }
      
      // This function is called when an error is thrown by the player
      function onPlayerError(errorCode) {
        alert("An error occured of type:" + errorCode);
      }

      // The video to load
      var videoID = "bs0LelWjww8" // default ID: 
      function newTrack()
      {
        videoID = document.getElementById('videoID').value;

        ytplayer.loadVideoById(videoID);
        ytplayer2.loadVideoById(videoID);
      }

      /////////////////////////
      window.addEventListener("keydown", checkKeyPressed, false);

      var start = 0;
      var end = 0;

      var which = 0;
 
      function checkKeyPressed(e) {
          if (e.keyCode == "65") {
              if (event.shiftKey)
              {
                  //set timeA equal to current video time
                  start = ytplayer.getCurrentTime();
                  updateHTML("start", start);
              }
              else
              {
                  //play clip at specified time
                  if (ytplayer.getPlayerState() == -1 && ytplayer2.getPlayerState() == -1)
                  {
                    //alert("nope");
                    ytplayer.playVideo();
                    ytplayer2.playVideo();
                  }
                  if (which == 0)
                  { 
                      ytplayer.playVideo();
                      ytplayer2.pauseVideo();
                      ytplayer2.seekTo(start, true);
                      
                      which = 1;
                  }
                  else
                  {
                      ytplayer2.playVideo();
                      ytplayer.pauseVideo();
                      ytplayer.seekTo(start, true);
                      
                      which = 0;
                  }
              }
          }
      }
      ////////////////////////////
      
      // This function is automatically called by the player once it loads
      function onYouTubePlayerReady(playerId) {
        // The player ID comes from the "playerapiid" parameter that was set
        // when the embedded player was loaded
        if(playerId == "player1") {
          ytplayer = document.getElementById("ytPlayer");

          ytplayer.addEventListener("onError", "onPlayerError");
        }
        else if(playerId == "player2") {
          ytplayer2 = document.getElementById("ytPlayer2");

          ytplayer2.addEventListener("onError", "onPlayerError");
        }
      }
      
      // The "main method" of this sample. Called when someone clicks "Run".
      function loadPlayer() {

        // Lets Flash from another domain call JavaScript
        var params = { allowScriptAccess: "always" };
        // The element id of the Flash embed
        var atts = { id: "ytPlayer" };
        // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
        swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                           "?version=3&enablejsapi=1&playerapiid=player1", 
                           "videoDiv", "480", "295", "9", null, null, params, atts);
                           
        // Now do it all again with a different player
        var params = { allowScriptAccess: "always" };
        var atts = { id: "ytPlayer2" };
        swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                          "?version=3&enablejsapi=1&playerapiid=player2", 
                          "videoDiv2", "425", "344", "9", null, null, params, atts);
      }
      function _run() {
        loadPlayer();
      }
      google.setOnLoadCallback(_run);
