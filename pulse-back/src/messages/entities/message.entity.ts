import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'messages' })
export class Message {
  // TODO: Add fields and Swagger decorators once the entity is properly defined
}
