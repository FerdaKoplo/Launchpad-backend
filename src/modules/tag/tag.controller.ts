import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TagService } from "./tag.service";
import { TagDTO } from "./dto/tag.dto";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { TagFilterDTO } from "./dto/tag-filter.dto";

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Get(':workspaceId')
    async getTagsByWorkspace(
        @Param('workspaceId') workspaceId: string
    ): Promise<TagDTO[]> {
        return this.tagService.getTagsByWorkspace(workspaceId)
    }

    @Post()
    async createTagWorkspace(
        @Body() createTagDTO: CreateTagDTO
    ): Promise<TagDTO> {
        return this.tagService.createTag(createTagDTO)
    }

    @Put(':id')
    async updateTagWorkspace(
        @Param('id') id: string,
        @Body() updateTagDTO: UpdateTagDTO
    ): Promise<TagDTO> {
        return this.tagService.updateTag(id, updateTagDTO)
    }

    @Delete(':id')
    async deleteTagWorkspace(
        @Param('id') id: string
    ): Promise<TagDTO> {
        return this.tagService.deleteTag(id)
    }

    @Get("filter")
    async filterTags(
        @Query() filters: TagFilterDTO
    ): Promise<TagDTO[]> {
        return this.tagService.filterTag(filters);
    }
}
