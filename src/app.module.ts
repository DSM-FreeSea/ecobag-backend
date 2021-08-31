import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ImagesModule } from './images/images.module';
import { CategoriesModule } from './categories/categories.module';
@Module({
  imports: [
    ImagesModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
