import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/getUser.decorator';
import { Roles } from 'src/decorators/Roles.decorator';
import { CreatePropertyDto } from 'src/dto/property.dto';
import { TUserInReq } from 'type';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService:PropertyService){}
    
    @Roles('REALTOR')
    @Post()
    createProperty(@Body() body: CreatePropertyDto, @GetUser('user') user:TUserInReq) {
        return this.propertyService.createProperty(body, user.id)
    }

    @Get('/:id')
    getPropertyById(@Param('id', ParseIntPipe) id: number){
        return this.propertyService.getPropertyById(id)
    }

    @Get()
    getAllProperties(){
        return this.propertyService.getAllProperties()
    }

    @Put('/update')
    updateProperty(){
        return this.propertyService.updateProperty()
    }
}
