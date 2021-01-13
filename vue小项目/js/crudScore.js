const studyArrJson = [{
  'stuId': 'stu0001',
  'name': '张三',
  'ywScores': 85,
  'sxScores': 90
},
{
  'stuId': 'stu0002',
  'name': '李四',
  'ywScores': 88,
  'sxScores': 85
},
{
  'stuId': 'stu0003',
  'name': '王五',
  'ywScores': 65,
  'sxScores': 75
},
{
  'stuId': 'stu0004',
  'name': '刘六',
  'ywScores': 58,
  'sxScores': 96
}
];
new Vue({
  el: '#reportCard',
  data() {
    return {
      addArr: {
        stuId: '',
        name: '',
        ywScores: '',
        sxScores: '',

      },
      sortKey: 'ywScores',
      sortClass: "1",
      studyArr: studyArrJson,
      nowEditCol: -1,//当前行是否编辑
    }
  },

  methods: {
    // 录入成绩的方法
    submitStu() {
      const obj = {
        'stuId': this.addArr.stuId,
        'name': this.addArr.name,
        'ywScores': this.addArr.ywScores,
        'sxScores': this.addArr.sxScores,
      }
      this.studyArr.push(obj);
      this.resetForm();
    },
    // 重置表单
    resetForm() {
      this.addArr = {
        'stuId': '',
        'name': '',
        'ywScores': '',
        'sxScores': '',
      }
    },
    // 编辑操作
    startEdit(index) {
      this.nowEditCol = index;
    },
    cancelEdit() {
      this.nowEditCol = -1;
    },
    // 启动索引 修改数据 点击确认
    sureEdit(index) {
      this.$set(this.studyArr, index, this.editObj);
      this.nowEditCol = -1;
    },
    // 删除
    deleteStu(index) {
      this.studyArr.splice(index, 1);
    },
    // attr:表示比较的哪个属性 sortKey
    // rev: false 降序 true:升序
    sortBy(attr, rev) {
      if (rev == undefined) {
        rev = 1;//表示升序
      } else {
        // 如果false降序 true升序
        rev = rev ? 1 : -1;
      }
      return function (a, b) {
        // 语文
        a = a[attr]; //85
        b = b[attr]; //88 
        // (1) 当a-b<0 则升序 返回一个小于0的数
        // (2) 当a-b>0 则降序 返回一个大于0的数
        // (3) 当a=b  a和b位置不变
        if (a < b) {
          // 升序
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0

      }
    }

  },
  watch: {
    listenChange(newV, oldV) {
      console.log(newV);
      if (newV.sortClass === '-1') {

        // 降序
        this.studyArr.sort(this.sortBy(newV.sortKey, false));
      } else {
        // 升序
        this.studyArr.sort(this.sortBy(newV.sortKey, true));

      }

    }
  },

  computed: {
    // 如何通过watch监听多个属性
    listenChange() {
      const { sortKey, sortClass } = this;
      return {
        sortClass,
        sortKey
      }
    },
    editObj() {
      const editO = this.studyArr[this.nowEditCol];
      return {
        'stuId': editO.stuId,
        'name': editO.name,
        'ywScores': editO.ywScores,
        'sxScores': editO.sxScores,
      }
    }
  },
})