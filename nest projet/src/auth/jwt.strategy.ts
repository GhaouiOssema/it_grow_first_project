import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // You will define this interface
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Optional: Adjust this based on your token expiration requirements
      secretOrKey:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczNjMyOTE2NywiaWF0IjoxNzM2MzI5MTY3fQ.t-TrnnHfOrpV58GFzexVBSu7dg3cAbv7Z2Z6KnfshQ0', // Your JWT secret key
    });
  }

  async validate(payload: JwtPayload) {
    // Validate the user by the payload (which will contain the user data)
    return this.authService.validateUserByPayload(payload);
  }
}
