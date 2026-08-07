# airbnb-clone
this is the simple clone of Airbnd  which i maked to test my backend skill specilly node and express skill 
# Airbnb Clone Project

This project is a full-stack web application built with Node.js and Express.js to mimic the core flow of an Airbnb-style listing platform. It was created as a practice project to improve backend development skills, especially around authentication, sessions, file uploads, database modeling, and MVC-style routing.

## Project Overview

The application allows users to:
- browse property listings
- create new listings
- edit and delete their own listings
- register and log in securely
- leave reviews on listings
- upload listing images using Cloudinary

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating engine
- Passport.js for authentication
- Connect-Flash for flash messages
- Multer + Cloudinary for image uploads
- Joi for validation

## Main Features

### 1. User Authentication
- User signup and login flow using Passport Local Strategy
- Session-based authentication
- Protected routes for creating/editing/deleting listings

### 2. Listing Management
- View all listings
- Create new listings with title, description, location, price, country, and image
- Edit existing listings
- Delete listings

### 3. Review System
- Users can add reviews to listings
- Reviews are linked to the listing and author
- Review deletion is supported

### 4. File Uploads
- Listing images are uploaded using Multer
- Images are stored in Cloudinary

### 5. Validation and Error Handling
- Joi validation for listing and review input
- Flash messages for success and error feedback
- Custom error handling structure

## Project Structure

```text
app.js                 # Main Express app entry point
controllers/           # Business logic for listings, users, reviews
models/                # Mongoose schemas and models
routes/                 # Route definitions
views/                 # EJS templates
public/                # Static assets (CSS/JS)
uploads/               # Uploaded files directory
utils/                 # Helper utilities
schema.js              # Joi validation schemas
cloudConfig.js         # Cloudinary configuration
middlweare.js          # Authentication and validation middleware
```

## Prerequisites

Make sure you have the following installed:
- Node.js
- MongoDB
- npm

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd AirBnb_clone
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the required environment variables:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the application
   ```bash
   node app.js
   ```

5. Open the application in your browser
   ```text
   http://localhost:8080
   ```

## How the App Works

The app follows a simple MVC-style structure:
- routes handle incoming requests
- controllers contain business logic
- models define MongoDB data structure
- views render the UI with EJS

The main flow is:
1. User visits the listings page
2. User signs up or logs in
3. User creates, edits, or deletes listings
4. User can review listings and interact with the platform

## Notes

- This project is primarily a learning and practice project.
- There is no automated test suite configured in the current setup.
- The server currently runs on port 8080.

## License

This project is licensed under the ISC license.
