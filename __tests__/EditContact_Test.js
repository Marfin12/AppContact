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

  it('creates EDIT CONTACT when fetching contact has been done', (id) => {
    fetchMock.getOnce(`/contact/${id}`, {
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_CONTACT },
      { type: types.FETCH_RECEIVE, body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        age: age,
        photo: photo
      }), status:'201'}
    ]
    const store = mockStore({
      id: '', 
      firstName: '',
      lastName: '',
      age: '',
      photo: '' 
    })

    return store.dispatch(actions.editContact).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})