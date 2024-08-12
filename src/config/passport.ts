import { Strategy as LocalStrategy } from "passport-local";
import Users from "../models/Users";
import passport from "passport";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    Users.authenticate()
  )
);

passport.serializeUser(Users.serializeUser() as any);

passport.deserializeUser(Users.deserializeUser());
