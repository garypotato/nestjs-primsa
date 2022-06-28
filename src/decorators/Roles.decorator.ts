import { SetMetadata } from '@nestjs/common';
import { EUserType } from '@prisma/client';

export const Roles = (...roles: EUserType[]) => SetMetadata('roles', roles);