import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import TasksEntity from './tasks.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<TasksEntity>;

  const mockTasks = [{ title: 'Test task', description: 'Test desc' }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TasksEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(mockTasks),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<TasksEntity>>(getRepositoryToken(TasksEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getTasks() returns the repository result', async () => {
    const tasks = await service.getTasks({
      status: 'pending',
      priority: 'low',
    });
    expect(tasks).toEqual(mockTasks);
    expect(repo.find).toHaveBeenCalledWith({
      where: { status: 'pending', priority: 'low' },
    });
  });

  it('getTask() throws if not found', async () => {
    (repo.findOne as jest.Mock).mockResolvedValueOnce(undefined);
    await expect(service.getTask(123)).rejects.toThrow('Task not found');
  });
});
