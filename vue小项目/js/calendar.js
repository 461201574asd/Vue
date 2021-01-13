new Vue({
  el: "#calendar",
  data() {
    return {
      currentYear: 1970,//当前年份
      currentMonth: 1,
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      currentWeek: 1,
      currentDay: 1,
      days: [],//存放天数的数组
    }
  },
  created() {
    this.initData();
  },

  methods: {
    isRed(i) {
      if (i == 5 || i == 6) return 'color:red';
    },
    initData(cur) {
      let date;
      if(cur){
        date = new Date(cur);
      }else{
        // 1.获取当前的时间
        const now = new Date();
        // 2020-07-01
        date = new Date(this.formateDate(now.getFullYear(), now.getMonth() + 1, 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); //1~6 0
      if (this.currentWeek == 0) {
        this.currentWeek = 7
      }

      // 获取格式化之后的时间
      const str = this.formateDate(this.currentYear, this.currentMonth, this.currentDay);

      // 将数组的长度置空,不然会出现拼接现象
      this.days.length = 0;

      //this.currentWeek   3 
      // 2 1 0 获取上个月末 到本月第一天的日期
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        // setDate(0) 上月 最后一天
        // setDate(-1) 上月倒数第二天
        let d = new Date(str);
        // d.getDate()==1
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }
      // 获取剩余的天数
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },
    formateDate(year, month, day) {
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      return `${year}-${month}-${day}`
    },
    // 下个月和上一月的事件
    changeMonth(a) {
      let d = new Date(this.formateDate(this.currentYear, this.currentMonth, 1));
      a === 'prev' ? d.setDate(0) : d.setDate(35);
      this.initData(this.formateDate(d.getFullYear(),d.getMonth()+1,1));
    }

  },
})