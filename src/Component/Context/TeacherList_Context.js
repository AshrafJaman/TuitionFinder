import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
export const TeacherContext = createContext();

export const TeacherList_Context = (props) => {
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTeacher(data);
      });
  }, []);
  // console.log(teacher);
  return (
    <TeacherContext.Provider value={[teacher, setTeacher]}>
      {props.children}
    </TeacherContext.Provider>
  );
};
