import request from '@/utils/request'
//基础信息接口
export const getProj = proj_id => request({url:`/enter/proj?proj_id=${proj_id}`,method:'GET'})

export const addProj = data => request({url:'/enter/proj',data,method:'POST'})
//批复信息接口
export const getRep = proj_id => request({url:`/enter/rep?proj_id=${proj_id}`,method:'GET'})

export const addRep = data => request({url:'/enter/rep',data,method:'POST'})