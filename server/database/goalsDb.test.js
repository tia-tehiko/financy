/* eslint-disable */

const knex = require('knex')
const config = require('../../knexfile').test
const { saveNewGoal, getAllGoalsByUserId, getGoalById, deleteGoalById } = require('./goalsDb')

const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('saveNewGoal', () => {
  test('adds new goal to database', () => {
    const data = {
      name: "ten pin",
      date: "1999-02-12",
      amount: "$32.00",
      id: 2
    }

    expect.assertions(1)

    return saveNewGoal(data, testDb)
      .then((id) => {
        expect(id[0]).toBe(3)
      })
  })
})

describe('getAllGoalsByUserId', () => {
  test('get all goals by specific id', () => {
    const id = 2
    const expected = {
      'amount': 123,
      'goal_date': '04/03/2021',
      'id': 2,
      'name': 'Buy new golf clubs',
      'user_id': 2
    }

    expect.assertions(1)

    return getAllGoalsByUserId(id, testDb)
      .then((goals) => {
        expect(goals[0]).toEqual(expected)
      })
  })
})

describe('getGoalById', () => {
  test('get a goal by id', () => {
    const id = 1
    const expected = {
      id: 1,
      name: 'Go on a holiday',
      goal_date: '04/03/2021',
      amount: 2330,
      user_id: 1
    }

    expect.assertions(1)

    return getGoalById(id, testDb)
      .then((goal) => expect(goal).toEqual(expected))
  })
})

describe('deleteGoalById', () => {
  test('delete a goal by id', () => {
    const id = 1

    expect.assertions(1)

    return deleteGoalById(id, testDb)
      .then(() => getGoalById(id, testDb))
      .then((actual) => expect(actual).toBeUndefined())
  })
})
