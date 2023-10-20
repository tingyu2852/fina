<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    
    <sidebar class="sidebar-container" />
    
    <div class="main-container">
      <div class="main-content-head">
        <div class="project-name">
          <span>经开建设项目管理平台</span>
        </div>
        <div class="user-info-wrap">
            <div>用户名：{{ this.$store.state.user.name }}</div>
            <div @click.native="logout" class="exit-login">
              <span>退出登录</span>
            </div>
        </div>
      </div>
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 退出功能实现方法
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .main-content-head{
    display: flex;
    height: 50px;
    align-items: center;
    width: 100%;
    .project-name{
      width: 60%;
      align-items: center;
      padding-left: 12px;
      font-size: 24px;
      letter-spacing: 1px;
      color: #333;
      font-weight: 600;
    }
    .user-info-wrap{
       width: 40%;
       justify-content: right;
       display: flex;
       padding-right: 20px;
       align-items: center;
       .exit-login{
         padding-left: 6px;
         cursor: pointer;
       }
      }
      .exit-login:hover{
         color: green;
       
      }
  }  

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
