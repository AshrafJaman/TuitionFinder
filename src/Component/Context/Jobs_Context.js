import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
export const JobsContext = createContext();
export const Jobs_Context = (props) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/jobs`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);
  return <JobsContext.Provider value={[jobs, setJobs]}>{props.children}</JobsContext.Provider>;
};
