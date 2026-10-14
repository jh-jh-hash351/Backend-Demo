import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.orderRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, orderData);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<{ message: string }> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return { message: `Order with ID ${id} deleted successfully` };
  }
}
