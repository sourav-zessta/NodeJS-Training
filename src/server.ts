import express from 'express';
import {router} from './routes/router'
import cors from 'cors';
import { logger } from './middlewares/logger';
import { authorization } from './middlewares/authorization';


const application = express()

var whitelist = ['http://localhost:10000', 'http://localhost:3000']

var corsOptions = {
    origin: function (origin: any, callback: any) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

application.use(express.json());

// Logger Middleware
application.use(logger);

// CORS  
application.use(cors(corsOptions));

// Authorization Middleware
application.use(authorization);

const port = process.env.PORT || 10000
application.use('/api/v1', router);
application.listen(port, () => {
    console.log(`Alright i am listening at ${port}`)
})


   