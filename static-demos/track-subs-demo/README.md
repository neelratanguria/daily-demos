
# Daily.co Track Subscriptions demo
This demo mirrors Daily.co's [basics-demo](https://github.com/daily-co/daily-demos/tree/main/static-demos/basics-demo), modified to demonstrate how track subscriptions work. 

This demo makes use of the following:

- `subscribeToTracksAutomatically` constructor property
- `setSubscribeToTracksAutomatically()` instance method
- `updateParticipant()` instance method
- `joined-meeting` and `participant-joined` events

## How the demo works 

Start by adding a meeting url and (owner) token in `createRoom()`. This allows people to join as an owner or a participant (guest). Owners will be displayed to everyone in the meeting. Guests will be displayed for 30 seconds when they join, so they can say "Hi!" to everyone. There are also `subscribe` and `unsubscribe` buttons to allow you to demonstrate how `setSubscribeToTracksAutomatically()` works. 

To learn more about how we built this, read our [blog post](). 

## Live Example 
Try a live demo [here]()

## Running locally 
1. Make sure you've followed the [instructions at the []root of the daily-demos repo](https://github.com/daily-co/daily-demos)
2. `cd static-demos` 
3. `npm run start` or `npm run dev`
4. Then open your browser and go to `localhost:<port>/static-demos/track-subs-demo/index.html`

## Contributing and feedback 
Let us know how experimenting with this demo goes! Feel free to [open an Issue](https://github.com/daily-co/daily-demos/issues), or reach us any time at `help@daily.co`. 

## What's next 
This demo is meant to simulate an all hands meeting with a small group of presenters (owners) and many viewers who can say hello when they join. Next it would be interesting to allow owners to yield to questions from viewers or split them into dynamic breakout groups.  