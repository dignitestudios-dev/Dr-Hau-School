import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

const ReportDetails = () => {
  const { appointmentId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(`/report/${appointmentId}`);
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [appointmentId]);

  if (loading) return <p>Loading report...</p>;

  return (
    <div>
      <h1>Report Details</h1>
      <pre>{JSON.stringify(report, null, 2)}</pre>
    </div>
  );
};

export default ReportDetails;
