# Daily video chat React app with Stream Chat 
This demo is built ontop of Daily's original [React demo](https://github.com/daily-co/daily-demos/tree/main/react-demo) [0], with a new component and [Stream Chat](https://getstream.io/) integration added to enable text chat during calls. 

This demo uses: 
* The Daily CallObject API to build a fully custom experience [1]. 
* The `joined-meeting` and `participant-left` [events](https://docs.daily.co/reference#joined-meeting). 
* A Glitch-powered Node.js server [2]. 
* The [Stream API](https://getstream.io/). _If you'd like to follow along with this demo, you'll need a Stream account_. 

## How the demo works 
An added `ChatWidget.js` component listens for when a local participant joins a call, the `joined-meeting` event. 

When that participant joins a call, the app sends a `POST` request with the participant's unique `session_id` and `user_name` to a Glitch server. 

The Glitch server has a Stream Chat session going. It receives information from the app's POST request and uses it to add the meeting participant as a user in the Stream Chat session. The server sends the information it creates, a Stream user id and username, a chatToken for the specific chat session, and an API key back to the app. 

The app listens for every `participant-left` event, and when the last participant leaves it clears the chat history. 

A new function passed as a prop from `App.js` to `Tray.js` enables a participant to click the chat icon to display the chat session. We added the chat icon in `Icon.js`. 

## Running locally 
1. Make sure you've followed the [instructions at the root of the daily-demos repo](../README.md).
2. `cd react-demo-stream-chat` 
3. `npm run start` or `npm run dev` 
4. Then open your browser and go to `http://localhost:8080` 

## Contributing and feedback 
Let us know what you think of this demo. Feel free to [open an issue](https://github.com/daily-co/daily-demos/issues), or drop us a note any time at `help@daily.co`. 

## What's next 
There's so much more you can do with both Daily and Stream Chat. To build on chat, you could create anonymous chat, or experiment with adding an encryption library. You could also explore [Daily's docs](https://docs.daily.co/docs/reference-docs) to build out additional custom aspects of the video interface, like [advanced host permissions that boot a participant](https://www.daily.co/blog/add-advanced-security-features-to-video-chats-with-the-daily-api/). 

### Footnotes 
[0] Check out the Daily blog for a [walkthrough on building the original React app](https://www.daily.co/blog/building-a-custom-video-chat-app-with-react/). 

[1] The CallObject API gives developers direct access to the audio and video streams, so they can build apps however they'd like using those call primitives. 

[2] Our blog post walkthrough of this demo talks about how we connected that server to the Stream API. You can also reference our [first Glitch post](https://www.daily.co/blog/deploy-a-daily-co-backend-node-js-server-instantly/). 
