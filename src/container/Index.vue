<template>
  <div class="index-page">
    <el-form class="form-wrap" ref="form" :model="form" label-width="80px">
      <el-form-item label="用户姓名">
        <el-select v-model="form.userId" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name+'('+item.id+')'"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-radio-group v-model="form.operate">
          <el-radio label="0">新增模版</el-radio>
          <el-radio label="1">编辑模版</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="已有编号">
        <el-input v-model="form.caseNumber"></el-input>
      </el-form-item>
      <el-form-item label="新增编号" v-show="operate == '0'">
        <el-input v-model="form.caseNumberNew"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {ACTION_FETCH_USER_INFO, ACTION_CHANGE_MENU_STATUS} from '@/mod/action'
export default {
  name: 'index',
  components: {},
  data () {
    return {
      operate: '0',
      userList: [{
        id: 123,
        name: '孙继炜'
      }, {
        id: 1234,
        name: '李孟奇'
      }],
      form: {
        userId: '',
        operate: '0',
        caseNumber: '',
        caseNumberNew: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    onSubmit () {
      this.$store.dispatch(ACTION_FETCH_USER_INFO, {
        userInfo: this.form
      })
      this.$store.dispatch(ACTION_CHANGE_MENU_STATUS, {
        menuDisabled: false
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .index-page {

    .form-wrap {
      width: 400px;
      margin: 20px auto 0;
    }
  }
</style>
