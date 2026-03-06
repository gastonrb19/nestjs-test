import { priority, status } from '../tasks.enums';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDtoTasks {
  @ApiProperty({
    description: 'The title of the task',
    required: true,
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'The description of the task',
    required: false,
  })
  readonly description?: string;

  @ApiProperty({
    description: 'The status of the task',
    examples: ['pending', 'in_progress', 'done'],
    enum: status,
    required: true,

  })
  @IsNotEmpty()
  @IsEnum(status)
  readonly status: status;

  @ApiProperty({
    description: 'The priority of the task',
    examples: ['low', 'medium', 'high'],
    enum: priority,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(priority)
  readonly priority: priority;
}
