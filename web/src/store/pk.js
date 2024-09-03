
export default ({
  state: {
    status:"matching",//matching表示匹配界面，playing表示对战界面
    socket: null,
    opponent_username:'',
    opponent_photo:'',
    gamemap:null,
  },
  getters: {
  },
  mutations: {
    updateSocket(state,socket){
        state.socket = socket;
    },
    updateStatus(state,status){
        state.status = status;
    },
    updateOpponent(state,opponent){
        state.opponent_username = opponent.username;
        state.opponent_photo = opponent.photo;
    },
    updateGamemap(state,gamemap){
        state.gamemap = gamemap;
    }
  },
  actions: {
  },
  modules: {
  }
})