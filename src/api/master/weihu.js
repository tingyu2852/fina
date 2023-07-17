import request from '@/utils/request'
//查询报修列表信息
export const reqBaoXiu = (current,size)=>request({url:`/weihu/baoxiu?current=${current}&size=${size}`,method:'GET'})
//查询房间里设备信息
export const reqRoomEq = room_id=>request({url:`/weihu/eqdetail?room_id=${room_id}`,method:'GET'})
//添加报修单
export const reqAddBx = data=>request({url:'/weihu/addbx',data,method:'POST'})
//处理报修单
export const reqBxCL = data=>request({url:'/weihu/baoxiu',data,method:'POST'})
//删除报修单记录
export const reqDeleteBx = data =>request({url:'/weihu/baoxiu',data,method:'DELETE'})
//查询维修记录
export const reqWxList = (current,size)=>request({url:`/weihu/wx?current=${current}&size=${size}`,method:'GET'})
//添加维修记录
export const reqAddWx = data=>request({url:'/weihu/wx',data,method:'POST'})
//删除维修记录
export const reqDeleteWx = data =>request({url:'/weihu/wx',data,method:'DELETE'})
//筛选维修记录
export const reqSxWX = (current,size,data)=>request({url:`/weihu/wxsx?current=${current}&size=${size}`,data,method:'POST'})