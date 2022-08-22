export const mutations = {
  logIn (state, data) {
 
    this.$cookies.set('dataClient', data)
  },
}