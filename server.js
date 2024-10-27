const express = require("express");
const compression = require("compression");
const next = require("next");
const session = require("express-session");
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const apiRoutes = require("./server/routes/apiRoutes.js");
const crons = require("./server/routes/crons.js");
const { connectionString } = require("./next.config");
const pgSession = require("connect-pg-simple")(session);
const fileUpload = require("express-fileupload");
const cluster = require("cluster");
const CPU_CORES = Number(process.env.CPU_COUNT);
const PORT = Number(process.env.SERVER_PORT);
const passport = require("passport");
// const { Users } = require("./models");
const {} = require("./server/functions.js");
const helmet = require("helmet");

app
  .prepare()
  .then(async () => {
    console.log(dev);
    console.log(`IS DEV MODE ACTIVATED: ${process.env.DEV_ENV}`);
    const server = express();
    server.use(compression());
    server.use(helmet({ contentSecurityPolicy: false }));
    server.use(express.urlencoded({ extended: true }));
    server.use(bodyParser.json({ limit: "250mb" }));
    server.use(bodyParser.urlencoded({ extended: true, limit: "250mb" }));
    server.use(fileUpload());
    server.use(
      session({
        cookie: {
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          secure: !dev,
        },
        proxy: !dev,
        secret: "super special project tasks secret key",
        resave: false,
        saveUninitialized: true,
        store: new pgSession({ conString: connectionString }),
      })
    );
    server.use(passport.initialize());
    server.use(passport.session());
    server.set("trust proxy", true);
    server.use("/crons", crons);
    server.use("/api", apiRoutes);

    server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      next();
    });

    server.get("/images/*", (req, res) => {
      return handle(req, res);
    });

    server.get("/css/*", (req, res) => {
      return handle(req, res);
    });

    server.get("/files/logos", (req, res) => {
      return handle(req, res);
    });

    server.get("/_next/*", (req, res) => {
      return handle(req, res);
    });

    server.get("/loaderio-1cd5efa2591d128aff5c57ed5cc41f19.txt", (req, res) => {
      return handle(req, res);
    });

    server.all("*", ensureAuthenticated, (req, res) => {
      return handle(req, res);
    });

    if (CPU_CORES > 1) {
      if (cluster.isMaster) {
        for (let i = 0; i < CPU_CORES; i++) {
          cluster.fork();
        }
        cluster.on("exit", (worker) => {
          console.log("Worker", worker.id, " has exitted.");
          cluster.fork(); // RE FORK IN CASE OF FAILURE
        });
      } else {
        server.listen(PORT, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(
            `Express server listening on port ${PORT} and worker ${process.pid} at at ${process.env.SERVER_IP}`
          );
        });
      }
    } else {
      server.listen(PORT, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(
          `Express server listening on port ${PORT} with the single worker ${process.pid} at ${process.env.SERVER_IP}`
        );
      });
    }
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
