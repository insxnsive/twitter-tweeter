//Construct the Twitter API.
const { TwitterApi } = require('twitter-api-v2');
const schedule = require('node-schedule');
const config = require('./config');
const tweets = require('./tweets.json');

console.log("Bot Ready.");

//Client requirements for the Twitter API.
const client = new TwitterApi({
    appKey: config.consumer_key,
    appSecret: config.consumer_secret,
    accessToken: config.access_token,
    accessSecret: config.access_token_secret,
});

//Tweet function utilizing Math.random().
async function sendTweet() {
    const randomMessage = tweets[Math.floor(Math.random() * tweets.length)];

    try {
        const response = await client.v2.tweet(randomMessage);
        console.log('Tweet posted:', response.data.text);
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}

// 14:00 - To change the hour of the tweet, just change the number "14" to the hour you want to tweet.
// The 0 is the minutes.
// Example: schedule.scheduleJob('0 20 * * *', function() {
schedule.scheduleJob('0 14 * * *', function() {
    sendTweet();
});

// Second Tweet.
schedule.scheduleJob('0 17 * * *', function() {
    sendTweet();
});

//If you want to add a third tweet, delete the: /* and */
/*
schedule.scheduleJob('0 20 * * *', function() {
    sendTweet();
});
*/