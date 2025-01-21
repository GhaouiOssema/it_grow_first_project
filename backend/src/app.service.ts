import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class AppService {
  DisplayMessage(): string {
    const filePath = join(__dirname, '..', 'templates', 'welcome.html');
    const fileContent = readFileSync(filePath, 'utf8');

    const data = {
      status: 'Application is live 🎉',
      currentDate: new Date().toLocaleString(),
      year: new Date().getFullYear(),
      deploymentDate: new Date().toLocaleString(),
    };

    const template = Handlebars.compile(fileContent);

    return template(data);
  }
}
