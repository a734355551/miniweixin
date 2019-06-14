const app = getApp()

Page({
  data: {
    screenWidth: 350,
  },

  onLoad: function (params) {
    var me = this;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    var newVideoList = me.data.videoList;

    me.setData({
      screenWidth : screenWidth,
    });
  }
})
