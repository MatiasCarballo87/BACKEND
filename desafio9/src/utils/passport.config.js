import fetch from 'node-fetch';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import { usersMongoose } from '../dao/models/mongoose/users.mongoose.js';
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { cartsService } from '../services/carts.service.js';

const LocalStrategy = local.Strategy;

export function iniPassport() {

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const user = await usersMongoose.findOne({ email: username}).exec();
      if(!user) {
        console.log('User not found');
        return done(null, false);
      }
      if (!isValidPassword(password, user.password)) {
        console.log('Invalid Password');
        return done(null, false);
      }
      return done(null, user);
    } catch(e) {
      return done(e);
    }
  }));

  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email',}, 
  async ( req, username, password, done ) => {
    try {
      const { firstName, lastName, age, email } = req.body;
      const user = await usersMongoose.findOne({ email: username }).exec();
      if (user) {
        console.log('User already exists');
        return done(null, false);
      }
      const newUser = {
        firstName, lastName, age, email, password: createHash(password), cartId: '',
      }
      const userCreated = await usersMongoose.create( newUser );
      const cart = await cartsService.createCart();
      userCreated.cartId = cart;
      await userCreated.save();
      console.log(userCreated);
      return done(null, userCreated);
    } catch (e) {
      return done(e)
    }
  }));

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.4a2e43523a1efb14',
        clientSecret: '0b40fa4dca08896b3cc582418028a259c7579be0',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        console.log(profile);
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });

          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }

          profile.email = emailDetail.email;
 
          let user = await usersMongoose.findOne({ email: profile.email });

          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              isAdmin: false,
              password: 'nopass',
            };
            let userCreated = await usersMongoose.create(newUser);
            console.log('User Registration succesful');
            return done(null, userCreated);
          } else {
            console.log('User already exists');
            return done(null, user);
          }
        } catch (e) {
          console.log('Error en auth github');
          console.log(e);
          return done(e);
        }
      }
    )
  );
    
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersMongoose.findById(id).exec();
    done(null, user);
  });

}