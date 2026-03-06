import { priority } from '../tasks.enums';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDtoTask {
  @ApiProperty({
    description: 'The title of the task',
    required: false,
  })
  @IsNotEmpty()
  readonly title?: string;

  @ApiProperty({
    description: 'The description of the task',
    required: false,
  })
  readonly description?: string;

  @ApiProperty({
    description: 'The priority of the task',
    enum: priority,
    required: false,
    examples: ['low', 'medium', 'high'],
  })
  readonly priority?: priority;
}
