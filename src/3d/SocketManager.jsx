// socketManager.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

export const socket = io("http://localhost:3000");
export const charactersAtom = atom([]);
export const socketIdAtom = atom(""); // New atom to store the socket ID

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom);
    const [_socketId, setSocketId] = useAtom(socketIdAtom); // Use the new atom

    useEffect( () => {
        function onConnect() {
            console.log("connected");
            setSocketId(socket.id); // Store the socket ID on connect
        }
        function onDisconnect() {
            console.log("disconnected");
            setSocketId(""); // Clear the socket ID on disconnect
        }

        function onHello() {
            console.log("hello");
        }

        function onCharacters(value){
            setCharacters(value);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("hello", onHello);
        socket.on("characters", onCharacters);


        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("hello", onHello);
            socket.off("characters", onCharacters);
        };
    }, [setSocketId, setCharacters]); // Add setSocketId and setCharacters to dependency array
};