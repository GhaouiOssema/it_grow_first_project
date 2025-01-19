import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './schema/project.schema';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }
}
