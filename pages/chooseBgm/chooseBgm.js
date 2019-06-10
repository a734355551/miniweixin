const app = getApp()

Page({
    data: {
      bgmList:[],
      serverUrl:"",
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    },

    onLoad: function () {
      var me = this;
      var serverUrl = app.serverUrl;
      //添加等待 转圈
      wx.showLoading({
        title: '请等待...',
      });
      wx.request({
        url: serverUrl + '/bgm/list?',
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          //去掉等待
          wx.hideLoading();
          if (res.data.status == 200) {
            var bgmList = res.data.data;
            me.setData({
              bgmList:bgmList,
              serverUrl: serverUrl
            })
          }
        }
      })
    }
})

