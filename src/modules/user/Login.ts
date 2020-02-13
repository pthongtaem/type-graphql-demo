import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../entity/User';
import { LoginToken } from './login/LoginToken';

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginToken, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginToken | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      'XXXXX',
      {
        expiresIn: '7d',
      },
    );

    return { token, user };
  }
}
