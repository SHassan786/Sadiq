const {RoomServiceClient, Room} = require('livekit-server-sdk');
const { AccessToken } = require('livekit-server-sdk');
const fs = require('fs');

//API_KEY and SECRET_KEY is for generating a project in which multiple rooms can be created
const API_KEY = "APId6W82QNnCuB6";
const SECRET_KEY = "vZd16cBuytV7Kaed4JgGES5yBM6h3JqOe8GGgs7c4Uo";
//your default cloud url
const URL = "wss://livestreamming.livekit.cloud";

//On react, we have to provide url of our session and the token associated with the room to start a stream

async function CreateAndJoinStream(req, res) {
  try {
    //get username and room name from client
    const { roomName, participantName } = req.params;
    console.log(req.params);

    //We can also authenticate username or client name
    //if username and room name is valid create a token
    const at = await new AccessToken(API_KEY, SECRET_KEY, {
      identity: participantName,
    });
    //provide access in the token
    at.addGrant({ roomJoin: true, room: roomName });

    const token = at.toJwt();
    console.log(token);

    // return token and url so client can be redirected to that particular stream
    res.status(200).send({
      success: true,
      message: "token send successfully",
      data: { token, URL },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: null,
      message: "invalid room name or username",
    });
  }
}

const livekitHost = "https://my.livekit.host";
const svc = new RoomServiceClient(livekitHost, "API_KEY", "SECRET_KEY");

async function listRooms(req, res) {
  try {
    svc.listRooms().then((rooms) => {
      console.log("existing rooms", rooms);
    });
  } catch (error) {}
}

async function deleteRoom(req, res) {
  try {
    console.log("hello");
    const { roomName } = req.query;
    console.log(req.query);
    const result = await svc.deleteRoom(roomName);

    res.status(200).send("room deleted successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  CreateAndJoinStream,
  listRooms,
  deleteRoom,
};
