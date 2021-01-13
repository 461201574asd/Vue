new Vue({
  el: "#app",
  data() {
    return {
      items: [],
      time: 0,
      timer: null,
      rest: false,//不重置
      times: 1,//正确的点击次数
      timeCount:false,
    }
  },
  created() {
    // todo:创建随机的数字格子
    this.buildBox()
  },
  watch: {
    rest(newV){
      console.log(newV);
      
      [...this.$refs.li].map(item=>{
        item.style = '';
      })
    },
    timeCount(newV, oldV) {
      if(newV){
        clearInterval(this.timer);
        if(this.time > 20){
          alert(`一共花费了${this.time}秒!你的记忆力相当于一头猪`)
        }else if(this.time > 15 && this.time<=20){
          alert(`一共花费了${this.time}秒!你的记忆力也就比一头猪强`)

        }else if(this.time > 13 && this.time <=15){
          alert(`一共花费了${this.time}秒!你的记忆力处于普通人范围`)

        } else if (this.time > 10 && this.time <= 13) {
          alert(`一共花费了${this.time}秒!你的记忆力比一般人要强`)

        }else if(this.time < 10){
          alert(`一共花费了${this.time}秒!卧槽,你还是人么`)
        }
      }
      this.timeCount = false;
    }
  },
  methods: {
    clickBox(item, i) {
      /**
       * 点击正确的方块
       */
      if (this.rest === false) {
        alert('请开始游戏');
      } else if (item.val == this.times && this.rest == true) {
        // 改变当前元素的样式
        this.$refs.li[i].style = 'background-color:#666;color:#fff;';
        this.times = this.times + 1;
        if (this.times==26){
          this.timeCount = true;
        }
      }
    },
    // 开始游戏
    startGame() {
      clearInterval(this.timer);
      this.buildBox();
      this.rest = !this.rest;
      // 开始计时
      this.totalTime();
    },
    totalTime() {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    buildBox() {
      let arr = new Array();
      let i = 0;
      while (i < 25) {
        let num = Math.floor((Math.random() * 25 + 1));
        // 有可能随机数 num会生成重复的,所以要过滤,一旦发现跟数组中元素由重复,则不添加
        if (this.isRepeat(num, arr)) {
          arr[i] = {
            val: num,
            id: i
          }
          i++;//更新循环条件
        }
      }
      this.items = arr;

    },
    isRepeat(num, arr) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j]['val'] === num) {
          return false;
        }
      }
      return true;
    }
  },
})