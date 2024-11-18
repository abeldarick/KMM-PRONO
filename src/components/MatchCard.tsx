import React from 'react';
import { Calendar, MapPin, Thermometer } from 'lucide-react';
import { Match } from '../types';
import { format } from 'date-fns';

interface MatchCardProps {
  match: Match;
  onClick: (match: Match) => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(match)}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-indigo-600">{match.competition}</span>
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(match.date), 'PPP')}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 text-center">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-16 h-16 mx-auto mb-2" />
          <h3 className="font-semibold">{match.homeTeam.name}</h3>
        </div>
        <div className="px-4">
          <span className="text-2xl font-bold text-gray-800">vs</span>
        </div>
        <div className="flex-1 text-center">
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-16 h-16 mx-auto mb-2" />
          <h3 className="font-semibold">{match.awayTeam.name}</h3>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{match.venue}</span>
        </div>
        {match.weather && (
          <div className="flex items-center">
            <Thermometer className="w-4 h-4 mr-1" />
            <span>{match.weather}</span>
          </div>
        )}
      </div>
    </div>
  );
}