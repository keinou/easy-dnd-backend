import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: 'zXH2SpGKut71BmarMSUI3LEvDo3Yl3DaBzVkTbh4ReYFK7aZenzGQveW6bqxB1iYk481OV8OMBj3iwTu',
};

export const jwtOptions = {
    expiresIn: '1d',
    secret: jwtConstants.secret,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);