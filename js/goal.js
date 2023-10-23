class goal {
  constructor(name, date, completedDate) {
    name = name;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    days = 0;
    completedDate = completedDate;
  }

  days(){
    return this.days;
  }

  addDays(){
    this.days++;
  }

  resetDays(){
    this.days = 0;
  }
  
  completedDate(){
    return this.completedDate;
  }

  addCompletedDate(dateCSV){
    this.completedDate.push(dateCSV);
  }

  // 前日にタスクを完了したかどうかを確認する
  isCompletedPreviousDay() {
    const lastCompletedDate = this.completedDate.slice(-1)[0];
    const today = new Date();
    if (lastCompletedDate === dateToCSV(today, 1)) {
      return true;
    } else {
      return false;
    }
  }
}