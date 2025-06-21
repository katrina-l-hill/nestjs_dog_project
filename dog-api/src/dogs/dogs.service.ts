import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './dogs.entity';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [];

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number): Dog {
    const dog = this.dogs.find((d) => d.id === id);
    if (!dog) throw new NotFoundException('Dog not found');
    return dog;
  }

  create(data: Omit<Dog, 'id'>): Dog {
    const newDog = { ...data, id: Date.now() };
    this.dogs.push(newDog);
    return newDog;
  }

  update(id: number, updateData: Partial<Dog>): Dog {
    const dog = this.findOne(id);
    Object.assign(dog, updateData);
    return dog;
  }

  delete(id: number): void {
    this.dogs = this.dogs.filter((d) => d.id !== id);
  }
}
