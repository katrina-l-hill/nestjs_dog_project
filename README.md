# Dog Manager App

A mobile app built with React Native (Expo) and NestJS, allowing users to create, view, and delete dog profiles. This project demonstrates a full-stack application with frontend-backend integration using TanStack Query for stateful API handling.

## Features

### Frontend
- Add new dogs via form (POST)

- View list of all dogs (GET)

- Delete individual dogs (DELETE)

### Backend
- RESTful endpoints for:

  - GET /dogs

  - POST /dogs

  - DELETE /dogs/:id

- Uses NestJS Controller and Service layers

- Handles validation and error responses

## Installation
 - Clone the repo:
   - git clone `https://github.com/katrina-l-hill/nestjs_dog_project`
   - Start frontend
     - cd dog-app
     - npm install
     - npm install @tanstack/react-query
     - npx expo start
   - Start backend
     - cd dog-api
     - npm run start:dev