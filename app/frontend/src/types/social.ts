export interface ITikTokProfile {
  id: string;
  unique_id: string;
  user_id?: string;
  sec_uid?: string;
  nickname?: string;
  avatar_url?: string;
  follower_count: number;
  following_count: number;
  aweme_count: number;
  region?: string;
  verification_type: number;
  is_seed_account: boolean;
  known_followers_count: number;
  follower_rank_sum: number;
  weighted_follower_score: number;
  trust_depth: number;
  rank_score: number;
  trusted_by_count: number;
  trust_received_sum: number;
  following_trusted_count: number;
  last_scraped_at?: string;
  created_at: string;
  updated_at: string;
}
