# ProjectEvents Frontend

ProjectEvents is a web application that allows users to discover, join, and create events. The frontend is built with React and Tailwind CSS.

## Project Description

ProjectEvents is designed to help users find and participate in events happening in their area. Users can create new events, join existing ones, and interact with other participants through a chat feature. The application provides a user-friendly interface for managing events and participants.

## Setup and Run Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/projectevents-frontend.git
   cd projectevents-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## API Endpoints

### User Authentication

- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user and return a JWT.

### Events

- `GET /main-events`: Retrieve a list of all events.
- `GET /main-events/:id`: Retrieve details of a specific event.
- `POST /main-events`: Create a new event.
- `PUT /main-events/:id`: Update an existing event.
- `DELETE /main-events/:id`: Delete an event.

### Participants

- `GET /participants?eventId=:eventId`: Retrieve a list of participants for a specific event.
- `PUT /participants/toggle?userId=:userId&eventId=:eventId`: Toggle participation for a user in an event.

### Chat

- `GET /messages/chats/:chatId/messages`: Retrieve chat messages for a specific chat.
- `POST /messages/chats/:chatId/messages`: Send a new chat message.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
