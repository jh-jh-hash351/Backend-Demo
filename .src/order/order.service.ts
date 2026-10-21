import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      console.error('OrderService.findAll Error:', error);
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
      });
      if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
      return order;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve order');
    }
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    try {
      const order = this.orderRepository.create(orderData);
      return await this.orderRepository.save(order);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT' || error.message?.includes('UNIQUE')) {
        throw new BadRequestException('Order already exists or constraint violated');
      }
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    try {
      const order = await this.findOne(id);
      Object.assign(order, orderData);
      return await this.orderRepository.save(order);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const order = await this.findOne(id);
      await this.orderRepository.remove(order);
      return { message: `Order with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete order');
    }
  }
}
