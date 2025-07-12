# Notes on Frontend/Backend mismatch

- Authentication on the frontend relies on demo accounts stored in `localStorage` while the backend now exposes `/api/users` but no auth integration exists.
- Leaderboard and ranking endpoints return TikTok profiles but frontend tables expect different data shapes. Mapping may need adjustments.
