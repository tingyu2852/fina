import request from '@/utils/request'
//获取贷款信息列表
export const getcredit = (current,size) => request({url:`/caiwu/credit?current=${current}&size=${size}`,method:'GET'})
export const getSelect = (select)=>request({url:`/caiwu/select?select=${select}`,method:'GET'})
//添加或修改贷款信息
export const addCredit = data => request({url:'/caiwu/credit',data,method:'POST'})
//删除贷款信息接口
export const delCredit = delList => request({url:'/caiwu/credit',data:{delList},method:'DELETE'})



//获取还款信息列表
export const getrpy = (current,size) => request({url:`/caiwu/rpy?current=${current}&size=${size}`,method:'GET'})
//添加或修改还款信息
export const addRpy = data => request({url:'/caiwu/rpy',data,method:'POST'})
//删除还款信息接口
export const delRpy = delList => request({url:'/caiwu/rpy',data:{delList},method:'DELETE'})

//获取银行信息列表
export const getBank = (current,size) => request({url:`/caiwu/bank?current=${current}&size=${size}`,method:'GET'})
//添加或修改银行信息
export const addBank = data => request({url:'/caiwu/bank',data,method:'POST'})
//删除银行信息接口
export const delBank = delList => request({url:'/caiwu/bank',data:{delList},method:'DELETE'})

//获取贷款单位信息列表
export const getCorp = (current,size) => request({url:`/caiwu/corp?current=${current}&size=${size}`,method:'GET'})
//添加或修改贷款单位信息
export const addCorp = data => request({url:'/caiwu/corp',data,method:'POST'})
//删除贷款单位信息接口
export const delCorp = delList => request({url:'/caiwu/corp',data:{delList},method:'DELETE'})

//获取贷款单位信息列表
export const getProj = (current,size) => request({url:`/caiwu/proj?current=${current}&size=${size}`,method:'GET'})
//添加或修改贷款单位信息
export const addProj = data => request({url:'/caiwu/proj',data,method:'POST'})
//删除贷款单位信息接口
export const delProj = delList => request({url:'/caiwu/proj',data:{delList},method:'DELETE'})





//获取品种信息列表
export const getFina = (current,size) => request({url:`/caiwu/fina?current=${current}&size=${size}`,method:'GET'})
//添加或修改品种信息
export const addFina = data => request({url:'/caiwu/fina',data,method:'POST'})
//删除品种信息接口
export const delFina = delList => request({url:'/caiwu/fina',data:{delList},method:'DELETE'})

//获取担保方式列表
export const getGuar = (current,size) => request({url:`/caiwu/guar?current=${current}&size=${size}`,method:'GET'})
//添加或修改担保方式
export const addGuar = data => request({url:'/caiwu/guar',data,method:'POST'})
//删除担保方式接口
export const delGuar = delList => request({url:'/caiwu/guar',data:{delList},method:'DELETE'})