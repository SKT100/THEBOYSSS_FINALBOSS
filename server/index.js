import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    }
});


io.listen(3000);

const characters =[];

const generateRandomPosition = () => {
    return [
        Math.random() * 10 - 5, // x position between -5 and 5
        0, // y position (ground level)
        Math.random() * 10 - 5, // z position between -5 and 5
    ];
}

io.on("connection", (socket) => {
    console.log("a new client connected");

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
    });



    socket.emit("hello");

    io.emit("characters", characters);
    socket.on("move", (data) => {
        const character = characters.find((character) => character.id === data.id);
        character.position = data.position;
        io.emit("characters", characters);
    });


    socket.on("disconnect", () => {
        console.log("a client disconnected");

        characters.splice(
            characters.findIndex((character) => character.id === socket.id),
            1 
        );
        io.emit("characters", characters);
    });
});
