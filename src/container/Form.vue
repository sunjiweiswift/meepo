<template>
  <div class="form-page">
    <el-form class="form-wrap" label-width="80px" size="small">
      <div v-for="(templateItem,templateIndex) in templateInfo" :key="templateIndex">
        <div class="form-item">
          <div class="form-item-operate">
          <el-form-item :label= "templateItem.portName">
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
          <el-form-item label="模块" class="auto-form-item">
            <el-select v-model="templateItem.models" value-key="key" multiple placeholder="请选择">
              <el-option
                v-for="item in templateItem.modelList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作" class="auto-form-item">
            <el-input class="small-input" v-model="templateNumber"></el-input>
            <el-button type="primary" icon="el-icon-plus" v-on:click="addWrap('port', templateIndex)"></el-button>
            <el-button type="primary" icon="el-icon-delete" v-on:click="deleteWrap('port', templateIndex)" v-if="templateIndex!=0"></el-button>
          </el-form-item>
          </div>
          <el-form-item v-for="(normalItem,normalIndex) in templateItem.formList" :label="normalItem.title" :key="normalIndex">
            <el-input class="default-input" v-model="normalItem.value" v-if="normalItem.type=='input'"></el-input>
            <el-input-number class="default-number" v-model="normalItem.value" v-if="normalItem.type=='number'"></el-input-number>
            <el-select class="default-select" v-model="normalItem.value" multiple placeholder="请选择" v-if="normalItem.type=='selectmul'">
              <el-option
                v-for="item in normalItem.listValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
            <el-select class="default-select" v-model="normalItem.value" placeholder="请选择" v-if="normalItem.type=='select'">
              <el-option
                v-for="item in normalItem.listValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="wrap-block" v-for="(wrap, wrapIndex) in templateItem.wrapList" :key="wrapIndex" v-show="templateItem.models.indexOf(wrap.key) != -1">
          <h3 class="wrap-title">{{wrap.title}}</h3>
          <div class="common-form-item">
          <el-form-item v-for="(normalItem0,normalIndex0) in wrap.formList" :label="normalItem0.title" :key="normalIndex0+'new'">
            <el-input class="default-input" v-model="normalItem0.value" v-if="normalItem0.type=='input'"></el-input>
            <el-input-number class="default-number" v-model="normalItem0.value" v-if="normalItem0.type=='number'"></el-input-number>
            <el-select class="default-select" v-model="normalItem0.value" placeholder="请选择" v-if="normalItem0.type=='select'">
              <el-option
                v-for="item0 in normalItem0.listValue"
                :key="item0.key"
                :label="item0.value"
                :value="item0.key">
              </el-option>
            </el-select>
            <el-switch v-model="normalItem0.value" active-value="1" inactive-value="0" v-if="normalItem0.type=='switch'"></el-switch>
          </el-form-item>
          </div>
          <div class="wrap-item clearfix" v-for="(wrapItem,index) in wrap.value" :key="index">
            <div class="wrap-index">{{index}}</div>
            <div class="wrap-content">
            <el-form-item v-for="(normalItem,normalIndex1) in wrapItem" :label="normalItem.title" :key="normalIndex1">
              <el-input class="default-input" v-model="normalItem.value" v-if="normalItem.type=='input'"></el-input>
              <el-input-number class="default-number" v-model="normalItem.value" v-if="normalItem.type=='number'"></el-input-number>
              <el-select class="default-select" v-model="normalItem.value" placeholder="请选择" v-if="normalItem.type=='select'">
                <el-option
                  v-for="item1 in normalItem.listValue"
                  :key="item1.key"
                  :label="item1.value"
                  :value="item1.key">
                </el-option>
              </el-select>
              <el-switch v-model="normalItem.value" active-value="1" inactive-value="0" v-if="normalItem.type=='switch'"></el-switch>
            </el-form-item>
            <el-form-item label="操作" class="auto-form-item">
                <el-input class="small-input" v-model="templateNumber"></el-input>
                <el-button type="primary" icon="el-icon-plus" v-on:click="addWrap('flow', templateIndex, index, wrap.key)"></el-button>
                <el-button type="primary" icon="el-icon-delete" v-on:click="deleteWrap('flow', templateIndex, index, wrap.key)" v-if="index!=0"></el-button>
              </el-form-item>
            </div>
            </div>
        </div>
      </div>
      <el-form-item class="spe-form-item">
        <el-button class="submit-btn" type="primary" v-on:click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {SUBMIT_TAMPLATE_INFO_URL} from '@/mod/constants'
import {ACTION_ADD_TEMPLATE_INFO, ACTION_DELETE_TEMPLATE_INFO} from '@/mod/action'
export default {
  name: 'sepForm',
  data () {
    return {
      templateNumber: 1
    }
  },
  computed: {
    ...mapState(['templateInfo', 'userInfo', 'templateId'])
  },
  methods: {
    addWrap (type, templateIndex, index, key) {
      this.$store.dispatch(ACTION_ADD_TEMPLATE_INFO, {
        type,
        templateIndex,
        index: index || 0,
        key: key || '',
        templateNumber: this.templateNumber
      })
      this.templateNumber = 1
    },
    deleteWrap (type, templateIndex, index, key) {
      this.$store.dispatch(ACTION_DELETE_TEMPLATE_INFO, {
        type,
        templateIndex,
        index,
        key
      })
    },
    onSubmit () {
      this.axios.post(SUBMIT_TAMPLATE_INFO_URL, JSON.stringify({
        // params: {
        userInfo: this.userInfo,
        templateId: this.templateId,
        templateInfo: this.templateInfo
        // }
      }), {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
          'Content-Type': 'application/json'
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

    .default-input, .default-number,.default-select {
      width: 100px;
    }

    .small-input {
      width: 50px;
      vertical-align: middle;
    }

    .el-form-item {
      display: inline-block;
      width: 180px;
      margin: 0 10px 10px 0;
    }

    .spe-form-item {
      display: block;
      width: 100%;
    }

    .auto-form-item {
      width: auto;
    }

    .submit-btn {
      margin-top: 20px;
    }

    .wrap-title {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      margin: 0 20px 20px;
      padding: 0 10px;
    }

    .wrap-block {
      background: #fafafa;
      border: 1px solid #eee;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
    }

    .form-item-operate, .common-form-item {
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }

    .wrap-index {
      float: left;
      width: 4%;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }

    .wrap-content {
      float: right;
      width: 96%;
    }
  }
</style>
