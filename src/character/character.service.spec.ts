import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterService],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('as service', () => {
    expect(service).toBe(service);
  });
});
