import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let initTasks = [
    { id: v1(), title: "XXX", isDone: true },
    { id: v1(), title: "XXX2", isDone: false },
    { id: v1(), title: "XXX3", isDone: true },
  ];

  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((item) => item.id !== id);
    //id:string это на что кликнули(получили из onClick).
    //эта функция оставляет ток то что не кликнуто. при этом filter не влияет на исх массив
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((item) => item.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((item) => item.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="blya"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
      />
    </div>
  );
}

export default App;

//pizda это абстрактное название переменной. {в вся суть, js}
//Todolist(props) называем тоже как хотим
//проблема сделать крестик сбоку списка. если несколько корневых элементов возвращаем можно обернуть в <div> либо просто <>
//js передаем в {}, в фугкциях не забыть про return
//props это мостик чтобы доставать из App данные/функции

//при удалении таски функция должна по клику получить конкретный айди. значит в коде где происходит клик должны получить данные. но данные находятся в Арр поэтому вытаскиваем их оттуда
//pizda={initTasks} это в пропсах было лишнее. данные вытаскивались не из стэйта, поэтому не отрисовывалось

/*
import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";

import { v1 } from "uuid";

function App() {
  let initTasks = [
    { id: v1(), title: "XXX", isDone: true },
    { id: v1(), title: "XXX2", isDone: false },
    { id: v1(), title: "XXX3", isDone: true },
  ];
  const [tasks, setTasks] = useState(initTasks);
  //console.log(tasks);
  const [filterTask, setFiltertask] = useState("");
  // console.log(filterTask);

  function changeCheck(taskId, isDone) {
    // если в цикле находит кликнутый айди то меняем

    let task = tasks.find((item) => item.id === taskId);
    if (task) {
      task.isDone = !task.isDone;
    }
    setTasks([...tasks]);
  }

  function addTask(per) {
    let result = { id: v1(), title: per, isDone: true };
    let result1 = [result, ...tasks];
    setTasks(result1);
  }

  function removeTask(id) {
    let result = tasks.filter((item) => item.id !== id);
    setTasks(result);
  }

  function filterTasks(c) {
    setFiltertask(c);
  }
  //let resultblya = tasks;
  let resultblya = tasks;
  if (filterTask === "in process") {
    resultblya = tasks.filter((item) => item.isDone === false);
  }
  if (filterTask === "process") {
    resultblya = tasks.filter((item) => item.isDone === true);
  }

  return (
    <div className="App">
      <Todolist
        tasks={resultblya}
        addTask={addTask}
        removeTask={removeTask}
        filterTasks={filterTasks}
        changeCheck={changeCheck}
      />
    </div>
  );
}
export default App;

*/

/*
function ChildComponent ({pizda}) { // сюда можно передать в скобках и без.
  return <h1>{pizda}</h1>; 
};





export default function ParentComponent() {
  const message = "hello";

  return (
    <div>
      <ChildComponent pizda={101} /> 
    </div>
  );
};
*/

//оператор spread

/*

function ChildComponent (pizda) { 
 
  return <h1>{pizda.width}</h1>
};


export default function ParentComponent() {
  let pizda = {
    size: 12,
    width: 100
  }

  return (
    <div>
      <ChildComponent {...pizda} /> 
    </div>
  );
};
*/

/*
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
*/

//ОБРАБОТЧИКИ СОБЫТИЙ

/*

export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

*/

/*

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}

компонент по умолчанию не рисует вложенность. если  написать текст выше children то улетит в обе кнопки
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>

      {children}
    </button>
  );
}


STATE AS A SNAPSHOT


Queueing a Series of State Updates
*/

/*
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
         
         setNumber(5);
         setNumber(number + 1); 
         
         setNumber(number + 3); 
         
         //setNumber(n => n + 1); 

                 
         alert(number)
        
      
      }}>Increase the number</button>
    </>
  )
}

*/
//Updating Objects in State
