export interface Team {
  id: string;
  name: string;
  logo: string;
  recentForm: string[];
  homeGoalsScored: number;
  homeGoalsConceded: number;
  awayGoalsScored: number;
  awayGoalsConceded: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: string;
  date: string;
  venue: string;
  weather?: string;
  importance: 'high' | 'medium' | 'low';
}

export interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
  probability: number;
  confidence: number;
  factors: string[];
}

export interface MatchStats {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
}