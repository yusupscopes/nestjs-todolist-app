import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';
import { Note } from './interfaces/note.interface';
import { Test } from '@nestjs/testing';


describe('NoteController', () => {
  let noteController: NoteController;
  let noteService: NoteService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    noteService = moduleRef.get<NoteService>(NoteService);
    noteController = moduleRef.get<NoteController>(NoteController);
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const result = new Promise<Note[]>((res, rej) => {
        res([{ name: "Plan in 2021", description: "Describe plan in 2021", tags: "Travel", createdAt: new Date() }]);
      });

      jest.spyOn(noteService, 'getAllNotes').mockImplementation(() => result);

      expect(await noteController.getAllNotes(noteService)).toBe(result);
    });
  });
});