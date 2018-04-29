var channels = [
    // HORNHAUT Streamers
    'neobaldhornrich',
    'banksider',
    'ndee171',
    'kokain_',

    // Non-HORNHAUT Streamers
    'seyyn',
    'bangpowwww',
    'caarla',
    '4thespada90',
    'dieleonieten',
    'grubsiud',
    'bierbankb',
    'g0dzilla84',
    '1cePrime'
];

$(function() {
    var $winHeight = $(window).height();
    var $winWidth = $(window).width();
    $('#container').height($winHeight).width($winWidth);
    $('#container > iframe').height($winHeight).width($winWidth);

    performStatusCheck();
    switchChannel();
});

function switchChannel() {
    // Fade out old stream
    $('#overlay').animate({
        opacity: 1,
    }, 500, function() {
        // Pick random stream
        var channel = 'hornhauttv';
        if(onlineStreams.length > 0) {
            channel = onlineStreams[Math.floor(Math.random() * onlineStreams.length)];
        }
        console.log('random channel is ' + channel);

        // Change stream in DOM
        outputChannel(channel);
        
        // Fade in again
        setTimeout(function() {
            $('#overlay').animate({
                opacity: 0,
            }, 500, function() {
                // And recursively recall channel change
                setTimeout(switchChannel, 30000); // 30 seconds
            });
        }, 1000);
    });
}

function outputChannel(channel) {
    var urlBase = 'https://player.twitch.tv/?volume=0&muted&channel=';
    var url = urlBase + channel;
    var $channelName = $('#channel-name').text(channel);
    // $channelName.
    var $iframe = $('#container > iframe');
    if($iframe.length) {
        $iframe.attr('src', url);   
        return false;
    }
    return true;
}

function performStatusCheck() {
    // Initialize online streams
    onlineStreams = [];
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/?channel=" + channels.join(','),
        dataType: 'json',
        headers: {
          'Client-ID': 'ob176mf0o047xuv2ihgyz0diesz1wn'
        },
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.streams.length - 1; i++) {
                console.log('channel ' + data.streams[i].channel.name + ' is online');
                onlineStreams.push(data.streams[i].channel.name);
            }
            
        }
    });
}