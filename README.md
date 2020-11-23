# Sync Wave
WORK IN PROGRESS: Sync wave is a synchronization server that can be utilized to watch YouTube videos with friends. This project uses a server-based system that a user connects to, which allows users to add videos to a queue and take control of the playback remotely.

### Frontend
The frontend is created using React JS with the styling of the frontend made possible with the Material-UI design system. The frontend is built to be distributed statically through the backend.

### Backend
The backend runs on a Node JS Express server. The backend makes the real-time syncing of videos possible with WebSockets and is used to distribute the frontend to the user.

## Setup
To run this application locally, follow the below steps.
1. Clone this Repo
2. Run `npm install`
3. (Optional) Create environment variables based on sample
4. Run Server with `npm run server-dev`
5. Run Frontend with `npm start`
6. Go to localhost on browser. Default port is 3000