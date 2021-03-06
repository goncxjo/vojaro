import universidades from '@/api/modules/universidades'

const state = {
    entity: {
      departamentos: []
    },
    entities: [],
    totalEntities: 0,
    filter: {},
}

const getters = {
    entity: state => state.entity,
    entities: state => state.entities,
    totalEntities: state => state.totalEntities,
    filter: state => state.filter,
}

const actions = {
  load ({ commit }, id) {
    if (id) {
      universidades.get(id)
      .then(r => r.data)
      .then(entity => {
        commit('set', entity)
      })
    } else {
      commit('clean')
    }
  },
  loadCollection ({ commit }) {
    universidades.get()
      .then(r => r.data)
      .then(entities => {
        commit('setCollection', entities)
      })
      .catch(e => {
          console.log(e)
      })
  },
  loadPaginatedCollection ({ commit }, settings) {
    return new Promise((resolve, reject) => {
      universidades.getPaginated(settings)
      .then(r => r.data)
      .then(result => {
        commit('setCollection', result.items)
        commit('setTotalCollection', result.total)
        resolve()
      })
      .catch(err => {
          console.log(err)
          reject(err)
      })
    })
  },
  save ({ }, payload) {
    universidades.save(payload)
      .then(response => response)
      .catch(e => {
          console.log(e)
    })
  },
  delete ({ commit, dispatch }, id) {
    universidades.delete(id)
    .then(response => response)
    commit('clean')
    dispatch('loadCollection')
  },
}

const mutations = {
    set(state, entity) {
      state.entity = entity
    },
    clean(state) {
      state.entity = {
        departamentos: []
      }
    },
    setCollection(state, entities) {
      state.entities = entities
    },
    setTotalCollection(state, total) {
      state.totalEntities = total
    },
    cleanCollection(state) {
      state.entities.length = 0
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
