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

  /* 主内容 */
  .content-wrap{
    width: 98%; 
    height: 600px; 
    margin: 20px auto
  }

  /* 设置表单内容靠右对齐 */
  .el-form-item__label{
    text-align: right;
  }

  /* 自定义水平分割线 */
  .custom-horizontal-line{
    width: 100%;
    height: 1px;
    background: #eef1f6;
  }

  /* ******************************dialog 弹框样式*********************************** */
  /* dialog 弹框样式 */
  .el-dialog__header{
    background: #edf2f8 !important;
  }
  .el-dialog__title{
    /* font-family: 'STFangsong'; */
    letter-spacing: 1px;
    font-weight: 600;
  }
  .el-dialog__body{
    padding: 0 !important;
  }
  .custom-dialog-body{
    width: 80%; 
    margin: auto;
    margin-top: 20px;
  }
  /* 有表格的 */
  .custom-dialog-table-body{
    width: 95%; 
    margin: auto;
    margin-top: 20px;
    padding-bottom: 40px;
  }
  .dialog-footer{
    padding-top: 12px !important;
  }

/* ******************************自定义表格样式*********************************** */
  .el-tooltip__popper {
     max-width: 250px;
  }
  /* 表头字体颜色设置 */
  .active-header{
    color: #333;
    text-align: center;
    background: #eef1f6 !important;
    /* height: 30px !important; */
  }
  .active-contnet{
    height: 15px !important;
  }
  .el-table_row{
    height: 10px;
  }

  /* ******************************自定义菜单*********************************** */
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
    font-size: 14px;
  }
  .add-custom-btn:hover{
    /* border: 1px solid 409eff; */
    color: #fff;
    background: #409eff;;
  }
  /* 删除按钮 */
  .delete-custom-btn{
    font-size: 14px;
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
  
  /* ******************************自定义表格内的菜单样式*********************************** */
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
  /* 保存按钮 */
  .save-custom-table-btn{
    color: #409eff;
    border-radius: 3px;
    margin-right: 16px;
    cursor: pointer;
  }
  /* 取消按钮 */
  .cancle-custom-table-btn{
    cursor: pointer;
    color: rgb(160, 158, 158);
    border-radius: 3px;
    margin-right: 16px;
  }

  /* ******************************自定义弹框菜单里的样式*********************************** */
  /* 自定义弹框菜单里的样式 */
  .custom-dialog-btn-wrap{
    display: flex;
    justify-content: right;
    padding-top: 12px !important;
  }
  /* 保存按钮 */
  .save-custom-dialog-btn{
    border-radius: 3px;
    margin-right: 16px;
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    color: #fff;
    background: #57a9fa;;
  }
  .save-custom-dialog-btn:hover{
    background: #2f94f8;;
  }
  /* 取消按钮 */
  .cancel-custom-dialog-btn{
    border-radius: 3px;
    margin-right: 16px;
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    color: #fff;
    background: rgb(180, 179, 179);;
  }
  .cancel-custom-dialog-btn:hover{
    background: rgb(139, 139, 139);;
  }

</style>