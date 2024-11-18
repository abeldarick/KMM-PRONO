import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MatchCard } from '../components/MatchCard';
import { fetchTodayMatches } from '../services/api';
import { Loader } from '../components/Loader';

export function Dashboard() {
  const navigate = useNavigate();
  
  const { data: matches, isLoading, error } = useQuery('todayMatches', fetchTodayMatches);

  const handleMatchClick = (match: any) => {
    navigate(`/match/${match.id}`);
  };

  if (isLoading) return <Loader />;
  
  if (error) return (
    <div className="text-center text-red-600">
      Error loading matches. Please try again later.
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Today's Matches</h1>
      {matches?.length === 0 ? (
        <p className="text-center text-gray-600">No matches scheduled for today.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches?.map((match: any) => (
            <MatchCard key={match.id} match={match} onClick={handleMatchClick} />
          ))}
        </div>
      )}
    </div>
  );
}