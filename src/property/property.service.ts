import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EPropertyAction, EPropertyPurpose, EPropertyType, EState, EStreetType } from '@prisma/client';
import { PropertyRespondDto } from 'src/dto/property.dto';
import { PrismaService } from 'src/prisma/prisma.service';

type TCreatePropertyDto = {
  unit_num?:number
  street_num:string
  street_name:string
  street_type: EStreetType
  suburb:string
  state: EState
  postcode:number
  sale_price?:number
  rent_price?: number
  land_size?:number
  property_type:EPropertyType
  bedroom_num:number
  studyroom_num?:number
  bathroom_num:number
  carpark_num?:number
  property_action:EPropertyAction
  property_purpose: EPropertyPurpose
}

@Injectable()
export class PropertyService {
  constructor(private readonly prismaService: PrismaService){}
    async createProperty(body:TCreatePropertyDto, realtorId:number) {
      const options = {
        ...body,
        ... body.unit_num && {unit_num: body.unit_num},
        ... body.sale_price && {sale_price: body.sale_price},
        ... body.rent_price && {rent_price: body.rent_price},
        ... body.land_size && {land_size: body.land_size},
        ... body.studyroom_num && {studyroom_num: body.studyroom_num},
        ... body.carpark_num && {carpark_num: body.carpark_num},
        realtor_id: realtorId
        
      }
      const property = await this.prismaService.property.create({
        data: options
      })
      if(!property) throw new BadRequestException()
      return new PropertyRespondDto(property)
    }

    async getPropertyById(id: number) {
      const property = await this.prismaService.property.findFirst({
        where: {
          id,
          is_delete: false
        }
      })
      if(!property) throw new BadRequestException()
      return new PropertyRespondDto(property)
    }

    async getAllProperties(){
      const properties = await this.prismaService.property.findMany({
        where: {
          is_delete: false
        }
      })
      if(properties.length == 0) throw new NotFoundException()
      
      return properties.map(property=>new PropertyRespondDto(property))
    }

    async updateProperty(){
      return 'update property'
    }
}
