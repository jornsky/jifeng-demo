import { Controller, Get, Param, Query } from '@nestjs/common';
import { LinkService } from './link.service';
import { ApiTags } from '@nestjs/swagger';
import { LinkDto } from './link.dto';

@ApiTags('开放：短链接api')
@Controller('link')
export class LinkController {
  constructor(readonly linkService: LinkService) {}

  @Get()
  async toShortUrl(@Query() query: LinkDto) {
    return await this.linkService.actionUrl(query);
  }
}
