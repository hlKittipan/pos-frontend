import chachangActions from './chachang/actions'
import chachangStates from './chachang/state'
import chachangGetters from './chachang/getters'
import chachangMutations from './chachang/mutations'

import defaultState from './state'
import * as defaultActions from './actions'
import * as defaultMutations from './mutations'
import * as defaultGetters from './getters'

export const state = () => ({
  ...defaultState,
  ...chachangStates.state,
  counter: 0
})

export const mutations = {
  ...defaultMutations,
  ...chachangMutations.mutations,
  increment (state) {
    state.counter++
  }
}

export const actions = {
  ...defaultActions,
  ...chachangActions.actions

}

export const getters = {
  ...defaultGetters,
  ...chachangGetters.getters
}
