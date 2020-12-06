import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ValidationPipe } from "./common/middleware/validation.pipe";

async function run() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3000);
}
run();
