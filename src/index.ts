import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import userRoutes from './routes/user.routes';
import notesRoutes from './routes/notes.routes';
import sharedNotesRoutes from './routes/sharedNotes.routes';

createConnection().then(async connection => {


    // create express app
    const app = express();
    app.use(bodyParser.json());

    //Routes
    app.use('/user', userRoutes);
    app.use('/notes', notesRoutes);
    app.use('/shared-notes', sharedNotesRoutes);

    // start express server
    await app.listen(4000);
    console.log('Server on port 4000');


}).catch(error => console.log(error));
