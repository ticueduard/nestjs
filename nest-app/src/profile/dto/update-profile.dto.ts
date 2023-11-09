import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    phone?: number;
    country?: string;
    city?: string;
    adressLine1?: string;
    adressLine2?: string;
}
