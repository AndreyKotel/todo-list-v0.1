import React, { ChangeEventHandler, useCallback, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void; //просто function писать плохо потому что при указании значения ф-ии ТС не ругается на ошибку
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={(e) => {
            // в объекте е лежит инфа о произошедшем  событии
            setNewTaskTitle(e.currentTarget.value); // элемент с которым произошло событие. то есть инпут
          }}
        />
        <button
          onClick={() => {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
          }}
        >
          +
        </button>
      </div>

      <ul>
        {
          //  props.tasks.map( item => {  t это объект. map заменяет индексы. Также нужно добавить ключ
          props.tasks.map((item) => {
            const onChangeHandler = () => {
              console.log("change");
            };
            return (
              <li key={item.id}>
                <input
                  onChange={(e) => {
                    props.changeTaskStatus(item.id, e.currentTarget.checked);
                  }}
                  type="checkbox"
                  checked={item.isDone}
                  //onChange={onChangeHandler}
                />
                <span>{item.title}</span>
                <button
                  onClick={() => {
                    props.removeTask(item.id);
                  }}
                >
                  X
                </button>{" "}
              </li>
            );
          })
        }
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

/*
import React, { useState } from "react";

function Todolist(props) {
  const [addNewtask, setNewtask] = useState("");
  // console.log(addNewtask);
  return (
    <div>
      <input
        value={addNewtask}
        onChange={(e) => {
          setNewtask(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          props.addTask(addNewtask);
        }}
      >
        +
      </button>
      <br></br>
      <br></br>
      {props.tasks.map((item) => {
        {
          return (
            <li>
              <input
                onChange={(e) => {
                  props.changeCheck(item.id, e.currentTarget.checked);
           
                }}
                type="checkbox"
                checked={item.isDone}
              />
              {item.title}
              <button
                onClick={() => {
                  props.removeTask(item.id);
                }}
              >
                X
              </button>
            </li>
          );
        }
      })}
      <br></br>
      <button>All</button>
      <button
        onClick={() => {
          props.filterTasks("in process");
        }}
      >
        In Process
      </button>
      <button
        onClick={() => {
          props.filterTasks("completed");
        }}
      >
        Completed
      </button>
    </div>
  );
}

export default Todolist;

*/
