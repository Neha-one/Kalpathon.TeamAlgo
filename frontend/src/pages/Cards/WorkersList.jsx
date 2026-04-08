import React, { useEffect, useState } from 'react';
import API from '../../api/Api';
import WorkersCard from './WorkersCard';

function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await API.get('/user');
        console.log("Fetched users:", response.data.data.users);
        if (response.data.success && response.data.data.users) {
          // Filter to only include workers
          const filteredWorkers = response.data.data.users.filter(
            (user) => user.userProfession === 'worker'
          );
          setWorkers(filteredWorkers);
        }
      } catch (error) {
        console.error("Error fetching workers:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) {
    return <div className="text-center p-8 mt-10">Loading workers...</div>;
  }

  if (workers.length === 0) {
    return <div className="text-center p-8 mt-10 text-gray-500">No workers available currently.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Available Workers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {workers.map((worker) => (
          <WorkersCard key={worker._id} worker={worker} />
        ))}
      </div>
    </div>
  );
}

export default WorkersList;