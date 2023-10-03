import request from '@/utils/request'


export const getProj =(current,size)=> request({url:`/fina/proj?current=${current}&size=${size}`,method:'GET'})

export const addProj = (name,projForm)=>request({url:`/fina/proj?name=${name}`,data:projForm,method:'POST'})
//查询一些select表用到的数据
export const getSelect=(name)=>request({url:`/fina/select?name=${name}`,method:'GET'})

//通过name和id查询详细信息
export const getInfo=(name,id)=>request({url:`/fina/info?name=${name}&id=${id}`,method:'GET'})
//修改或添加批复信息
export const addRep=(data)=>request({url:'/fina/rep',data,method:'POST'})
//进入详情页面的时候获取借款信息列表
export const getLoanList = proj_id => request({url:`/fina/loanlist?proj_id=${proj_id}`,method:'GET'})
//新增或修改融资信息接口
export const addCost=(data)=>request({url:'/fina/cost',data,method:'POST'})
//删除融资信息接口
export const delCost=(data)=>request({url:'/fina/cost',data,method:'DELETE'})

//新增或修改担保人信息接口
export const addBond=(data)=>request({url:'/fina/bond',data,method:'POST'})
//删除担保人信息接口
export const delBond=(data)=>request({url:'/fina/bond',data,method:'DELETE'})

//新增或修改担保人信息接口
export const addPawn=(data)=>request({url:'/fina/pawn',data,method:'POST'})
//删除担保人信息接口
export const delPawn=(data)=>request({url:'/fina/pawn',data,method:'DELETE'})


export const getMt=(proj_id)=>request({url:`/fina/mt?proj_id=${proj_id}`,method:'GET'})

export const addMt=(data)=>request({url:'/fina/mt',data,method:'POST'})

export const delMt=(data)=>request({url:'/fina/mt',data,method:'DELETE'})


//获取借款信息接口
export const getLoan=(loan_id)=>request({url:`/fina/loan?loan_id=${loan_id}`,method:'GET'})

//添加或修改借款信息
export const addLoan=(data)=>request({url:'/fina/loan',data,method:'POST'})
export const delLoan=(data)=>request({url:'/fina/loan',data,method:'DELETE'})

//获取走款信息列表
export const getSp=(mt_id)=>request({url:`/fina/sp?mt_id=${mt_id}`,method:'GET'})

export const addSp=(data)=>request({url:`/fina/sp`,data,method:'POST'})
export const delSp=(data)=>request({url:`/fina/sp`,data,method:'DELETE'})


export const addInter=(loan_id,data)=>request({url:`/fina/interest?loan_id=${loan_id}`,data,method:'POST'})
export const getInter=(loan_id,current,size)=>request({url:`/fina/interest?loan_id=${loan_id}&current=${current}&size=${size}`,method:'GET'})

export const addRepay=(loan_id,data)=>request({url:`/fina/repay?loan_id=${loan_id}`,data,method:'POST'})
export const getRepay=(loan_id,current,size)=>request({url:`/fina/repay?loan_id=${loan_id}&current=${current}&size=${size}`,method:'GET'})

export const delRepay=(data)=>request({url:`/fina/repay`,data,method:'DELETE'})


export const addRepayment=(data)=>request({url:'/fina/repayment',data,method:'POST'})



export const updateInter=(loan_id)=>request({url:`/fina/update?loan_id=${loan_id}`,method:'GET'})


export const getPlan=(loan_id,current,size)=>request({url:`/fina/plan?loan_id=${loan_id}&current=${current}&size=${size}`,method:'GET'})

export const updatePlan=(planName,data)=>request({url:`/fina/plan?planName=${planName}`,data,method:'POST'})

export const delPlan=(data)=>request({url:`/fina/plan`,data,method:'DELETE'})


export const addMatch = (data)=>request({url:'/fina/match',data,method:'POST'})
export const getMatch = (mt_id)=>request({url:`/fina/match?mt_id=${mt_id}`,method:'GET'})
export const delMatch = (data)=>request({url:'/fina/match',data,method:'DELETE'})


export const getBasics = (rep_id)=>request({url:`/fina/basics?rep_id=${rep_id}`,method:'GET'})