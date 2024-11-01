import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../processors/database/database.module';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../../auth/strategy/local.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'hydracoder1993744',
      signOptions: {
        expiresIn: '7d' as string,
      },
    }),
  ],
  controllers: [UserController],
  exports: [UserService, PassportModule],
  providers: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
