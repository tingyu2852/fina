import request from '@/utils/request'
//基础信息接口
export const getProj = proj_id => request({url:`/enter/proj?proj_id=${proj_id}`,method:'GET'})

export const addProj = data => request({url:'/enter/proj',data,method:'POST'})
//批复信息接口
export const getRep = proj_id => request({url:`/enter/rep?proj_id=${proj_id}`,method:'GET'})

export const addRep = data => request({url:'/enter/rep',data,method:'POST'})
//其他信息接口
export const getOther = proj_id =>request({url:`/enter/other?proj_id=${proj_id}`,method:"GET"})
//新增或修改融资信息接口
export const addCost=(data)=>request({url:'/enter/cost',data,method:'POST'})
//删除融资信息接口
export const delCost=(data)=>request({url:'/enter/cost',data,method:'DELETE'})

//新增或修改担保人信息接口
export const addBond=(data)=>request({url:'/enter/bond',data,method:'POST'})
//删除担保人信息接口
export const delBond=(data)=>request({url:'/enter/bond',data,method:'DELETE'})

//新增或修改担保人信息接口
export const addPawn=(data)=>request({url:'/enter/pawn',data,method:'POST'})
//删除担保人信息接口
export const delPawn=(data)=>request({url:'/enter/pawn',data,method:'DELETE'})

//获取借款信息接口
export const getLoan = (proj_id)=>request({url:`/enter/loan?proj_id=${proj_id}`,method:'GET'})

export const addLoan = (data)=>request({url:'/enter/loan',data,method:'POST'})
//获取下款信息接口
export const getMt = (loan_id)=>request({url:`/enter/mt?loan_id=${loan_id}`,method:'GET'})

export const addMt = (data)=>request({url:'/enter/mt',data,method:'POST'})

//获取走款信息接口
export const getSp = (mt_id)=>request({url:`/enter/sp?mt_id=${mt_id}`,method:'GET'})

//点击下一步发送请求保存项目录入阶段
export const getNext = (name,id,proj_id)=>request({url:`/enter/next?id=${id}&name=${name}&proj_id=${proj_id}`,method:'GET'})

