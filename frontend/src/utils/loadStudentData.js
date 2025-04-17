import axios from "axios";
import Papa from "papaparse";
import { addStudentData } from "../store/studentData"; // update the path as needed

export const loadStudentData = (dispatch) => {
  return new Promise((resolve, reject) => {
    axios.get("/data.csv") // Ensure this is the correct path for your CSV file
      .then((response) => {
        if (response.status === 200) {
          // Parse the CSV data
          Papa.parse(response.data, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const data = results.data;

              if (data && data.length > 0) {
                dispatch(addStudentData(data));
                
                // Call helper functions to calculate insights
                const insights = calculateInsights(data);

                resolve({ data, insights }); // Return both the data and insights
              } else {
                reject("No data found in the CSV file.");
              }
            },
            error: (err) => {
              console.error("PapaParse Error:", err);
              reject("Error parsing CSV file.");
            }
          });
        } else {
          reject(`Error: Received ${response.status} from server.`);
        }
      })
      .catch((error) => {
        console.error("Error loading CSV:", error);
        reject("Failed to load CSV file.");
      });
  });
};

// Function to calculate necessary insights
const calculateInsights = (data) => {
  const insights = {
    studentsPerYear: {},
    averageCGPA: 0,
    averageCTC: 0,
    placementByCompany: {},
    placementByBranch: {},
    genderDistribution: { Male: 0, Female: 0, Other: 0 },
  };

  let totalCGPA = 0;
  let totalCTC = 0;

  // Process each student data to calculate insights
  data.forEach((student) => {
    // 1. Number of students per year
    const year = student["Passing Year"];
    if (insights.studentsPerYear[year]) {
      insights.studentsPerYear[year] += 1;
    } else {
      insights.studentsPerYear[year] = 1;
    }

    // 2. Average CGPA and CTC
    totalCGPA += parseFloat(student["CGPA"]);
    totalCTC += parseFloat(student["CTC (LPA)"]);

    // 3. Placement by company
    const company = student["Company Placed In"];
    if (insights.placementByCompany[company]) {
      insights.placementByCompany[company] += 1;
    } else {
      insights.placementByCompany[company] = 1;
    }

    // 4. Placement by branch
    const branch = student["Branch"];
    if (insights.placementByBranch[branch]) {
      insights.placementByBranch[branch] += 1;
    } else {
      insights.placementByBranch[branch] = 1;
    }

    // 5. Gender distribution
    const gender = student["Gender"];
    if (insights.genderDistribution[gender] !== undefined) {
      insights.genderDistribution[gender] += 1;
    } else {
      insights.genderDistribution[gender] = 1;
    }
  });

  // Calculate average CGPA and CTC
  const totalStudents = data.length;
  insights.averageCGPA = totalCGPA / totalStudents;
  insights.averageCTC = totalCTC / totalStudents;

  return insights;
};
