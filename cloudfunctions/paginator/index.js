// 云函数入口文件
const cloud = require('../paginator2/node_modules/wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let dbName = event.dbName; // 集合名称
  let filter = event.filter ? event.filter : null // 筛选条件
  let pageIndex = event.pageIndex ? event.pageIndex : 1 // 当前第几页，默认为第1页
  let pageSize = event.pageSize ? event.pageSize : 20 // 每页去多少条记录， 默认为20条
  const countResult = await db.collection(dbName).where(filter).count() // 获取集合中的总记录
  const total = countResult.total // 总记录数
  const totalPage = Math.ceil(total / 20) // 计算需要多少页
  let hasMore;
  if(pageIndex > totalPage || pageIndex == totalPage) { // 如果没有数据了，就返回false
    hasMore = false
  } else {
    hasMore = true
  }

  // 最后查询数据并返回给前端
  let res = db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get()
  res.hasMore = hasMore
  return res
}