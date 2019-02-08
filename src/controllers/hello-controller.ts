import * as HTTP_STATUS_CODES from 'http-status-codes';
import * as express from "express";
import { controller, request, response, httpGet } from 'inversify-express-utils';
import { IHelloController } from "../interfaces/controllers/hello-controller.interface";

@controller("/")
export class HelloController implements IHelloController {

  @httpGet("/")
  sayHello(@request() req: express.Request, @response() res: express.Response) {
    console.log(new Date());
    const myPromises = [
      new Promise((resolve) => setTimeout(() => {
        resolve("A (slow)");
      }, 1000)),

      new Promise((resolve) => setTimeout(() => {
        resolve("B (slower)");
      }, 2000)),

      new Promise((resolve) => setTimeout(() => {
        resolve("C (fast)");
      }, 10))
    ];

    return Promise.all(myPromises)
      .then(results => {
        console.log(new Date());
        console.log("todas resolvidas");
        const response = results.map(item => {
          console.log(item);
          return item;
        });
        console.log(response);

        res.status(HTTP_STATUS_CODES.OK);
        res.send(response);
      });
  }
}