import 'reflect-metadata';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { inject, interfaces, injectable } from 'inversify';
import { IApplicationRunner } from "./interfaces/app/application-runner.interface";
import { TYPES } from './interfaces/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { AppContainer } from './app-container';

@injectable()
export class Application implements IApplicationRunner {
  
  constructor(
    @inject(TYPES.IContainer) private readonly container: interfaces.Container,
  ) {}

  start(): void {
    const server = new InversifyExpressServer(this.container, null);
    server.setConfig(app => {
      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cors());
      app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    });

    const port = 3000;
    const app = server.build();
    app.listen(port, () => {
      console.log(`MPN Sample API listening on port ${port}.`);
    });
  }
}

new AppContainer().getMainApp().start();