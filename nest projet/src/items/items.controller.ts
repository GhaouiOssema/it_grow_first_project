import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protect the route
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protect the route
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protect the route
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protect the route
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protect the route
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
