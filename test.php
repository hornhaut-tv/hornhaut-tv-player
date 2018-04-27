<html>
<head>
<title>Your Title Goes Here</title>
</head>
<body>
<?php
/* Mucked together by Matt_Thomas @ Twitch.tv
   Was created in response to: https://discuss.dev.twitch.tv/t/is-there-a-way-to-embed-twitch-on-your-site-so-that-only-the-most-viewed-streamer-plays/3309
   This will take the $channels array list of users, find the streamer in your list ($channels) with the most viewers, then
   display it's stream.  If none of the streamers are live, it will find the current twitch streamer with the most viewers instead.
   This can be modified easily to include any list of streamers.  You can also change the fall back to be a specific game. Enjoy!
   Shoutouts to Kevo and https://discuss.dev.twitch.tv/t/is-streamer-online-json-help-users-zigenzag-follows/946 - Where I started from.
   matt AT mrthomas DOT org */

/* Old unsupported API for team members: http://api.twitch.tv/api/team/teamkitty/all_channels.json - Might use this until kraken has team member listing, or until it changes */

$channels = array("aimzatchu", "kittyplaysgames", "schyax", "cutenaomi", "cincinbear", "brialeigh", "juliehaze", "pallyberry"); /* For now, we use a manually set list of streamers */
$callAPI = implode(",",$channels); /* Clean our list for next step */
$dataArray = json_decode(file_get_contents('https://api.twitch.tv/kraken/streams?channel=' . $callAPI), true); /* Pull the data from api.twitch.tv/kraken for each streamer in our list */

/* The query could just add '&limit=1' since the API will return the streamers in order of highest viewers to lowest. This speeds things up.*/
// $dataArray = json_decode(@file_get_contents('https://api.twitch.tv/kraken/streams?channel=' . $callAPI . '&limit=1'), true); 

$max_viewers=0; /* Set a value to start stepping from */
$name='*** ERROR ***'; /* Set a value to name incase something goes wrong */

if ($dataArray['streams'] != null) { /* Make sure we get a response from the API */
    foreach($dataArray['streams'] as $mydata){ /* Build an array with online streamers from our list */
        if($mydata['_id'] != null){  /* Make sure the streamer has data in the API */
            $viewers = $mydata['viewers'];  /* Store value of viewers from API as $viewers */
            if ( $viewers > $max_viewers ) {  /* Should always be more than 0 at this point */
                $max_viewers = $viewers;   /* Set new nonzero value to be $max_viewers and loop 'foreach' until we have the highest viewer count */
                $name = $mydata['channel']['display_name'];  /* Store the display_name from API for user with highest viewer count */
            }
        }
    }
}
else {
    /* None of the $channels I wanted are avaiable now, so fetch the most popular one */
    $backupArray = json_decode(@file_get_contents('https://api.twitch.tv/kraken/streams?limit=1' . $callAPI), true); 
    if ( $backupArray != null ) {
        foreach($backupArray['streams'] as $mydata){
            if($mydata['_id'] != null) {
                $name = $mydata['channel']['display_name'];
                $viewers = $mydata['viewers'];
            }
            else {
                echo "Error in results from api.twitch.tv, cannot fetch a channel.";  /* API responded but not with expected data */
            }
        }
    }
    else {
        echo "Error in results from api.twitch.tv, probably cannot connect to server."; /* API probably did not respond at all */
    }
}
?>
<center>
<h1> Streamer: <?php echo "$name" ?> </h1>
<object type="application/x-shockwave-flash" height="710" width="1200" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=<?php echo "$name" ?>"
bgcolor="#000000">
<iframe
	src="https://player.twitch.tv/?channel=ndee171"
	frameborder="0"
	allowfullscreen="true"
	scrolling="no"
	height="378"
	width="620"
	muted="true">
</iframe>
<param name="allowFullScreen" value="true"/>
<param name="allowScriptAccess" value="always"/>
<param name="allowNetworking" value="all"/>
<param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf"/>
<param name="flashvars" value="hostname=www.twitch.tv&channel=<?php echo $name ?>&auto_play=true&start_volume=25"/></object>
</center>
</body>
</html>