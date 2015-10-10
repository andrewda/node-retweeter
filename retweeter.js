var Twitter = require('twitter');
var TwitterStream = require('node-tweet-stream');

var myHandle = "@Twitter";

var creds = {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
};

var twitter = new Twitter(creds);

var twitterStream = new TwitterStream({
    consumer_key: creds.consumer_key,
    consumer_secret: creds.consumer_secret,
    token: creds.access_token_key,
    token_secret: creds.access_token_secret
});

// track "@Handle"
twitterStream.track(myHandle);

twitterStream.on('tweet', function (tweet) {
    // make sure we're not retweeting our own tweets
    if (tweet.user.screen_name !== myHandle.replace('@', '')) {
        console.log('Retweeting: ' + tweet.text);
        
        twitter.post('statuses/retweet/' + tweet.id_str, function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
        });
    }
});
