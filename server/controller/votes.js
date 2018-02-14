'use strict'
const voteModel = require('../model/vote')
const ERROR = require('../utils/errorMap')

class VotesController {
  /**
   * @api {post} /votes/create Create Vote
   * @apiName Create Vote
   * @apiGroup Vote
   * @apiParam {String} title Vote title
   * @apiParam {Number} type Vote type,0: single,1: muti
   * @apiParam {Boolean} isPublic Vote public status
   * @apiParam {String} password Vote password only need to submit when the isPublic is false
   * @apiSuccessExample Success-Response:
   *{"code":0,
   * "data":{}}
   * @apiErrorExample User-Exist:
   * {"code":2002,"data":[],"message":"user exist"}
   */
  static async create(ctx) {
    const {body: {title, startAt, endAt, isPublic, type, password, max, options}} = ctx.request
    const isExist = await voteModel.selectVoteByTitle(title)
    if (isExist && isExist.length) {
      throw ERROR.VOTES.EXIST
    }
    const insertRes = await voteModel.insertVote({
      title,
      start_at: new Date(startAt).getTime(),
      created_at: new Date(),
      description: 'this is the test vote',
      end_at: new Date(endAt).getTime(),
      is_public: +isPublic,
      user_id: ctx.state.user.id,
      type,
      password,
      max_choose: max,
      has_pic: 0
    })
    let [{id}] = await voteModel.selectVoteByTitle(title)
    let insertDetailArr = []
    options.forEach(async (item, index) => {
      insertDetailArr[index] = await voteModel.insertDetail(
        Object.assign({}, {title: item.value}, {project_id: id}))
    })
    if (insertRes && insertRes.insertId) {
      ctx.body = {
        state: true,
        message: "创建成功"
      }
    }
  }

  /**
   * @api {get} /votes/list Vote List
   * @apiName Vote List
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup Vote
   */
  static async list(ctx) {
    ctx.body = await voteModel.selectVotesList()
  }

  /**
   * @api {get} /votes/detail/:id Vote Detail
   * @apiName Vote Detail
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup Vote
   * @apiParam {Number} Vote id
   */
  static async detail(ctx) {
    const {params, query: {password = null}} = ctx
    const detail = await voteModel.selectVoteDetail(params.id, password)
    // const {id, title, update_at, create_at} = detail
    if (!detail || detail.length === 0) {
      throw ERROR.VOTES.PASSWORD_ERROR
    }
    ctx.body = detail
  }

  /**
   * @api {get} /votes/detail/:id Vote Detail
   * @apiName Vote Detail
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup Vote
   * @apiParam {Number} Vote id
   */
  static async delete(ctx) {
    ctx.body = {message: "mock api"}
  }

  /**
   * @api {post} /votes/part/:id Vote Part
   * @apiName Vote Part
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup Vote
   * @apiParam {Number} Vote id
   * @apiParam {Number} Vote options
   */
  static async part(ctx) {
    const {params, request: {body: {options}}} = ctx
    try {
      const [{id}] = await voteModel.selectDetailId(params.id)
      for (let i of options) {
        await voteModel.updateDetail({project_id: params.id, option_id: i + id})
      }
      ctx.body = {data: 0, message: "投票成功"}
    } catch (e) {
      throw e
    }
  }

  /**
   * @api {post} /votes/own/:id Own Vote
   * @apiName Own Vote
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup Vote
   * @apiParam {Number} User Id
   */
  static async own(ctx) {
    const {params: {id}} = ctx
    const data = await voteModel.selectVoteById(id)
    ctx.body = data
  }

  /**
   * @api {post} /votes/statistic/:id Vote Statistic
   * @apiName Vote Statistic
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup Vote
   * @apiParam {Number} Vote Id
   */
  static async statistic(ctx) {
    const {params: {id}} = ctx
    const data = await voteModel.selectVoteCount(id)
    ctx.body = data
  }
}

module.exports = VotesController
