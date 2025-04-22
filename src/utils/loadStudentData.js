// loadStudentData.js
import axios from "axios";
import Papa from "papaparse";
import { addStudentData } from "../store/slices/studentDataSlice.js";

export const loadStudentData = (dispatch) => {
  return new Promise((resolve, reject) => {
    axios.get("/newdata.csv")
      .then((response) => {
        if (response.status === 200) {
          // Parse the CSV data
          Papa.parse(response.data, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const data = results.data;

              if (data && data.length > 0) {
                dispatch(addStudentData({ data }));

                resolve({ data });
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