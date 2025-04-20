
export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

export interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  platforms: SocialPlatform[];
  image?: string;
}
