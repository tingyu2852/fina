<template>
    <div class="content-wrap">
      <el-card style="margin: 0 auto">
        <!-- 步骤条 -->
        <el-steps :active="activeStatus" simple>
            <el-step class="custom-step" @click.native="handleStepClick(0)" title="基础信息" icon="el-icon-edit"></el-step>
            <el-step class="custom-step" @click.native="handleStepClick(1)" title="批复信息" icon="el-icon-upload"></el-step>
            <el-step class="custom-step" @click.native="handleStepClick(2)" title="其他信息" icon="el-icon-picture"></el-step>
            <el-step class="custom-step" @click.native="handleStepClick(3)" title="借款信息" icon="el-icon-picture"></el-step>
            <el-step class="custom-step" @click.native="handleStepClick(4)" title="下款信息" icon="el-icon-picture"></el-step>
            <el-step class="custom-step" @click.native="handleStepClick(5)" title="走款信息" icon="el-icon-picture"></el-step>
        </el-steps>

        <!-- 项目内容 -->
        <div class="project-content-wrap">
           <projInfo></projInfo>
        </div>

      </el-card>
    </div>
  </template>
  
  <script>
  import projInfo from "../projInfo.vue";
  export default {
    components: {
        projInfo
    },
    data() {
      return {
        activeStatus: 0
      };
    },
    watch: {
      
    },
    computed: {
     
    },
    mounted() {
      
    },
    methods: {
      handleStepClick(index){
        this.activeStatus = index;
      }
    },
  };
  </script>
  
  <style scoped>
   .custom-step{
     cursor: pointer;
   }
   .project-content-wrap{
      width: 100%;
      margin-top: 12px;
   }

  .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
</style>