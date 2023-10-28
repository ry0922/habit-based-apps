class ToDo {
  constructor(name, date, completedDate) {
    this._name = name;
    this._year = date.getFullYear();
    this._month = date.getMonth() + 1;
    this._day = date.getDate();
    this._days = 0;
    this._completedDate = completedDate;
  }

  OBJtoToDo(object){
    this._name = object._name;
    this._year = object._year;
    this._month = object._month;
    this._day = object._day;
    this._days = object._days;
    this._completedDate = object._completedDate;
  }

  // getter
  get name(){
    return this._name;
  }

  get year(){
    return this._year;
  }
  
  get month(){
    return this._month;
  }

  get day(){
    return this._day;
  }

  get days(){
    return this._days;
  }

  get completedDate(){
    return this._completedDate;
  }

  set days(num){
    this._days = num;
  }

  addDays(){
    this.days++;
  }

  set completedDate(dateCSV){
    this._completedDate.push(dateCSV);
  }
  
  // 前日にタスクを完了したかどうかを確認する
  isCompletedPreviousDay() {
    console.log(this);
    const lastCompletedDate = this._completedDate.slice(-1)[0];
    const today = new Date();
    if (lastCompletedDate === this.dateToCSV(today, 1)) {
      return true;
    } else {
      return false;
    }    
  }

  dateToCSV(date, daysAgo){
    return `${date.getFullYear()},${date.getMonth() + 1},${date.getDate() - daysAgo}`;
  }
}