<template>
  <div class="form-page">
    <el-form class="form-wrap" label-width="80px">
      <div v-for="(templateItem,index) in templateInfo" :key="index">
        <div class="form-item">
          <el-form-item label="端口号">
            <el-select v-model="templateItem.port" placeholder="请选择">
              <el-option
                v-for="item in templateItem.portNum"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开关">
            <el-switch v-model="templateItem.status" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
        </div>
        <el-form-item v-for="(item,index) in templateItem.formList" :label="item.title" :key="index" :class="{'spe-form-item':item.type=='port'}">
          <el-input class="default-input" v-model="item.value" v-if="item.type=='input'"></el-input>
          <el-input-number v-model="item.value" v-if="item.type=='number'"></el-input-number>
          <el-select v-model="item.value" placeholder="请选择" v-if="item.type=='select'">
            <el-option
              v-for="item in item.listValue"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item class="spe-form-item">
        <el-button type="primary" v-on:click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {SUBMIT_TAMPLATE_INFO_URL} from '@/mod/constants'
export default {
  name: 'sepForm',
  data () {
    return {}
  },
  computed: {
    ...mapState(['templateInfo'])
  },
  methods: {
    onSubmit: function () {
      this.axios.get(SUBMIT_TAMPLATE_INFO_URL, {
        params: {
          // templateInfo: JSON.stringify(this.templateInfo)
          templateInfo: this.templateInfo
        }
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .form-page {
    margin: 0 20px;

    .form-wrap {
      margin: 20px auto 0;
    }

    .form-item {
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .default-input {
      width: 200px;
    }

    .el-form-item {
      display: inline-block;
      width: 30%;
      margin-right: 2%;
    }

    .spe-form-item {
      display: block;
      width: 100%;
    }
  }
</style>
