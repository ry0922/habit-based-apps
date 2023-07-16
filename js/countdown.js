'use strict'
function countDown(seconds) {
  const count = document.getElementById('count');
  count.innerText = seconds;
  setInterval(() => {
    if (seconds === 0){
      window_close();
      return;
    }
    seconds--;
    count.innerText = seconds;
  },1000);
}

function window_close() {
  window.dataapi.window_close();
}