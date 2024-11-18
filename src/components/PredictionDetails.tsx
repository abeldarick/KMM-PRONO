import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, AlertTriangle } from 'lucide-react';

interface PredictionDetailsProps {
  match: any;
  prediction: any;
  homeTeamStats: any;
  awayTeamStats: any;
}

export function PredictionDetails({ match, prediction, homeTeamStats, awayTeamStats }: PredictionDetailsProps) {
  const confidenceColor = prediction.confidence >= 0.7 ? 'text-green-600' : 
                         prediction.confidence >= 0.5 ? 'text-yellow-600' : 
                         'text-red-600';

  const getFormStats = (stats: any) => {
    const wins = stats.filter((m: any) => m.score.winner === 'HOME_TEAM').length;
    const draws = stats.filter((m: any) => m.score.winner === 'DRAW').length;
    const losses = stats.filter((m: any) => m.score.winner === 'AWAY_TEAM').length;
    return { wins, draws, losses };
  };

  const homeForm = getFormStats(homeTeamStats);
  const awayForm = getFormStats(awayTeamStats);

  const statsData = [
    { name: 'Wins', home: homeForm.wins, away: awayForm.wins },
    { name: 'Draws', home: homeForm.draws, away: awayForm.draws },
    { name: 'Losses', home: homeForm.losses, away: awayForm.losses },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Prediction Details</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-4xl font-bold text-indigo-600">
              {prediction.homeScore} - {prediction.awayScore}
            </p>
            <p className="text-sm text-gray-600 mt-2">Predicted Score</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className={`text-4xl font-bold ${confidenceColor}`}>
              {(prediction.confidence * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-600 mt-2">Confidence</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-4xl font-bold text-purple-600">
              {(prediction.probability * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-600 mt-2">Win Probability</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Recent Form Analysis</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="home" name={match.homeTeam.name} fill="#4F46E5" />
              <Bar dataKey="away" name={match.awayTeam.name} fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Key Insights</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-700">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            {match.homeTeam.name}'s home form: {homeForm.wins} wins in last 10 games
          </li>
          <li className="flex items-center text-gray-700">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            {match.awayTeam.name}'s away form: {awayForm.wins} wins in last 10 games
          </li>
          <li className="flex items-center text-gray-700">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Head-to-head advantage: {prediction.probability > 0.5 ? match.homeTeam.name : match.awayTeam.name}
          </li>
        </ul>
      </div>
    </div>
  );
}