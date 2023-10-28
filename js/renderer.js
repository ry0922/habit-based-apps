'use strict'
// ToDoリストを初期化したのちに入力されたToDoをリストに追加する関数
function addToDo() {
  const item = document.querySelector("#ToDoItem").value;
  let today = new Date();
  let completedDate = new Array();
  let toDo = new ToDo(item, today, completedDate);
  console.log(toDo);
  setToDo(toDo);
}

// ToDoのステータスを表示する関数
async function showToDo() {
  const toDo = await fetchToDo();
  console.log(toDo);
  // 目標名表示
  const goalText = document.getElementById('goal-text');
  goalText.textContent = toDo.name;
  // 開始日
  const year = document.getElementById('year');
  year.textContent = toDo.year;
  const month = document.getElementById('month');
  month.textContent = toDo.month;
  const day = document.getElementById('day');
  day.textContent = toDo.day;
  // 継続日数
  // 前日未完了の場合、継続日数リセット
  if(!toDo.isCompletedPreviousDay()){
    toDo.days = 0;
  }
  const days = document.getElementById('days');
  days.textContent = toDo.days;
}

// ToDoを完了状態にする関数
async function completeToDo() {
  const toDo = await fetchToDo();
  const today = new Date();
  console.log(toDo);
  //  ToDoが前日に完了状態なら継続日数プラス
  if (toDo.isCompletedPreviousDay()) {
    toDo.addDays();
  } else {
    toDo.days = 1;
  }
  toDo.completedDate = toDo.dateToCSV(today, 0);
  await setToDo(toDo);
}

// カレンダーにToDoの完了状態を表示する関数
async function showCompletedDate() {
  const ToDo = await fetchToDo();
  // 完了日がない場合返却
  if (!ToDo.completedDate) {
    return;
  }

  const drawCompleted = new DrawCompleted();
  drawCompleted.drawCompleted(ToDo);
}

async function setToDo(ToDo){
  await window.dataapi.settodo(ToDo);
}

// ToDo取得、同期処理で利用する
async function fetchToDo(){
  const toDoOBJ = await window.dataapi.gettodo();
  console.log(toDoOBJ);
  const toDo = new ToDo("tmp", new Date(), []);
  toDo.OBJtoToDo(toDoOBJ);
  return toDo;
}

// ToDoリストを初期化する関数
async function initToDo() {
  await window.dataapi.todoalldel();
}