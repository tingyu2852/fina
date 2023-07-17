import request from '@/utils/request'
//添加unit信息接口
export const reqAddUnit = data => request({url:'/unit/add',data,method:'POST'})
//删除unit信息接口
export const reqDeleteUnit = data => request({url:'/unit/add',data,method:'DELETE'})
//获取建筑信息接口
export const reqBuild = ()=> request({url:'/unit/build',method:'GET'})
//添加或修改建筑信息接口
export const reqAddBuild = data => request({url:'/unit/build',data,method:'POST'})
//删除建筑信息接口
export const reqDeleteBuild = data => request({url:'/unit/build',data,method:'DELETE'})
//查询房间信息接口
export const reqRoom = (current,size) => request({url:`/unit/room?current=${current}&size=${size}`,method:'GET'})
//添加或修改房间信息接口
export const reqAddroom = data => request({url:'/unit/room',data,method:'POST'})
//删除房间信息接口
export const reqDeleteRoom = data => request({url:'/unit/room',data,method:'DELETE'})