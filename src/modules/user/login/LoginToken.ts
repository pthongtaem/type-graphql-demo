import { ObjectType, Field } from 'type-graphql';
import { User } from '../../../entity/User';

@ObjectType()
export class LoginToken {
  @Field()
  token: string;

  @Field()
  user: User;
}
