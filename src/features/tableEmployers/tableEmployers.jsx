import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stateEmployers } from "./tableEmployersSlice";
import {
  reducersAddEmployers,
  clearListEmployers,
} from "../tableEmployers/tableEmployersSlice";
import "./css/tableEmployers.css";

export function TableEmployers() {
  const selectorEmployers = useSelector(stateEmployers);
  const dispatch = useDispatch();

  function getEmployer() {
<<<<<<< HEAD
    dispatch(clearListEmployers());
=======
>>>>>>> 6ad2bcb77e486c0e4c84aea47a118ebe7d8dd5c5
    fetch("http://localhost:3001/database")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("1: ", data);

        data.map((employer) => {
          let item = {
            FirstNameSecondName: "",
            Department: "",
            PostJob: "",
            Telephone: "",
          };
          item.FirstNameSecondName = employer["firstnamesecondname"];
          item.Department = employer["department"];
          item.PostJob = employer["postjob"];
          item.Telephone = employer["telephone"];
          console.log("2", item);
          dispatch(reducersAddEmployers(item));
        });
      });
  }
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      console.log("111");
      getEmployer();
    } else {
      console.log("222");
    }
  });

  return (
    <div className="OutputForm">
      <button onClick={() => getEmployer()}>update</button>
      <table className="table_dark">
        <tbody>
          <tr>
            <th>FirstNameSecondName</th>
            <th>stateDepartment</th>
            <th>statePostJob</th>
            <th>stateTelephone</th>
          </tr>
          {selectorEmployers.map(
            ({ FirstNameSecondName, Department, PostJob, Telephone }) => (
              <tr key={FirstNameSecondName}>
                <th>{FirstNameSecondName}</th>
                <th>{Department}</th>
                <th>{PostJob}</th>
                <th>{Telephone}</th>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
