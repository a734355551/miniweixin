const app = getApp()

Page({
    data: {
      bgmList:[],
      serverUrl:"",
      videoParams:{}
    },

    onLoad: function (params) {
      var me = this;
      console.log(params)
      me.setData({
        videoParams:params
      })
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
    },
    //e 点击submit 获取到值
  upload:function(e){
    var me = this;
    var bgmId = e.detail.value.bgmId;
    var desc = e.detail.value.desc;
    console.log("bgmId:" + bgmId);
    console.log("desc:" + desc);

    var duration = me.data.videoParams.duration;
    var tmpHeight = me.data.videoParams.tmpHeight;
    var tmpWidth = me.data.videoParams.tmpWidth;
    var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;
    //上传视频
    wx.showLoading({
      title: '上传中...',
    })
    var serverUrl = app.serverUrl;
    //fix me
    var userInfo = app.getGlobalUserInfo();
    wx.uploadFile({
      url: serverUrl + '/video/upload?',
      formData:{
        userId:userInfo.id, //fixme app.userInfo.id
        bgmId:bgmId,
        desc: desc,
        videoSeconds: duration,
        videoHeight: tmpHeight,
        videoWidth: tmpWidth
      },       
      filePath: tmpVideoUrl,
      name: 'file',
      header: {
        'content-type': 'application/json', // 默认值
        'headerUserId': userInfo.id,
        'headerUserToken': userInfo.userToken
      },
      success: function (res) {
        //当success返回是字符串 需要转成json  格式化
        var data = JSON.parse(res.data);
        wx.hideLoading();
        console.log("res" + data);
        if (data.status == 200) {
          wx.showToast({
            title: '上传成功!~~',
            icon: "success"
          });   
          // 上传成功后跳回之前的页面
          wx.navigateBack({
            delta: 1
          })
          // //上传封面
          // wx.showLoading({
          //   title: '上传中...',
          // })
          // wx.uploadFile({
          //   url: serverUrl + '/video/uploadCover?',
          //   formData: {
          //     userId: app.userInfo.id,
          //     videoId: data.data,
          //   },
          //   filePath: tmpCoverUrl,
          //   name: 'file',
          //   header: {
          //     'content-type': 'application/json', // 默认值
          //   },
          //   success: function (res) {
          //     //当success返回是字符串 需要转成json  格式化
          //     var data = JSON.parse(res.data);
          //     wx.hideLoading();
          //     if (data.status == 200) {
          //         wx.showToast({
          //           title: '上传成功',
          //           icon:"success"
          //         });
          //     }else{
          //       wx.showToast({
          //         title: '上传失败！~',
          //         icon: "success"
          //       });
          //     }
          //     wx.navigateBack({
          //       delta: 1,
          //     })
          //   }
          // })
        } else if (res.data.status == 502) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: "none"
          });
          wx.redirectTo({
            url: '../userLogin/login',
          })
        } else {
          wx.showToast({
            title: '上传失败!~~',
            icon: "success"
          });
        }
      }
    })

    
  }
})

