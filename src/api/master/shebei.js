import request from '@/utils/request'
//获取维修列表
export const reqweixiuList = (page,size)=>request({url:`/shebei/wxlist?page=${page}&size=${size}`,method:'GET'})
//添加维修记录
export const reqAddweixiu = (data)=>request({url:'/shebei/addwx',method:'POST',data})
//修改维修记录
export const reqUpdateWeixiu = (data)=> request({url:'/shebei/wxlist',method:'POST',data})
//删除维修记录
export const reqDeleteWeixiu = id=>request({url:`/shebei/wxlist?id=${id}`,method:'DELETE'})
//增加设备分类
export const reqAddCate = data=>request({url:'/shebei/cate',data,method:'POST'})
//查询设备分类
export const reqGetCate = (page,size=5)=>request({url:`/shebei/cate?page=${page}&size=${size}`,method:'GET'})
//删除设备分类
export const reqDeleteCate = id=>request({url:`/shebei/cate?id=${id}`,method:'DELETE'})
//查询单位列表
export const reqSchoolList = ()=>request({url:'/shebei/select',method:'GET'})
//查询建筑列表
export const reqBuildingList = schoolId =>request({url:`/shebei/select?schoolId=${schoolId}`,method:'GET'})
//查询房间列表
export const reqRoomList = buildingId =>request({url:`/shebei/select?buildingId=${buildingId}`,method:'GET'})
//查询设备分类列表
export const reqCateList = ()=>request({url:'/shebei/eqcate',method:'GET'})
//查询设备型号列表
export const reqEqList = cateid => request({url:`/shebei/selecteq?cateId=${cateid}`,method:'GET'})
//查询设备详细信息
export const reqEqDetail = (data)=> request({url:`/shebei/eqdetail?current=${data.current}&size=${data.size}&pxname=${data.pxname}&pxfs=${data.pxfs}`,method:'GET'})
//查询部门列表
export const reDeparment = ()=>request({url:'/shebei/department',method:'GET'})
//新增或修改设备详细信息
export const reqAddEqdetail = data=>request({url:'/shebei/eqdetail',data,method:'POST'})
//删除设备详细信息
export const reqDeleteEqdetail = data =>request({url:'/shebei/eqdetail',data,method:'DELETE'})
//查询设备信息
export const reqEqInfo = (current,size)=>request({url:`/shebei/eqinfo?current=${current}&size=${size}`,method:'GET'})
//查询厂商列与供货商列表
export const reqCj = ()=>request({url:'/shebei/cj',method:'GET'})
//添加设备信息
export const reqAddEqInfo=data=>request({url:'/shebei/eqinfo',data,method:'POST'})
//删除设备信息
export const reqDelEqInfo=data=>request({url:'/shebei/eqinfo',data,method:'DELETE'})
//供货商查询接口
export const reqsupplier = ()=>request({url:'/shebei/supplier',method:'GET'})
//供货商添加接口
export const reqADDsupplier = (data)=>request({url:'/shebei/supplier',data,method:'POST'})
//供货商删除接口
export const reqDeleteSupplier = supplier_id => request({url:'/shebei/supplier',data:{supplier_id},method:'DELETE'})
//厂商查询接口
export const reqVendor = ()=>request({url:'/shebei/vendor',method:'GET'})
//厂商修改或添加接口
export const reqAddVendor = data=>request({url:'/shebei/vendor',data,method:'POST'})
//厂商删除接口
export const reqDeleteVendor = vendor_id => request({url:'/shebei/vendor',data:{vendor_id},method:'DELETE'})
//设备详细信息筛选接口
export const reqSxEqdetail = data => request({url:`/shebei/sxeq?current=${data.current}&size=${data.size}&sxname=${data.sxname}&sxtj=${data.sxtj}&pxname=${data.pxname}&pxfs=${data.pxfs}`,method:'GET'})
