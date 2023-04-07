import express, {Express} from "express";
import createNextServer from "next";

const DEV = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

const expressApp = express();
const nextApp = createNextServer({dev: DEV});

async function bootstrapNextApp(expressApp: Express) {
  const nextHandler = nextApp.getRequestHandler();
  await nextApp.prepare();

  expressApp.use((req, res, next) =>
    nextHandler(req, res).catch((err) => {
      next(err);
    })
  );
}

async function start() {
  try {
    await bootstrapNextApp(expressApp);

    expressApp.listen(PORT, () => {
      console.log(`Client server is running on port ${PORT} !!!`);
    });
  } catch (err) {}
}

start();
