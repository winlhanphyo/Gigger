import { processAssociations } from './associate.decorator';

export * from './user.model';
export * from './genre.model';
export * from './userRole.model';
export * from './event.model';
export * from './artist.model';
export * from './video.model';
export * from './artistVideo.model';

processAssociations();