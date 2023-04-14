// 日付を取得し、時計を更新する
function setClock(){
  let elClock = document.getElementById("clock");
  
  let nowDate = new Date();
  let hour = zeroPadding(nowDate.getHours(), 2);
  let minutes = zeroPadding(nowDate.getMinutes(), 2);
  let seconds = zeroPadding(nowDate.getSeconds(), 2);

  elClock.innerHTML = hour + ":" + minutes + ":" + seconds;
}

// 数値が一桁の場合、0埋めをおこなう
function zeroPadding(targetNum, paddingNum) {
  const ZERO = "0";
  let joinedZero = ZERO.repeat(paddingNum) + String(targetNum);
  return joinedZero.slice(-paddingNum);
}

// 一秒間隔で時計を更新する処理を繰り返す
let timer = setInterval("setClock()", 1000);