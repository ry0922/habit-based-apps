'use strict'
async function addToDo() {
  console.log("addtodo");
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

async function initToDo() {
  await window.dataapi.todo_all_del();
}

async function completeToDo() {
  const ToDoList = await window.dataapi.getlist();
  const today = new Date();
  // タスクが前日に完了状態なら継続日数プラス
  if (isCompletedPreviousDay(ToDoList)) {
    ToDoList[0].days++;
  } else {
    ToDoList[0].days = 1;
  }
  ToDoList[0].completedDate.push(`${today.getFullYear()},${today.getMonth() + 1},${today.getDate()}`);
  await window.dataapi.setlist(ToDoList);
}

async function showCompletedDate() {
  const ToDoList = await window.dataapi.getlist();
  if (ToDoList[0].completedDate.length === 0) {
    return;
  }

  ToDoList[0].completedDate.forEach((data, i, array) => {
    let date = data.split(',');
    if (!getDateArea(date)) {
      return;
    }
    let completedDateArea = document.getElementById(`${date[0]}_${date[1]}_${date[2]}`);
    if (completedDateArea === null) {
      return;
    }
    completedDateArea.innerHTML += '<div class=completed>〇</div>';
  });
  // タスク開始日から今日まで未完了だった日に×をつける
  let today = new Date();
  let allday = new Date(ToDoList[0].year, ToDoList[0].month - 1, ToDoList[0].day);
  while (today.getDate() !== allday.getDate()) {
    let alldayArea = document.getElementById(`${allday.getFullYear()}_${allday.getMonth() + 1}_${allday.getDate()}`);
    if (alldayArea === null) {
      return;
    }
    // 子要素が空なら未完了印をつける
    if (alldayArea.children.length === 0) {
      alldayArea.innerHTML += '<div class=uncompleted>×</div>'
    }
    allday.setDate(allday.getDate() + 1);
  }
}

// 前日にタスクを完了したかどうかを確認する
function isCompletedPreviousDay(ToDoList) {
  const lastCompletedDate = ToDoList[0].completedDate.slice(-1)[0];
  const today = new Date();
  if (lastCompletedDate === `${today.getFullYear()},${today.getMonth() + 1},${today.getDate() - 1}`){
    return true;
  }else{
    return false;
  }
}

function getDateArea(date) {
  let dateArea = document.getElementById(`${date[0]}_${date[1]}_${date[2]}`);
  if (dateArea === null) {
    return;
  }
  return dateArea;
}

async function toDoAllDel() {
  const ToDoList = await window.dataapi.getlist();
  ToDoList.shift();
  await window.dataapi.setlist(ToDoList);
}
