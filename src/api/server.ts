import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//routes
import { UserRoutes } from './components/User/Routes';

// swagger doc
import swaggerUi from 'swagger-ui-express';
import swaggerDocument = require('../api/swagger.json');

class App {
  public app: express.Application = express();
  public userRouter: UserRoutes = new UserRoutes();

  constructor() {
    this.config();

    // routing with user router
    this.userRouter.routes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse content into JSON
    this.app.use(express.json());

    // serving static files
    this.app.use(express.static('public'));

    // HTTP request logger middleware
    this.app.use(morgan('dev'));

    // set port
    this.app.set('port', process.env.PORT || 3030);
    console.log(`Worker ${process.pid} started ${process.env.WORKER_NUM}`);

    // swagger documentation
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;
