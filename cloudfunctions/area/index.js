const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await db.collection('area').limit(100).orderBy('buoy', 'asc').get()
  return res
}