import {
  ClerkExpressRequireAuth,
  type RequireAuthProp,
} from "@clerk/clerk-sdk-node";
import cors from "cors";
import "dotenv/config"; // To read CLERK_SECRET_KEY
import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";

const port = process.env.PORT || 3000;
const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(ClerkExpressRequireAuth());

// Use the strict middleware that raises an error when unauthenticated
app.get("/protected-route", (req: RequireAuthProp<Request>, res: Response) => {
  res.json(req.auth);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(401).json({ message: "Unauthenticated!" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
