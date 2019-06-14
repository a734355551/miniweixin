const app = getApp()

Page({
  data: {
    //分页相关属性
    totalPage:1,
    page:1,
    videoList:[],
    //展示图片
    serverUrl:"",
    screenWidth: 350,
  },

  onLoad: function (params) {
    var me = this;
    //获取信息的同步接口  获取到手机屏幕的宽度
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth : screenWidth,
    });
   
   //获取当前的分页数
    var page = me.data.page;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待，加载中。。。',
    });

    wx.request({
      url: serverUrl + '/video/showAll?page=' + page,
      method:"post",
      success:function(res){
          wx.hideLoading();
          console.log(res.data);
          //判断当前页page 是否是第一页 如果是第一页 ，那么设置videoList为空
          if(page == 1){
            me.setData({
              videoList:[]
            })
          }
          var videoList = res.data.data.rows; //后端拿的
          var newVideoList = me.data.videoList; //现有得
          me.setData({
            videoList: newVideoList.concat(videoList),//拼接两个list
            page:page,
            totalPage:res.data.data.total,
            serverUrl:serverUrl
          });

      }
    })

  }
})
