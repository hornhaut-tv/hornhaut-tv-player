$(function() {
    var $winHeight = $(window).height();
    var $winWidth = $(window).width();
    $('#container').height($winHeight).width($winWidth);
    $('#container > iframe').height($winHeight).width($winWidth);

    switchChannel();
});

function switchChannel() {
    // Fade out old stream
    $('#overlay').animate({
        opacity: 1,
    }, 500, function() {
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
            'grubsiud'
        ];

        // Pick random stream
        var channel = channels[Math.floor(Math.random()*channels.length)];

        // Change stream in DOM
        outputChannel(channel);
        
        // $('#overlay').trigger('removeOverlay');

        // Fade in again
        setTimeout(function() {
            $('#overlay').animate({
                opacity: 0,
            }, 500, function() {
                // And recursively recall channel change
                setTimeout(switchChannel, 30000);
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