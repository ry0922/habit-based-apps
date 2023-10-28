class DrawCompleted {

  drawCompleted(ToDo) {
    ToDo.completedDate.forEach((data) => {
      let date = data.split(',');
      if (!this.arrayToElement(date)) {
        return;
      }
      let completedDateElement = this.arrayToElement(date);
      if (!completedDateElement) {
        return;
      }
      completedDateElement.innerHTML += '<div class=completed>〇</div>';
    });
    // ToDo開始日から今日まで未完了だった日に×をつける
    let today = new Date();
    // 探索用変数、初期値：開始日
    let dayToSearch = new Date(ToDo.year, ToDo.month - 1, ToDo.day);
    // 開始日から今日まで探索
    while (today.getDate() !== dayToSearch.getDate()) {
      let dayToSearchElement = this.dateToElement(dayToSearch);
      // ToDo開始月と今日の月が異なるとき
      if (!dayToSearchElement) {
        dayToSearch = new Date(today.getFullYear(), today.getMonth(), 1);
        dayToSearchElement = this.dateToElement(dayToSearch);
      }
      if (!dayToSearchElement) {
        return;
      }
      // 子要素が空なら未完了印をつける
      if (!dayToSearchElement.children.length) {
        let uncompletedDateElement = dayToSearchElement;
        uncompletedDateElement.innerHTML += '<div class=uncompleted>×</div>'
      }
      // 探索用変数に1日追加
      dayToSearch.setDate(dayToSearch.getDate() + 1);
    }
  }

  // 日付配列からカレンダーの日付領域を取得して返す関数
  arrayToElement(date) {
    let dateArea = document.getElementById(`${date[0]}_${date[1]}_${date[2]}`);
    if (!dateArea) {
      return;
    }
    return dateArea;
  }

  dateToElement(date) {
    const dateArea = document.getElementById(`${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`);
    return dateArea;
  }

}