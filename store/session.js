export const mutations = {
  logIn (state, data) {
    console.log(data)
    this.$cookies.set('dataClient', data)
  },
}