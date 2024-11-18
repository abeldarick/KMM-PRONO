import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const BASE_URL = 'https://api.football-data.org/v4';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_KEY
  }
});

export const fetchTodayMatches = async () => {
  const today = new Date().toISOString().split('T')[0];
  const response = await api.get(`/matches?dateFrom=${today}&dateTo=${today}`);
  return response.data.matches;
};

export const fetchTeamStats = async (teamId: number) => {
  const response = await api.get(`/teams/${teamId}/matches?limit=10`);
  return response.data.matches;
};

export const predictMatch = (homeTeam: any, awayTeam: any) => {
  // Implement prediction logic based on team stats
  const homeStrength = calculateTeamStrength(homeTeam);
  const awayStrength = calculateTeamStrength(awayTeam);
  
  const predictedHomeGoals = Math.round((homeStrength * 1.1) * 2) / 2;
  const predictedAwayGoals = Math.round((awayStrength * 0.9) * 2) / 2;
  
  return {
    homeScore: predictedHomeGoals,
    awayScore: predictedAwayGoals,
    probability: calculateProbability(homeStrength, awayStrength),
    confidence: calculateConfidence(homeStrength, awayStrength)
  };
};

const calculateTeamStrength = (team: any) => {
  // Calculate team strength based on recent form and stats
  const recentFormScore = team.recentForm.reduce((acc: number, result: string) => {
    return acc + (result === 'W' ? 1 : result === 'D' ? 0.5 : 0);
  }, 0) / team.recentForm.length;
  
  const goalsScored = (team.homeGoalsScored + team.awayGoalsScored) / 2;
  const goalsConceded = (team.homeGoalsConceded + team.awayGoalsConceded) / 2;
  
  return (recentFormScore * 0.4) + (goalsScored * 0.4) - (goalsConceded * 0.2);
};

const calculateProbability = (homeStrength: number, awayStrength: number) => {
  const totalStrength = homeStrength + awayStrength;
  return homeStrength / totalStrength;
};

const calculateConfidence = (homeStrength: number, awayStrength: number) => {
  const strengthDiff = Math.abs(homeStrength - awayStrength);
  return Math.min(0.9, 0.5 + strengthDiff * 0.2);
};