<?php

require_once 'vendor/autoload.php';

$options = [
    'client_id' => 'ob176mf0o047xuv2ihgyz0diesz1wn'
];

$twitchApi = new \TwitchApi\TwitchApi($options);
$user = $twitchApi->getUser(26490481);

// By default API responses are returned as an array, but if you want the raw JSON instead:
$twitchApi->setReturnJson(true);
$user = $twitchApi->getUser(26490481);

// If you want to switch between API versions on the fly:
// $twitchApi->setApiVersion(3);
// $user = $twitchApi->getUser('summit1g');

var_dump($user);