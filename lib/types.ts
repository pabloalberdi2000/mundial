export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  matchDate: string
  phase: string
  homeScore?: number
  awayScore?: number
}

export interface Prediction {
  id?: string
  username: string
  match_id: string
  home_score: number
  away_score: number
}

export interface User {
  id: string
  email: string
  user_metadata?: {
    username?: string
  }
}
