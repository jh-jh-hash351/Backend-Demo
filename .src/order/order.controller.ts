import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() orderData: Partial<Order>) {
    return this.orderService.create(orderData);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() orderData: Partial<Order>) {
    return this.orderService.update(id, orderData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
