<template>
  <div id="app">
    <page-frame>
      <slot>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </slot>
    </page-frame>
  </div>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue'
export default {
  name: 'App',
  components: {
    PageFrame
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./assets/less/reset.less";
</style>
