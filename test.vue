<template>
  <div>
    <el-form :model="DailyReportForm" :rules="rules" ref="DailyReportForm" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-select v-model="DailyReportForm.name" placeholder="请选择">
          <el-option label="孙继伟" value="sunjiwei"></el-option>
          <el-option label="李梦琪" value="limengqi"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作进展" prop="yesterdayWork">
        <el-input type="textarea" autosize placeholder="请输入昨天工作进展" v-model="DailyReportForm.yesterdayWork"></el-input>
      </el-form-item>

      <el-form-item label="工作计划" prop="todayPlan">
        <el-input type="textarea" autosize placeholder="请输入今天工作计划" v-model="DailyReportForm.todayPlan"></el-input>
      </el-form-item>

      <el-form-item label="日报日期" prop="date">
        <el-date-picker v-model="DailyReportForm.date" type="date" placeholder="选择日期" :picker-options="DailyReportForm.pickerOptions" ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="success" icon="el-icon-check" @click="submitForm('DailyReportForm')"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('DailyReportForm')"></el-button>
        <el-button type="primary" icon="el-icon-search" @click="showForm('DailyReportForm')"></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="DailyReportShow"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top:20px">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="yestodayPlan"
        label="昨天计划">
      </el-table-column>
      <el-table-column
        prop="yestodayWork"
        label="昨天进展">
      </el-table-column>
      <el-table-column
        prop="todayPlan"
        label="今天计划">
      </el-table-column>
    </el-table>
    <input type="text" v-model="backEndMsg">
    </div>
</template>

<script>
import {DAILYREPORT_SUBMIT_URL, DAILYREPORT_SHOW_URL} from '@/mod/constants'
export default {
  data () {
    return {
      backEndMsg: '',
      DailyReportForm: {
        name: '',
        yesterdayWork: '',
        todayPlan: '',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '明天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }]
        }
      },
      DailyReportShow: [{name: '孙继伟',
        yestodayPlan: '1、和向永一起解决BP0发包问题，问题主要原因是stim没有去掉tesgine头，加上整个测试工程不太稳定，坑比较多<br>.2、SLT预布线，有error，待确认\r\n3、ESPI问题：目前确认为芯片ESPI fifo溢出导致挂死，李松出了降频版本，测试结果还没有反馈 ',
        yestodayWork: '1\n2\n3',
        todayPlan: 10
      }, {
        name: '李梦琪',
        yestodayPlan: '遗留问题，样片板上20,21内环回后，出现大量6466b错误，导致无法通过20,21环回，两个环境都必现，待解决 ',
        yestodayWork: '1\n2\n3\n3',
        todayPlan: 12
      }],
      rules: {
        name: [
          { required: true, message: '怎么不填姓名啊', trigger: 'change' }
        ],
        yesterdayWork: [
          { required: true, message: '又玩了一天么', trigger: 'blur' }
        ],
        todayPlan: [
          { required: true, message: '不要偷懒', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '选择日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(DAILYREPORT_SUBMIT_URL, {
            // name: this.DailyReportForm.name,
            // yesterdayWork: this.DailyReportForm.yesterdayWork,
            // todayPlan: this.DailyReportForm.todayPlan,
            // date: this.DailyReportForm.date
            Form: this.DailyReportForm
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(function (response) {
            console.log(response)
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('Page Error!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    showForm (formName) {
      this.axios.post(DAILYREPORT_SHOW_URL, {
        date: this.DailyReportForm.date
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then(function (response) {
        alert('ddd')
        this.backEndMsg = 'aaaa'
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
