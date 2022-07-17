import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { stateEmployers } from "./tableEmployersSlice";
import "./css/tableEmployers.css";

export function TableEmployers() {
  const selectorEmployers = useSelector(stateEmployers);

  return (
    <div className="OutputForm">
      <table className="table_dark">
        <tr>
          <th>FirstNameSecondName</th>
          <th>stateDepartment</th>
          <th>statePostJob</th>
          <th>stateTelephone</th>
        </tr>
        {/* <tr>
          <th>{selectorFirstNameSecondName}</th>
          <th>{selectorDepartment}</th>
          <th>{selectorPostJob}</th>
          <th>{selectorTelephone}</th>
        </tr> */}
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
      </table>
    </div>
  );
}
