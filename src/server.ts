//imports
<<<<<<< HEAD
import express from "express";
import cors from "cors";
import { router } from "./routes/router";
=======
import express from 'express'
import cors from 'cors'
import { router } from './routes/router';
>>>>>>> 0e38b9fe14f07aa9673992376fa8a887c6938828

//app
const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(router);

//teste
app.listen(3777, () => {
  console.log("Server running on port 3777");
});
=======
app.use(router)


//teste
app.listen(3777, () => {
    console.log('Server running on port 3777')
});
>>>>>>> 0e38b9fe14f07aa9673992376fa8a887c6938828
