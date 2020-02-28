import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((date, req) => req.user);
