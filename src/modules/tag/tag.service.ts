import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TagDTO } from "./dto/tag.dto";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { TagFilterDTO } from "./dto/tag-filter.dto";

@Injectable()
export class TagService {
    constructor(private readonly prisma: PrismaService) { }


    async getTagsByWorkspace(workspaceId: string): Promise<TagDTO[]> {
        return await this.prisma.tag.findMany({
            where: {
                workspaceId,
                deletedAt: null,
            },
            include: {
                workspace: true,
                tasks: true
            }
        })
    }

    async createTag(createTagDTO: CreateTagDTO): Promise<TagDTO> {
        return this.prisma.tag.create({
            data: {
                name: createTagDTO.name,
                color: createTagDTO.color,
                workspaceId: createTagDTO.workspaceId,
            },
            include : {
                workspace : true
            }
        })
    }

    async updateTag(id: string, updateTagDTO: UpdateTagDTO): Promise<TagDTO> {
        const tag = await this.prisma.tag.findUnique({
            where: {
                id
            }
        });
        if (!tag || tag.deletedAt) {
            throw new NotFoundException("Tag not found");
        }

        return this.prisma.tag.update({
            where: {
                id
            },
            data: {
                ...(updateTagDTO.name !== undefined && { name: updateTagDTO.name }),
                ...(updateTagDTO.color !== undefined && { color: updateTagDTO.color }),
                ...(updateTagDTO.workspaceId !== undefined && { workspaceId: updateTagDTO.workspaceId }),
            },
            include : {
                workspace : true
            }
        })

    }

    async deleteTag(id: string): Promise<TagDTO> {
        const tag = await this.prisma.tag.findUnique({
            where: {
                id
            }
        })
        if (!tag || tag.deletedAt) {
            throw new NotFoundException("Tag not found");
        }

        return this.prisma.tag.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            },
            include : {
                workspace : true
            }
        })

    }

    async filterTag(filters: TagFilterDTO): Promise<TagDTO[]> {
        return this.prisma.tag.findMany({
            where: {
                deletedAt: null,
                ...(filters.name && {
                    name: { contains: filters.name, mode: "insensitive" },
                }),
                ...(filters.color && { color: filters.color }),
                ...(filters.workspaceId && { workspaceId: filters.workspaceId }),
            },

            include : {
                workspace : true,
                tasks : true
            }
        })
    }
}