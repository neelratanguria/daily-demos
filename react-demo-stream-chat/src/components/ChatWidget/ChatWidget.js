import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import CallObjectContext from '../../CallObjectContext';
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
} from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';

// Placeholder for Chat state
// const STATE_JOINING_CHAT = 'JOINING_CHAT'; 
// const STATE_JOINED_CHAT = 'JOINED_CHAT';
// const STATE_LEFT_CHAT = 'LEFT_CHAT'; 

export default function ChatWidget(props) {
    const callObject = useContext(CallObjectContext);
    const [channel, setChannel] = useState(null); 
    const [chatClient, setChatClient] = useState(null); 
    const displayChat = props.display; 

    /**
   * Once call state is 'joined-meeting', also join a Stream chat
   *
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    // Function to create a chat token with the user's data, so they can join chat
    // I could refactor this to send user data from the event itself 
    function startStreamChat(event) {
      // Get the username and session_id from callObject.participants
      const id = callObject.participants().local.session_id; 
      // 'Guest' if name not present; you could also generate
      const username = callObject.participants().local.user_name ? `${callObject.participants().local.user_name}` : 'Guest'; 
      if (event) {
        // console.log(event); 
        // console.log(callObject.participants()); 
        // console.log(callObject.participants().local);
        // console.log(event.participants.local.user_name); 
        const joinURL = 'https://opaque-incandescent-count.glitch.me/join-chat';

        try {
          // Send a POST with the username
          axios.post(joinURL, { id: id, username: username }).then((response) => {
            console.log(response);

            const chatToken = response.data.chatToken;
            const apiKey = response.data.streamKey;
            const user = response.data.user; 

            // Create a new chat using the APIkey
            const chatClient = new StreamChat(apiKey);
            setChatClient(chatClient); 

            // Set user, using token
            chatClient.setUser(
              {
                // The Stream API might be happier if I'm sending along referencing user directly
                id: user.id,
                name: user.username,
              },
              chatToken
            );

            // Join the specified channel, use setChannel
            const channel = chatClient.channel('messaging', 'team-chat');
            channel.watch();
            setChannel(channel);
          });
        } catch (error) {
          console.log(error);
        }
      }  
    }
    callObject.on('joined-meeting', startStreamChat);
  }, [callObject]);
  return chatClient && displayChat ? (
    <Chat client={chatClient} theme={'messaging light'}>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput /> 
      </Window>
      <Thread />
    </Channel>
  </Chat> 
  ) : null 
}

    



