# Invite-Link-Social-Media-Platform

Frontend:
- React as UI Library
- React-Router for navigation
- Formik + yup for form and form validation
- Redux Toolkit for state management.
- Redux Persistent to store in local storage
- React dropzone for image upload

Backend:
- Nodejs as runtime environment
- Expressjs as backend framework
- Mongoose for managing our databse
- JWT for authentication 
- Multer for file uploading


Some Important Packages:

1. gridfs-stream
Use: Streams files into and out of MongoDB GridFS.

Why: MongoDB limits document size to 16MB, so GridFS stores large files (e.g. images, PDFs) in chunks.

Example: Used to read/write files from GridFS in a Node.js app.

2. multer
Use: Middleware for handling multipart/form-data, mainly used for file uploads.

Why: To parse form data that includes files (like images).

Example: Uploading profile pictures, documents, etc.

3. multer-gridfs-storage
Use: Storage engine for multer to upload files directly to MongoDB GridFS.

Why: Combines multer + gridfs-stream functionality to make it easier.

Example: Used in file-upload APIs where files are saved in MongoDB.

4. helmet
Use: Sets various HTTP headers to secure your Express app.

Why: Helps prevent common security issues like XSS, clickjacking, sniffing.

Example: Prevents exposing tech stack or allows CSP (Content Security Policy) setup.

5. morgan
Use: HTTP request logger middleware for Node.js.

Why: Logs requests (method, URL, status, response time) to the console.

Example: Useful for debugging and monitoring in development.


Controllers
-> Controllers are the logics of the endpoints