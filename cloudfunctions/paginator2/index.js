// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let dbName = event.dbName; // 集合名称
  let filter = event.filter ? event.filter : null // 筛选条件
  let start = event.start ? event.start : 0 // 从第几条开始获取，默认为第0条
  let count = event.count ? event.count : 20 // 每次获取多少条， 默认为20条
  const countResult = await db.collection(dbName).where(filter).count() // 获取集合中的总记录
  const total = countResult.total // 总记录数
  let hasMore;
  if(start > total || start == total) { // 如果没有数据了，就返回false
    hasMore = false
  } else {
    hasMore = true
  }

  // 最后查询数据并返回给前端
  let res = db.collection(dbName).where(filter).skip(start).limit(count).get()
  res.hasMore = hasMore
  return res
}