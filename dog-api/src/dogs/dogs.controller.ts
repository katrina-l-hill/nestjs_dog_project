import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Dog } from './dogs.entity';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  getAll(): Dog[] {
    return this.dogsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Dog {
    return this.dogsService.findOne(+id);
  }

  @Post()
  create(@Body() dog: Omit<Dog, 'id'>): Dog {
    return this.dogsService.create(dog);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dog: Partial<Dog>): Dog {
    return this.dogsService.update(+id, dog);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.dogsService.delete(+id);
  }
}
