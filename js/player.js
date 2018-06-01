var twitchClientId = 'ob176mf0o047xuv2ihgyz0diesz1wn';

var channels = [
    // HORNHAUT Streamers
    'hornhauttv',
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
    'cmhbolle'
];

var onlineStreams = [];

$(function() {
    var $winHeight = $(window).height();
    var $winWidth = $(window).width();
    $('#container').height($winHeight).width($winWidth);
    $('#container > iframe').height($winHeight).width($winWidth);

    performStatusCheck();
});

function switchChannel(channel) {
    // Fade out old stream
    $('#overlay').css('z-index', '999').animate({
        opacity: 1
    }, 200, function() {
        $('#overlay').append('<img id="scene-switch" src="img/scene-switch.gif" />');
        
        // Change stream in DOM
        outputChannel(channel);
    
        // Fade in again
        setTimeout(function() {
            $('#overlay').animate({
                opacity: 0
            }, 1000, function() {
                $('#overlay').css('z-index', '-999');
                $('#scene-switch').remove();
            });
        }, 3500);
    });
}

function outputChannel(channel, broadcast = false) {
    var channelBase = 'https://player.twitch.tv/?volume=0.05&muted&channel=';
    var url = channelBase + channel;
    var $channelName = $('#channel-name').text(channel);
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
    var result = [];
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/?channel=" + channels.join(','),
        dataType: 'json',
        headers: {
          'Client-ID': 'ob176mf0o047xuv2ihgyz0diesz1wn'
        },
        success: function(data) {
            for (var i = 0; i <= data.streams.length - 1; i++) {
                console.log('channel ' + data.streams[i].channel.name + ' is online');
                onlineStreams.push(data.streams[i].channel.name);
            }
            console.log(onlineStreams);
            var channel = pickRandomStream(onlineStreams);
            switchChannel(channel);

            // And recursively recall channel change
            setTimeout(performStatusCheck, 20000); // 20 seconds
        }
    });
}

function pickRandomStream(onlineStreams) {
    var channel = 'hornhauttv';

    if(onlineStreams.length > 0) {
        channel = onlineStreams[Math.floor(Math.random() * onlineStreams.length)];
    }
    console.log('channel is ' + channel);
    return channel;
}