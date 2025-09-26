import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { NoteService } from "./note.service";
import { NoteDTO } from "./dto/note.dto";
import { CreateNoteDTO } from "./dto/create-note.dto";
import { UpdateNoteDTO } from "./dto/update-note.dto";
import { FilterNoteDTO } from "./dto/filter-note.dto";

@Controller('note')
export class NoteController {
    constructor (private readonly noteService : NoteService) {}

    @Get()
    async getNotes(
        @Query('workspaceId') workspaceId : string
    ) : Promise<NoteDTO[]> {
        return this.noteService.getNotes(workspaceId)
    }

    @Get(':id')
    async getDetailNote(
        @Param('id') id : string
    ) : Promise<NoteDTO> {
        return this.noteService.getDetailNotes(id)
    }

    @Post()
    async createNote(
        @Body() createNoteDTO : CreateNoteDTO
    ){
        return this.noteService.createNote(createNoteDTO)
    }

    @Patch(':id')
    async updateNote(
        @Param('id') id : string,
        @Body() updateNoteDTO : UpdateNoteDTO
    ) : Promise<NoteDTO> {
        return this.noteService.updateNote(id, updateNoteDTO)
    }

    @Delete(':id')
    async deleteNote(
        @Param('id') id : string
    )  : Promise<NoteDTO> {
        return this.noteService.deleteNote(id)
    }

    @Get('filter')
    async filterNote(
        @Query() filters : FilterNoteDTO
    ) : Promise<NoteDTO[]> {
        return this.noteService.filterNotes(filters)
    }
}