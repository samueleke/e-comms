import { APIError } from '@e-comms/shared/errors';
import { Request } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTstrategy } from 'passport-jwt';
import envResult from '../../utils/env';

export const authMiddleware = () => (req: Request) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return new APIError(401, { message: 'Authorization header missing' });
    }

    // Authentication successful
    return passport.authenticate('jwt', { session: false });
};

//register JWT strategy
passport.use(
    new JWTstrategy(
        {
            secretOrKey: envResult.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
