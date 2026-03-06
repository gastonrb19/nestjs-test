import { status } from '../tasks.enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDtoTask {
  @ApiProperty({
    description: 'The status of the task',
    enum: status,
    required: true,
    examples: ['pending', 'in_progress', 'done'],
  })
  readonly status: status;
}
