import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadStudentData } from "../../utils/loadStudentData";

const Data = () => {
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    loadStudentData(dispatch)
      .then((data) => {
        setStudentData(data); // Optionally store it locally in component state
      })
      .catch((error) => {
        console.error("Error in loading student data:", error);
      });
  }, [dispatch]);

  return (
    <div>
      <h2>Student Data</h2>
      <pre>{JSON.stringify(studentData, null, 2)}</pre>
    </div>
  );
};

export default Data;
