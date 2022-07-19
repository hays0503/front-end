import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stateEmployers } from "./tableEmployersSlice";
import { reducersAddEmployers } from "../tableEmployers/tableEmployersSlice";
import "./css/tableEmployers.css";

export function TableEmployers() {
  // const selectorEmployers = useSelector(stateEmployers);
  // const dispatch = useDispatch();

  // function getEmployer() {
  //   fetch("http://localhost:3001/database")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("1: ", data);

  //       data.map((employer) => {
  //         let item = {
  //           FirstNameSecondName: "",
  //           Department: "",
  //           PostJob: "",
  //           Telephone: "",
  //         };
  //         item.FirstNameSecondName = employer["firstnamesecondname"];
  //         item.Department = employer["department"];
  //         item.PostJob = employer["postjob"];
  //         item.Telephone = employer["telephone"];
  //         console.log("2", item);
  //         dispatch(reducersAddEmployers(item));
  //       });
  //     });
  // }
  useEffect(() => {
    console.log("mounted");
  }, []);

  // return (
  //   <div className="OutputForm">
  //     <button onClick={() => getEmployer()}>update</button>
  //     <table className="table_dark">
  //       <tbody>
  //         <tr>
  //           <th>FirstNameSecondName</th>
  //           <th>stateDepartment</th>
  //           <th>statePostJob</th>
  //           <th>stateTelephone</th>
  //         </tr>
  //         {selectorEmployers.map(
  //           ({ FirstNameSecondName, Department, PostJob, Telephone }) => (
  //             <tr key={FirstNameSecondName}>
  //               <th>{FirstNameSecondName}</th>
  //               <th>{Department}</th>
  //               <th>{PostJob}</th>
  //               <th>{Telephone}</th>
  //             </tr>
  //           )
  //         )}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}
