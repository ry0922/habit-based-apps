'use strict'
// ToDoリストを初期化したのちに入力されたToDoをリストに追加する関数
async function addToDo() {
  initToDo();
  const item = document.querySelector("#ToDoItem").value;
  const ToDoList = await window.dataapi.getlist();
  let today = new Date();
  let completedDate = new Array();
  let goal = {
    name: item,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    days: 0,
    completedDate: completedDate
  };
  ToDoList.push(goal);//今回追加されたものをデータに追加
  await window.dataapi.setlist(ToDoList);//preloadを介してmainjsでStoreのデータを保存
}

// ToDoのステータスを表示する関数
async function showToDo() {
  // 目標名表示
  const goalText = document.getElementById('goal-text');
  const ToDoList = await window.dataapi.getlist();
  goalText.textContent = ToDoList[0].name;
  // 開始日
  const year = document.getElementById('year');
  const month = document.getElementById('month');
  const day = document.getElementById('day');
  year.textContent = ToDoList[0].year;
  month.textContent = ToDoList[0].month;
  day.textContent = ToDoList[0].day;
  // 継続日数
  const days = document.getElementById('days');
  // 前日未完了の場合、継続日数リセット
  if(!isCompletedPreviousDay(ToDoList)){
    ToDoList[0].days = 0;
    await window.dataapi.setlist(ToDoList);
  }
  days.textContent = ToDoList[0].days;
}

// ToDoリストを初期化する関数
async function initToDo() {
  await window.dataapi.todo_all_del();
}

// ToDoを完了状態にする関数
async function completeToDo() {
  const ToDoList = await window.dataapi.getlist();
  const today = new Date();
  //  ToDoが前日に完了状態なら継続日数プラス
  if (isCompletedPreviousDay(ToDoList)) {
    ToDoList[0].days++;
  } else {
    ToDoList[0].days = 1;
  }
  ToDoList[0].completedDate.push(dateToCSV(today, 0));
  await window.dataapi.setlist(ToDoList);
}

// カレンダーにToDoの完了状態を表示する関数
async function showCompletedDate() {
  const ToDoList = await window.dataapi.getlist();
  if (!ToDoList[0].completedDate.length) {
    return;
  }

  ToDoList[0].completedDate.forEach((data) => {
    let date = data.split(',');
    if (!arrayToArea(date)) {
      return;
    }
    let completedDateArea = arrayToArea(date);
    if (!completedDateArea) {
      return;
    }
    completedDateArea.innerHTML += '<div class=completed>〇</div>';
  });
  // ToDo開始日から今日まで未完了だった日に×をつける
  let today = new Date();
  // 探索用変数、初期値：開始日
  let dayToSearch = new Date(ToDoList[0].year, ToDoList[0].month - 1, ToDoList[0].day);
  // 開始日から今日まで探索
  while (today.getDate() !== dayToSearch.getDate()) {
    let dayToSearchArea = dateToArea(dayToSearch);
    // ToDo開始月と今日の月が異なるとき
    if (!dayToSearchArea) {
      dayToSearch = new Date(today.getFullYear(), today.getMonth(), 1);
      dayToSearchArea = dateToArea(dayToSearch);
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
function isCompletedPreviousDay(ToDoList) {
  const lastCompletedDate = ToDoList[0].completedDate.slice(-1)[0];
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
function arrayToArea(date) {
  let dateArea = document.getElementById(`${date[0]}_${date[1]}_${date[2]}`);
  if (!dateArea) {
    return;
  }
  return dateArea;
}

// date型からカレンダーの日付領域名を取得して返す関数
function dateToArea(date) {
  const dateArea = document.getElementById(`${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`);
  return dateArea;
}

// ToDoリストをすべて削除する関数
async function toDoAllDel() {
  const ToDoList = await window.dataapi.getlist();
  ToDoList.shift();
  await window.dataapi.setlist(ToDoList);
}
