# Notes API

Welcome to the Notes API! This backend application allows you to manage a collection of notes through a simple set of RESTful API endpoints.

#### Overview
The Notes API provides an easy way to create, read, update, and delete notes.

## Installation

1. Run the command:
   ```bash
   git clone https://github.com/reet9065/takeNote_backend.git
   ```
   This will install all required Node.js dependencies.

2. Navigate to the backend directory.
   ```bash
   cd takeNote_backend
   ```

#### 3. Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BACKEND_PORT` <- specified the port number for the backend

`CLIENT_URL` <- cliend url of the fronted app

`CONECTIONSTRING` <- mongo DB connection String


#### Run locally
    ```bash
    node app.js
    ```

### API Endpoints

1. **Get All Notes**
   - **Endpoint**: `GET /api/note/`
   - **Description**: Retrieve a list of all notes.
   - **Response**: 
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       [
         {
           "_id": "note_id",
           "title": "Note Title",
           "note": "Note Content",
           "createdAt": "Timestamp",
           "updatedAt": "Timestamp"
         }
         // ... more notes
       ]
       ```

2. **Get Single Note**
   - **Endpoint**: `GET /api/note/:id`
   - **Description**: Retrieve a single note by its ID.
   - **Response**: 
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
         "_id": "note_id",
         "title": "Note Title",
         "note": "Note Content",
         "createdAt": "Timestamp",
         "updatedAt": "Timestamp"
       }
       ```

3. **Post New Note**
   - **Endpoint**: `POST /api/note/`
   - **Description**: Create a new note.
   - **Request Body**:
     ```json
     {
       "title": "New Note Title",
       "note": "New Note Content"
     }
     ```
   - **Response**:
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
         "message": "Note Saved Successfully!!",
         "color": "green"
       }
       ```

4. **Delete Note**
   - **Endpoint**: `DELETE /api/note/delete/:id`
   - **Description**: Delete a note by its ID.
   - **Response**: 
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
         "message": "Note Deleted Successfully!!",
         "color": "DarkPink"
       }
       ```

5. **Update Note**
   - **Endpoint**: `PATCH /api/note/update/:id`
   - **Description**: Update a note by its ID.
   - **Request Body** :
     ```json
     {
       "title": "Updated Note Title",
       "note": "Updated Note Content"
     }
     ```
   - **Response**:
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
         "message": "Note Updated Successfully!!",
         "color": "green"
       }
       ```

## Notes
- Ensure MongoDB is set up correctly, as it’s required for data storage.



