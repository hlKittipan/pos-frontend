// import posActions from './pos/actions'
// import posStates from './pos/state'
// import posGetters from './pos/getters'
// import posMutations from './pos/mutations'

import defaultState from './state'
import * as defaultActions from './actions'
import * as defaultMutations from './mutations'
import * as defaultGetters from './getters'

export const state = () => ({
  ...defaultState,
  // ...posStates.state,
  counter: 0
})

export const mutations = {
  ...defaultMutations,
  // ...posMutations.mutations,
  increment (state) {
    state.counter++
  }
}

export const actions = {
  ...defaultActions,
  // ...posActions.actions

}

export const getters = {
  ...defaultGetters,
  // ...posGetters.getters
}
