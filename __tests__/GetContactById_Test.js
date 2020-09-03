import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../components/redux/action'
import * as types from '../components/redux/constant'
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates GET CONTACT BY ID when fetching contact has been done', (id) => {
    fetchMock.getOnce(`/contact/${id}`, {
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_CONTACT },
      { type: types.FETCH_RECEIVE, status: '200'}
    ]
    const store = mockStore([])

    return store.dispatch(actions.getContactById).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})