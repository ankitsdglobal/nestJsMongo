import { Injectable } from '@nestjs/common';
// injectable allows to inject as dependency in constructor
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  //   private readonly items: Item[] = [
  //     {
  //       id: '12345678',
  //       name: 'Item one',
  //       qty: 100,
  //       description: 'This is item one',
  //     },
  //     {
  //       id: '12345675',
  //       name: 'Item two',
  //       qty: 200,
  //       description: 'This is item two',
  //     },
  //     {
  //       id: '12345671',
  //       name: 'Item three',
  //       qty: 300,
  //       description: 'This is item three',
  //     },
  //   ];
}
