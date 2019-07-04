//app.js
App({
  serverUrl:"http://localhost:8081", //本地 s  pringboot的地址和端口
  //serverUrl:"http://192.168.100.225:8081",
  userInfo:null,   //全局的用户信息
  //改为本地缓存 存储用户信息
  setGlobalUserInfo: function(user){
    wx.setStorageSync("userInfo", user);
  },
  getGlobalUserInfo: function (user) {
    return wx.getStorageSync("userInfo");
  }
})