import React, { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamCall,
  StreamVideo,
} from "@stream-io/video-react-sdk";

export const StreamClientContext = React.createContext(null);

export const StreamClientProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);

  useEffect(() => {
    const initStream = async () => {
      const apiKey = "your-stream-api-key"; // 🔁 Replace this
      const userId = "your-user-id";        // 🔁 Replace dynamically
      const userToken = "your-user-token";  // 🔁 Get from server via backend (secure)

      const client = new StreamVideoClient({ apiKey, user: { id: userId }, token: userToken });
      setVideoClient(client);
    };

    initStream();
  }, []);

  return (
    videoClient ? (
      <StreamVideo client={videoClient}>{children}</StreamVideo>
    ) : (
      <div>Loading Stream client...</div>
    )
  );
};
