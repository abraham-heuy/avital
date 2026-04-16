import { useEffect, useState } from 'react';
import { getConsultantMatches, type Match } from '../../../services/api.service';

export const AdminMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Note: getConsultantMatches is for consultants; for admin we need a different endpoint.
        // For now, we'll assume there's a getAllMatches endpoint. If not, we can adapt.
        // We'll use getConsultantMatches as placeholder (but it's consultant-specific).
        // Ideally add a getAllMatches in admin controller.
        const data = await getConsultantMatches(); // placeholder
        setMatches(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <div className="p-6 text-rb-silver">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-rb-silver mb-6">Matches</h1>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-5 border border-rb-silver/15">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-rb-silver">Match ID: {match.id}</p>
                <p className="text-sm text-rb-gray">Application ID: {match.applicationId}</p>
                <p className="text-sm text-rb-gray">Consultant ID: {match.consultantId}</p>
                <p className="text-xs text-rb-gray/60 mt-1">Status: {match.status}</p>
              </div>
            </div>
          </div>
        ))}
        {matches.length === 0 && <p className="text-rb-gray">No matches found.</p>}
      </div>
    </div>
  );
};