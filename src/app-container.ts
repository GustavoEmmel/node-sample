import { Container, interfaces } from "inversify";
import { IApplicationRunner } from "./interfaces/app/application-runner.interface";
import { TYPES } from "./interfaces/types";
import { Application } from "./app";
import { IHelloController } from "./interfaces/controllers/hello-controller.interface";
import { HelloController } from "./controllers/hello-controller";

export class AppContainer extends Container {

  constructor() {
    super({ defaultScope: "Request" });
    this.registerServices();
    this.registerControllers();
  }

  getMainApp(): IApplicationRunner {
    return this.get<IApplicationRunner>(TYPES.IApplicationRunner);
  }

  registerControllers() {
    this.bind<IHelloController>(TYPES.IHelloController).to(HelloController);
  }

  registerServices() {
    this.bind<interfaces.Container>(TYPES.IContainer).toConstantValue(this);    
    this.bind<IApplicationRunner>(TYPES.IApplicationRunner).to(Application).inSingletonScope();
  }
}