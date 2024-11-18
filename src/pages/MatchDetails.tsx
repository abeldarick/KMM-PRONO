import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchTeamStats, predictMatch } from '../services/api';
import { PredictionDetails } from '../components/PredictionDetails';
import { Loader } from '../components/Loader';

export function MatchDetails() {
  const { id } = useParams();

  const { data: match, isLoading: matchLoading } = useQuery(['match', id], 
    () => fetchTeamStats(parseInt(id!)));

  const { data: homeTeamStats, isLoading: homeLoading } = useQuery(
    ['teamStats', match?.homeTeam.id],
    () => fetchTeamStats(match?.homeTeam.id),
    { enabled: !!match }
  );

  const { data: awayTeamStats, isLoading: awayLoading } = useQuery(
    ['teamStats', match?.awayTeam.id],
    () => fetchTeamStats(match?.awayTeam.id),
    { enabled: !!match }
  );

  if (matchLoading || homeLoading || awayLoading) return <Loader />;

  if (!match) return <div>Match not found</div>;

  const prediction = predictMatch(homeTeamStats, awayTeamStats);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Match Analysis</h1>
      <PredictionDetails 
        match={match} 
        prediction={prediction}
        homeTeamStats={homeTeamStats}
        awayTeamStats={awayTeamStats}
      />
    </div>
  );
}