#!/bin/sh
sed -i "s/DISCORD_TOKEN/$DISCORD_TOKEN/" auth.json
sed -i "s/TWITTER_API_KEY/$TWITTER_API_KEY/" auth.json
sed -i "s/TWITTER_API_SECRET/$TWITTER_API_SECRET/" auth.json
sed -i "s/TWITTER_ACCESS_TOKEN/$TWITTER_ACCESS_TOKEN/" auth.json
sed -i "s/TWITTER_ACCESS_SECRET/$TWITTER_ACCESS_SECRET/" auth.json

# Start
exec "$@"
