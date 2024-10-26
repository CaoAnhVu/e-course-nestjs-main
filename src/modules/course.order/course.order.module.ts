import { Module } from '@nestjs/common';
import { CourseOrderService } from './course.order.service';
import { CourseOrderController } from './course.order.controller';
import { DatabaseModule } from 'src/processors/database/database.module';

@Module({
  imports: [DatabaseModule], // Nhập vào DatabaseModule
  controllers: [CourseOrderController],
  providers: [CourseOrderService],
})
export class CourseOrderModule {}
