const {query} = require('./common')
// 获取全部用户的投票
let selectVotesList = function () {
  let _sql = `SELECT 
  id,
  user_id,
  title,
  start_at,
  end_at,
  description,
  type,
  is_public,
  max_choose,
  has_pic,
  created_at,
  updated_at 
  FROM projects`
  return query(_sql)
}
let selectVoteByTitle = function (title) {
  let _sql = `SELECT id FROM projects WHERE title="${title}"`
  return query(_sql)
}
let selectVoteById = function (id) {
  let _sql = `SELECT id,title,start_at,end_at FROM projects WHERE user_id="${id}"`
  return query(_sql)
}
let selectVoteDetail = function (projectId, password) {
  let _sql = `SELECT problems.* FROM problems
  INNER JOIN projects ON problems.project_id=projects.id
  WHERE project_id="${projectId}" AND password `
  // 这里是因为默认状态下 password 为 NULL
  if (password === null) {
    _sql += `IS NULL`
  } else {
    _sql += `="${password}"`
  }
  return query(_sql)
}

// 创建投票
let insertVote = function (value) {
  let _sql = 'INSERT INTO projects SET ?'
  return query(_sql, value)
}
// 创建投票提目
let insertDetail = function (value) {
  let _sql = 'INSERT INTO problems SET ?'
  return query(_sql, value)
}
let selectDetailId = function (id) {
  let _sql = `SELECT id FROM problems WHERE project_id="${id}"`
  return query(_sql, id)
}
// 参与投票
let updateDetail = function ({project_id, option_id}) {
  let _sql = `UPDATE problems SET count=count+1 WHERE 
  project_id="${project_id}" AND id="${option_id}"`
  query(_sql, {project_id, option_id})
}
// 获取投票详情
let selectVoteCount = function (id) {
  let _sql = `SELECT 
  problems.id, problems.title,problems.count,problems.created_at,problems.updated_at 
  FROM problems LEFT JOIN projects ON problems.project_id=projects.id WHERE project_id="${id}"`
  return query(_sql, id)
}
module.exports = {
  selectVoteByTitle,
  selectVoteById,
  selectVotesList,
  selectVoteDetail,
  insertDetail,
  selectDetailId,
  insertVote,
  updateDetail,
  selectVoteCount
}
