import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import crypto from "crypto";

export default passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const { email, picture } = profile._json;

        let user = await User.findOne({ email: email });

        if (user) {
          // Merging Google account with an already existing account
          return cb(null, user);
        } else {
          const name = profile.displayName.replace(/twitter/gi, str => str[0]);
          const eneratedPassword = crypto.randomBytes(10).toString("hex");

          const newUser = {
            name,
            email,
            password: eneratedPassword,
            avatar: picture,
            accountType: "google",
          };

          user = await User.create(newUser);
        }
        cb(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
