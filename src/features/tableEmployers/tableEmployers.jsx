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
    dispatch(clearListEmployers());

    fetch(process.env.PUBLIC_URL+"/database")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
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
      })
      .catch((error) => {
        if (error) {
          alert("Что то случилось с бд ! ");
        }
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
      <button onClick={() => getEmployer()}>
        ⚡Обновить состояние б/д принудительно⚡
      </button>
      <table className="table_dark">
        <tbody>
          <tr>
            <th>ФИО</th>
            <th>Отдел</th>
            <th>Пост</th>
            <th>Телефон</th>
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
