$(function() {
    var $winHeight = $(window).height();
    var $winWidth = $(window).width();
    $('#container').height($winHeight).width($winWidth);
    $('#container > iframe').height($winHeight).width($winWidth);

    switchChannel();
});

function switchChannel() {
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

    var channel = channels[Math.floor(Math.random()*channels.length)];
    console.log(channel);
    outputChannel(channel);
    setTimeout(switchChannel, 30000);
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