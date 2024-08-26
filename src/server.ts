import { config } from "./config/config";
import express, { Response, Request } from "express";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import usersRoutes from "./routes/users";
import session from "express-session";
import passport from "passport";
import postsRoutes from "./routes/posts";
import "./config/passport";
import cors from "cors";
const app = express();

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("Connected to DB");

    startServer();
  })

  .catch((error) => Logging.error("Connection to db failed, error: " + error));

function startServer() {
  app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
  app.use((req, res, next) => {
    Logging.info(
      `Incoming Request -> Method:[${req.method}] - Url: [${req.url}] - IP: [${req.ip}] `
    );
    res.on("finish", () =>
      Logging.info(
        `Incoming Request -> Method:[${req.method}] - Url: [${req.url}] - IP: [${req.ip}] - status: [${res.statusCode}] `
      )
    );
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/healthCheck", (req, res) => {
    res.status(200).json({ message: "Server working properly" });
  });

  app.use(`/users`, usersRoutes);
  app.use("/posts", postsRoutes);

  app.use((req, res, next) => {
    const error = new Error("endpoint not found");
    Logging.error(error.message);
    res.status(404).json({ message: error.message });
  });

  app.listen(config.server.port, () =>
    Logging.info(`Server running on http:localhost:${config.server.port}`)
  );
}
