import { processAssociations } from './associate.decorator';

export * from './user.model';
export * from './genre.model';
export * from './userRole.model';
export * from './event.model';
export * from './post.model';
export * from './campaign.model';
export * from './passwordReset.model';

processAssociations();