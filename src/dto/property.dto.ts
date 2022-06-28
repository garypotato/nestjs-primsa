import { EStreetType, EState, EPropertyType, EPropertyAction, EPropertyPurpose } from "@prisma/client"
import { Exclude, Expose } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"


export class CreatePropertyDto {
@IsNumber()
@IsPositive()
@IsOptional()
  unit_num?:number

  @IsString()
  @IsNotEmpty()
  street_num:string

  @IsString()
  @IsNotEmpty()
  street_name:string

  @IsEnum(EStreetType)
  street_type: EStreetType

  @IsString()
  @IsNotEmpty()
  suburb:string

  @IsEnum(EState)
  state: EState

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  postcode:number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    sale_price?:number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    rent_price?:number

  @IsNumber()
  @IsOptional()
  @IsPositive()
  land_size?:number

  @IsEnum(EPropertyType)
  property_type:EPropertyType

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bedroom_num:number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  studyroom_num?:number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bathroom_num:number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  carpark_num?:number

  @IsEnum(EPropertyAction)
  property_action:EPropertyAction

  @IsEnum(EPropertyPurpose)
  property_purpose: EPropertyPurpose
}

export class PropertyRespondDto {
    @Exclude()
    unit_num: number
    @Expose({name:"unitNum"})
    unitNum(){
      return this.unit_num
    }

    @Exclude()
    street_num: string
    @Expose({name: 'streetNum'})
    streetNum(){
      return this.street_num
    }

    @Exclude()
    street_name: string
    @Expose({name:'streetName'})
    streetName(){
      return this.street_name
    }

    @Exclude()
    street_type: EStreetType
    @Expose({name:'streetType'})
    streetType(){
      return this.street_type
    }

    suburb:string
    state:EState
    postcode: number

    @Exclude()
    sale_price: number
    @Expose({name:"salePrice"})
    salePrice(){
      return this.sale_price
    }

    @Exclude()
    rent_price: number
    @Expose({name:"rentPrice"})
    rentPrice(){
      return this.rent_price
    }

    @Exclude()
    land_size: number
    @Expose({name:'landSize'})
    landSize(){
      return this.land_size
    }

    @Exclude()
    property_type:EPropertyType
    @Expose({name:'propertyType'})
    propertyType(){
      return this.property_type
    }

    @Exclude()
    bedroom_num: number
    @Expose({name:'bedroomNumb'})
    bedroomNumb(){
      return this.bedroom_num
    }

    @Exclude()
    bathroom_num: number
    @Expose({name:'bathroomNum'})
    bathroomNum(){
      return this.bathroom_num
    }

    @Exclude()
    studyroom_num: number
    @Expose({name:'studyroomNum'})
    studyroomNum(){
      return this.studyroom_num
    }

    @Exclude()
    carpark_num: number
    @Expose({name:'carparkNum'})
    carparkNum(){
      return this.carpark_num
    }

    @Exclude()
    property_action: EPropertyAction
    @Expose({name:'propertyAction'})
    propertyAction(){
      return this.property_action
    }

    @Exclude()
    property_purpose: EPropertyPurpose
    @Expose({name:'propertyPurpose'})
    propertyPurpose(){
      return this.property_purpose
    }

    @Exclude()
    is_delete: boolean

    @Exclude()
    realtor_id: number
    @Expose({name:'realtorId'})
    realtorId(){
      return this.realtor_id
    }

    constructor(partial: Partial<PropertyRespondDto>){
      Object.assign(this, partial)
    }
}