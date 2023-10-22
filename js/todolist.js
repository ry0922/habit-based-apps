'use strict'
// ToDoリストを初期化したのちに入力されたToDoをリストに追加する関数
function addToDo() {
  const item = document.querySelector("#ToDoItem").value;
  let today = new Date();
  let completedDate = new Array();
  let ToDo = {
    name: item,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    days: 0,
    completedDate: completedDate
  };
  setToDo(ToDo);
}

// ToDoのステータスを表示する関数
async function showToDo() {
  const ToDo = await fetchToDo();
  console.log(ToDo);
  // 目標名表示
  const goalText = document.getElementById('goal-text');
  goalText.textContent = ToDo.name;
  // 開始日
  const year = document.getElementById('year');
  year.textContent = ToDo.year;
  const month = document.getElementById('month');
  month.textContent = ToDo.month;
  const day = document.getElementById('day');
  day.textContent = ToDo.day;
  // 継続日数
  // 前日未完了の場合、継続日数リセット
  if(!isCompletedPreviousDay(ToDo)){
    ToDo.days = 0;
    // await window.dataapi.setlist(ToDoList);
  }
  const days = document.getElementById('days');
  days.textContent = ToDo.days;
}

// ToDoリストを初期化する関数
async function initToDo() {
  await window.dataapi.todoalldel();
}

// ToDoを完了状態にする関数
async function completeToDo() {
  const ToDo = await fetchToDo();
  const today = new Date();
  console.log(ToDo);
  //  ToDoが前日に完了状態なら継続日数プラス
  if (isCompletedPreviousDay(ToDo)) {
    ToDo.days++;
  } else {
    ToDo.days = 1;
  }
  ToDo.completedDate.push(dateToCSV(today, 0));
  await setToDo(ToDo);
}

// カレンダーにToDoの完了状態を表示する関数
async function showCompletedDate() {
  const ToDo = await fetchToDo();
  // 完了日がない場合返却
  if (!ToDo.completedDate.length) {
    return;
  }

  ToDo.completedDate.forEach((data) => {
    let date = data.split(',');
    if (!arrayToElement(date)) {
      return;
    }
    let completedDateArea = arrayToElement(date);
    if (!completedDateArea) {
      return;
    }
    completedDateArea.innerHTML += '<div class=completed>〇</div>';
  });
  // ToDo開始日から今日まで未完了だった日に×をつける
  let today = new Date();
  // 探索用変数、初期値：開始日
  let dayToSearch = new Date(ToDo.year, ToDo.month - 1, ToDo.day);
  // 開始日から今日まで探索
  while (today.getDate() !== dayToSearch.getDate()) {
    let dayToSearchArea = dateToElement(dayToSearch);
    // ToDo開始月と今日の月が異なるとき
    if (!dayToSearchArea) {
      dayToSearch = new Date(today.getFullYear(), today.getMonth(), 1);
      dayToSearchArea = dateToElement(dayToSearch);
    }
    // 子要素が空なら未完了印をつける
    if (!dayToSearchArea.children.length) {
      let uncompletedDateArea = dayToSearchArea;
      uncompletedDateArea.innerHTML += '<div class=uncompleted>×</div>'
    }
    // 探索用変数に1日追加
    dayToSearch.setDate(dayToSearch.getDate() + 1);
  }
}

// 前日にタスクを完了したかどうかを確認する
function isCompletedPreviousDay(ToDo) {
  const lastCompletedDate = ToDo.completedDate.slice(-1)[0];
  const today = new Date();
  if (lastCompletedDate === dateToCSV(today, 1)){
    return true;
  }else{
    return false;
  }
}

function dateToCSV(date, daysAgo){
  return `${date.getFullYear()},${date.getMonth() + 1},${date.getDate() - daysAgo}`;
}

// 日付配列からカレンダーの日付領域を取得して返す関数
function arrayToElement(date) {
  let dateArea = document.getElementById(`${date[0]}_${date[1]}_${date[2]}`);
  if (!dateArea) {
    return;
  }
  return dateArea;
}

// date型からカレンダーの日付領域名を取得して返す関数
function dateToElement(date) {
  const dateArea = document.getElementById(`${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`);
  return dateArea;
}

async function setToDo(ToDo){
  await window.dataapi.settodo(ToDo);
}

// ToDo取得、同期処理で利用する
function fetchToDo(){
  const ToDo = window.dataapi.gettodo();
  return ToDo;
}
