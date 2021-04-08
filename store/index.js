import chachangActions from './chachang/actions'
import chachangStates from './chachang/state'
import chachangGetters from './chachang/getters'
import chachangMutations from './chachang/mutations'

export const state = () => ({
  ...chachangStates.state,
  counter: 0
})

export const mutations = {
  ...chachangMutations.mutations,
  increment (state) {
    state.counter++
  }
}

export const actions = {
  ...chachangActions.actions
}

export const getters = {
  ...chachangGetters.getters
}
