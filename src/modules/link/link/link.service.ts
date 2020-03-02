import { Injectable, NotFoundException } from '@nestjs/common';
import { LinkDto } from './link.dto';
const got = require('got');

@Injectable()
export class LinkService {
  async actionUrl(query: LinkDto) {
    const { url } = query;

    const api = `https://api.d5.nz/api/dwz/tcn.php?url=${url}`;
    console.log(api);

    if (!url) {
      throw new NotFoundException('参数错误');
    }

    try {
      const response = await got(api, {
        responseType: 'json',
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        },
      });
      console.log(response.request);
      // console.log('body', response.body);

      return response.body;
      //=> '<!doctype html> ...'
    } catch (error) {
      return error.response.body;
      //=> 'Internal server error ...'
    }
  }
}
