$(function() {
	var $winHeight = $(window).height();
	var $winWidth = $(window).width();
    $('#container').height($winHeight).width($winWidth);
    $('#container > iframe').height($winHeight).width($winWidth);

    setInterval(execSwitch(), 15000);
});

function execSwitch() {
	var channels = [
		// HORNHAUT Streamers
		'neobaldhornrich',
		'banksider',
		'ndee171',
		'kokain_',

		// Non-HORNHAUT Streamers
		'bangpowwww',
		'caarla',
		'4thespada90',
		'dieleonieten',
		'grubsiud'
	];

	var channel = channels[Math.floor(Math.random()*channels.length)];
	console.log(channel);
	switchChannel(channel);
}

function switchChannel(channel) {
	var urlBase = 'https://player.twitch.tv/?volume=0&!muted&channel=';
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