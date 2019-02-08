import { interfaces } from "inversify-express-utils";
import express = require("express");
export interface IHelloController extends interfaces.Controller {
  sayHello(req: express.Request, res: express.Response): void;
}