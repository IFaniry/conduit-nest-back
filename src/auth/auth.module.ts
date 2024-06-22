import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '~/users/users.module';
import { EnvironmentVariables } from '~/env.interface';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    // https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
    // https://stackoverflow.com/a/53430924
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    AuthSerializer,
  ],
})
export class AuthModule {}
