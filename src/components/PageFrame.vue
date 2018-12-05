<template>
  <el-container>
  <el-aside width="200px">
    <div class="main-header clearfix" @click="jumpToIndex">
    <i class="logo"></i>
    <h3>MeePo</h3>
    </div>
    <el-menu class="el-menu-vertical">
    <el-submenu v-for="(item, index) in menuList" :index="index.toString()" :key="index" :disabled="menuDisabled">
      <template slot="title">
      <i class="el-icon-menu"></i>
      <span>{{item.title}}</span>
      </template>
      <el-menu-item-group>
      <el-menu-item v-for="(sub,i) in item.subMenu" :index="index+'-'+i" :key="i" @click="jumpToLink(sub.id)">{{sub.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    </el-menu>
  </el-aside>
  <el-main>
    <el-header></el-header>
    <slot></slot>
  </el-main>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
import {ACTION_FETCH_TEMPLATE_INFO, ACTION_RENDER_MENU_ID} from '@/mod/action'
export default {
  data () {
    return {
      menuList: [
        {
          title: '激励',
          subMenu: [
            {
              title: 'CPRI激励',
              id: '1'
            },
            {
              title: 'ETH激励',
              id: '2'
            },
            {
              title: '选项3',
              id: '3'
            }
          ]
        },
        {
          title: '导航二',
          subMenu: [
            {
              title: '选项1',
              router: ''
            },
            {
              title: '选项2',
              router: ''
            },
            {
              title: '选项3',
              router: ''
            }
          ]
        },
        {
          title: '导航三',
          subMenu: [
            {
              title: '选项1',
              router: ''
            },
            {
              title: '选项2',
              router: ''
            },
            {
              title: '选项3',
              router: ''
            }
          ]
        },
        {
          title: '导航四',
          subMenu: [
            {
              title: '选项1',
              router: ''
            },
            {
              title: '选项2',
              router: ''
            },
            {
              title: '选项3',
              router: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo', 'menuDisabled'])
  },
  methods: {
    jumpToLink (id) {
      this.$store.dispatch(ACTION_FETCH_TEMPLATE_INFO, {
        userInfo: this.userInfo,
        templateId: id
      })
      this.$store.dispatch(ACTION_RENDER_MENU_ID, {
        templateId: id
      })
      this.$router.push({
        name: 'form'
      })
    },
    jumpToIndex () {
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  box-shadow: 0 10px 20px -12px rgba(0, 0, 0, 0.42),
    0 4px 25px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;

  .main-header {
    position: relative;
    padding: 8px 0;
    margin: 0 15px;
    z-index: 4;
    display: block;
    font-size: 18px;
    text-align: center;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid hsla(0, 0%, 71%, 0.3);
    cursor: pointer;

    .logo {
      float: left;
      height: 60px;
      width: 70px;
      background: url('../assets/meepo.png') no-repeat;
      background-size: 100%;
    }
    h3 {
      float: left;
      margin-left: 10px;
      height: 60px;
      line-height: 60px;
    }
  }
}
.el-menu {
  border-right: 0;
}
.el-main {
  background-color: #fff;
  color: #333;
  margin-left: 200px;
  padding: 0;
}
.el-header {
  background-color: #fff;
}
</style>
