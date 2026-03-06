import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue : {
            findAll: jest.fn().mockResolvedValue([{title: 'Test task', description: 'Test desc'}]),
            getTasks: jest.fn().mockResolvedValue([{title: 'Test task', description: 'Test desc'}]),
            getTask: jest.fn().mockResolvedValue({title: 'x'}),
            updateTask: jest.fn(),
            updateStatusTask: jest.fn(),
            deleteTask: jest.fn(),
            createTask: jest.fn(),
          }
        }
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should return an array from the service when filters are provided', async () => {
    const filter = { status: 'pending', priority: 'low' };
    const result = await controller.getTasks(filter as any);
    expect(result).toEqual([{title: 'Test task', description: 'Test desc'}]);
    expect(service.getTasks).toHaveBeenCalledWith(filter);
  });

  it('should throw BAD_REQUEST if filters are missing', async () => {
    await expect(controller.getTasks({} as any)).rejects.toThrow('You must provide status');
  });

});