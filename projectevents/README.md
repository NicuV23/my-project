# Project Events

## Project Description

Project Events is a Spring Boot application designed to manage events, participants, messages, and user authentication. It provides a RESTful API for creating, updating, and managing events and participants, as well as user registration and authentication using JWT tokens.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/projectevents.git
   cd projectevents
   ```

2. **Configure the database:**
   Update the `application.properties` file with your database configuration.

3. **Build the project:**

   ```bash
   mvn clean install
   ```

4. **Run the application:**

   ```bash
   mvn spring-boot:run
   ```

5. **Access the application:**
   The application will be available at `http://localhost:8080`.

## API Endpoints

### User Endpoints

- **GET /api/users/{id}**: Get user by ID.
- **GET /api/users**: Get all users.
- **PUT /api/users/{id}**: Update user by ID.
- **DELETE /api/users/{id}**: Delete user by ID.

### Participant Endpoints

- **POST /api/participants**: Add a participant.
- **PUT /api/participants/toggle**: Toggle participant status.
- **DELETE /api/participants**: Remove a participant.
- **GET /api/participants**: Get all participants.

### Message Endpoints

- **POST /api/messages/chats/{chatId}/messages**: Create a message in a chat.
- **POST /api/messages**: Create a message.
- **GET /api/messages/{id}**: Get message by ID.
- **GET /api/messages/chats/{chatId}/messages**: Get messages by chat ID.
- **GET /api/messages**: Get all messages.
- **DELETE /api/messages/{id}**: Delete message by ID.
- **DELETE /api/messages/chats/{chatId}/messages**: Delete messages by chat ID.
- **PUT /api/messages/{id}**: Update message by ID.

### Main Event Endpoints

- **POST /api/main-events**: Create a main event.
- **GET /api/main-events/user/{userId}**: Get events by user ID.
- **GET /api/main-events/{id}**: Get main event by ID.
- **GET /api/main-events**: Get all main events.
- **PUT /api/main-events/{id}**: Update main event by ID.
- **DELETE /api/main-events/{id}**: Delete main event by ID.

### Game Type Endpoints

- **POST /api/game-types**: Create a game type.
- **GET /api/game-types/{id}**: Get game type by ID.
- **PUT /api/game-types/{id}**: Update game type by ID.
- **DELETE /api/game-types/{id}**: Delete game type by ID.
- **GET /api/game-types**: Get all game types.

### Chat Endpoints

- **POST /api/chats**: Create a chat.
- **GET /api/chats/{id}**: Get chat by ID.
- **GET /api/chats**: Get all chats.
- **DELETE /api/chats/{id}**: Delete chat by ID.
- **PUT /api/chats/{id}**: Update chat by ID.

### Authentication Endpoints

- **POST /api/login**: User login.
- **POST /api/register**: User registration.
