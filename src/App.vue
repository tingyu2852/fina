<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  .custom-line{
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 设置只显示一行 */
    -webkit-box-orient: vertical;
    white-space: nowrap; /* 防止内容换行 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis !important; /* 使用省略号显示超出部分 */
  }

  .el-tooltip__popper {
     max-width: 250px;
  }
  /* 表头字体颜色设置 */
  .active-header{
    color: #333;
    text-align: center;
    background: #eef1f6 !important;
  }
  .active-contnet{
    height: 15px !important;
  }
  .el-table_row{
    height: 10px;
  }

  /* 自定义菜单 */
  .custom-btn-wrap{
    display: flex;
  }
  /* 添加按钮 */
  .add-custom-btn{
    border: 1px solid #409eff;
    padding: 5px;
    color: #409eff;
    border-radius: 3px;
    margin-right: 16px;
    cursor: pointer;
  }
  .add-custom-btn:hover{
    /* border: 1px solid 409eff; */
    color: #fff;
    background: #409eff;;
  }
  /* 删除按钮 */
  .delete-custom-btn{
    cursor: pointer;
    border: 1px solid red;
    padding: 5px;
    color: red;
    border-radius: 3px;
  }
  .delete-custom-btn:hover{
    color: #fff;
    background: red
  }
  /* table内slot插槽内容居中 */
  .table-content-right{
    text-align: right;
    width: 100%;
  }
  

  /* 自定义表格内的菜单样式 */
  .custom-table-btn-wrap{
    display: flex;
    justify-content: center;
  }
  /* 编辑按钮 */
  .edit-custom-table-btn{
    color: #409eff;
    border-radius: 3px;
    margin-right: 16px;
    cursor: pointer;
  }
  /* 删除按钮 */
  .delete-custom-table-btn{
    cursor: pointer;
    color: red;
    border-radius: 3px;
  }
  

</style>