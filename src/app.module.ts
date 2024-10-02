import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';

import { TelegrafModule } from 'nestjs-telegraf'
import * as LocalSession from 'telegraf-session-local'

const sessions = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [
    TelegrafModule.forRoot({
    middlewares: [sessions.middleware()],
    token: process.env.BOT_TOKEN
  })],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}
