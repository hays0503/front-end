import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  reducersSetFirstNameSecondName,
  reducersSetDepartment,
  reducersSetPostJob,
  reducersSetTelephone,
  stateFirstNameSecondName,
  stateDepartment,
  statePostJob,
  stateTelephone,
} from "./InputFormSlice";
import { reducersAddEmployers } from "../tableEmployers/tableEmployersSlice";
import "./css/InputForm.css";

export function InputForm() {
  const [FirstNameSecondName, setFirstNameSecondName] = useState("");
  const [Department, setDepartment] = useState("");
  const [PostJob, setPostJob] = useState("");
  const [Telephone, setTelephone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (FirstNameSecondName.trim() === "") {
      alert("ФИО пустое !");
      return;
    }
    if (/\d/.test(FirstNameSecondName)) {
      console.log(/\d/.test(FirstNameSecondName));
      alert("ФИО не может быть числом");
      return;
    }
    //////////////////////////////////////////////////////
    if (Department.trim() === "") {
      alert("Отдел пустое !");
      return;
    }
    if (!isNaN(Number(Department.trim()))) {
      alert("Отдел не может быть числом");
      return;
    }
    //////////////////////////////////////////////////////
    if (PostJob.trim() === "") {
      alert("Должность пустое !");
      return;
    }
    if (!isNaN(Number(PostJob.trim()))) {
      alert("Должность не может быть числом");
      return;
    }
    /////////////////////////////////////////////////////
    if (Telephone.trim() === "") {
      alert("Телефон пустое !");
      return;
    }
    if (isNaN(Number(Telephone.trim()))) {
      alert("Телефон не может быть словом/строкой!");
      return;
    }

    dispatch(reducersSetFirstNameSecondName(FirstNameSecondName));
    dispatch(reducersSetDepartment(Department));
    dispatch(reducersSetPostJob(PostJob));
    dispatch(reducersSetTelephone(Telephone));
    dispatch(
      reducersAddEmployers({
        FirstNameSecondName,
        Department,
        PostJob,
        Telephone,
      })
    );
    fetch("http://localhost:3001/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FirstNameSecondName,
        Department,
        PostJob,
        Telephone,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
      });
  };

  const selectorFirstNameSecondName = useSelector(stateFirstNameSecondName);
  const selectorDepartment = useSelector(stateDepartment);
  const selectorPostJob = useSelector(statePostJob);
  const selectorTelephone = useSelector(stateTelephone);
  const dispatch = useDispatch();

  return (
    <div className="inputForm">
      Форма для добавление записей
      <form method="get">
        <ul>
          <li>
            {/* ФИО */}
            <span>ФИО </span>
            <input
              type="text"
              name="FirstNameSecondName"
              id="FirstNameSecondName"
              onChange={(e) => setFirstNameSecondName(e.target.value)}
            />
          </li>
          <br />
          <li>
            {/* Отдел */}
            <span>Отдел </span>
            <input
              type="text"
              name="Department"
              id="Department"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </li>
          <br />
          <li>
            {/* Должность */}
            <span>Должность </span>
            <input
              type="text"
              name="PostJob"
              id="PostJob"
              onChange={(e) => setPostJob(e.target.value)}
            />
          </li>
          <br />
          <li>
            <span>Номер телефона </span>
            {/* Номер телефона */}
            <input
              type="tel"
              name="Telephone"
              id="Telephone"
              onChange={(e) => setTelephone(e.target.value)}
            />
          </li>
        </ul>
        <button onClick={handleSubmit}>⚡ Добавить в б/д ⚡</button>
      </form>
    </div>
  );
}
