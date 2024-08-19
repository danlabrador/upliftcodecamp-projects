import { authRouter } from "./routes/auth.routes";
import { connectToDatabase } from "./db";
import { courseOfferingsRouter } from "./routes/courseOfferings.routes";
import { enrollmentsRouter } from "./routes/enrollments.routes";
import { env } from "./env";
import { errorHandler, pageNotFound } from "./middlewares/errors.middleware";
import { usersRouter } from "./routes/users.routes";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

connectToDatabase().catch((err) =>
  console.error("Database connection error:", err)
);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const version = "1.0";
const baseUrl = `/api/${version}`;

app.use(`${baseUrl}/enrollments`, enrollmentsRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/courseofferings`, courseOfferingsRouter);
app.use(`${baseUrl}/auth`, authRouter);

app.use(errorHandler);
app.use(pageNotFound);

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
