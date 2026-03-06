import { priority, status } from '../tasks.enums';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterGetDtoTasks {
  @ApiProperty({
    description: 'The status of the task',
    enum: status,
    required: true,
    examples: ['pending', 'in_progress', 'done'],
  })
  @IsNotEmpty()
  @IsEnum(status)
  readonly status: status;

  @ApiProperty({
    description: 'The priority of the task',
    enum: priority,
    required: true,
    examples: ['low', 'medium', 'high'],
  })
  @IsNotEmpty()
  @IsEnum(priority)
  readonly priority: priority;
}
