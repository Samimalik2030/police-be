import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.mongo';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type RecruiterDocument = Recruiter & Document;

@MongoSchema({ timestamps: true })
export class Recruiter {

  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({
    example: '03001234567',
    description: 'Phone number of the recruiter',
  })
  @Prop({ required: true, trim: true })
  phone: string;

  @ApiProperty({
    example: '35202-1234567-8',
    description: 'CNIC number',
  })
  @Prop({ required: true, trim: true })
  cnic: string;

  @ApiProperty({
    example: 'male',
    enum: ['male', 'female', 'other'],
    description: 'Gender',
  })
  @Prop({ required: true, enum: ['male', 'female' ] })
  gender: string;


  @ApiProperty({
    example: '123 Street, Lahore',
    description: 'Address of the recruiter',
    required: false,
  })
  @Prop({ trim: true })
  address: string;

  @ApiProperty({
    example: 'Bachelor’s in Criminology',
    description: 'Educational qualification',
    required: false,
  })
  @Prop({ trim: true })
  qualification: string;

  @ApiProperty({
    example: 'Lahore',
    description: 'District assigned to the recruiter',
    required: false,
  })
  @Prop({ trim: true })
  district: string;

  @ApiProperty({
    type: () => User,
    description: 'Reference to the associated user account',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId | User;
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
