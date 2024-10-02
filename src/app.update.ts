import { Context, Telegraf } from 'telegraf';
import { InjectBot, On, Start, Update } from 'nestjs-telegraf';
import * as dotenv from 'dotenv';
dotenv.config()
@Update()
@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Добрый день. Как вас зовут?')
  }

  @On('text')
  async asnwer(ctx: Context) {
    const userName = ctx.text
    const dollarRate = await this.fetchDollarRate()
    await ctx.reply(`Рад знакомству, ${userName} ! Курс доллара сегодня ${dollarRate} рублей`)
    
  }

  private  async fetchDollarRate() {
    const apiUrl = 'https://v6.exchangerate-api.com/v6/2cf5d84382b60fa81d7b4adc/pair/USD/RUB';
    const apiKey = '2cf5d84382b60fa81d7b4adc'
  
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'apikey': apiKey
        }
      });
  
      const data = await response.json();
      const rate = data.conversion_rate;
  
      return rate.toFixed(4)
    } catch (error) {
      console.error(error);
      return 'Ошибка получения курса доллара';
    }
  }

}
