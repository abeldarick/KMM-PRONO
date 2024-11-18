import React from 'react';
import { Match } from '../types';
import { MatchCard } from '../components/MatchCard';
import { useNavigate } from 'react-router-dom';

export function Predictions() {
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from an API
  const predictedMatches: Match[] = [
    {
      id: '2',
      homeTeam: {
        id: 'team3',
        name: 'Arsenal',
        logo: 'https://via.placeholder.com/64',
        recentForm: ['W', 'W', 'W', 'D', 'W'],
        homeGoalsScored: 30,
        homeGoalsConceded: 8,
        awayGoalsScored: 25,
        awayGoalsConceded: 12
      },
      awayTeam: {
        id: 'team4',
        name: 'Manchester City',
        logo: 'https://via.placeholder.com/64',
        recentForm: ['W', 'W', 'W', 'W', 'D'],
        homeGoalsScored: 35,
        homeGoalsConceded: 7,
        awayGoalsScored: 28,
        awayGoalsConceded: 10
      },
      competition: 'Premier League',
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      venue: 'Emirates Stadium',
      weather: 'Clear, 18°C',
      importance: 'high'
    }
  ];

  const handleMatchClick = (match: Match) => {
    navigate(`/match/${match.id}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">High Confidence Predictions</h1>
        <p className="mt-2 text-gray-600">Matches with over 75% prediction confidence</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictedMatches.map((match) => (
          <MatchCard key={match.id} match={match} onClick={handleMatchClick} />
        ))}
      </div>
    </div>
  );
}