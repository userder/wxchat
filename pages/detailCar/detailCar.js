// pages/detailCar/detailCar.js
var common = require('../../utils/common.js');
const app = getApp();
var codeTimeout = null;
var bespoke = {
  'name':'',
  'phone':''
}
var carId = '', usertoken = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperH: 240, current:1,//轮播图的高度，轮播图目前的序号
    detailCont: '', baseInfo: '', Kilometre: '',//车辆基本信息
    config:'',//部分车辆配置
    shadowShow: false,//预约看车的弹框
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var scene = decodeURIComponent(options.scene);
    if (scene == 'undefined') {
      carId = options.carId;//获取车辆ID
    } else {
      carId = scene;
    }
    that.detailCar(carId);
  },
  detailCar:function(carID){//获取车辆基本信息的网络请求
    var that = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...'
    })
    wx.request({
      url: common.getWholeUrl('/qqd/cars/' + carID),
      method:'GET',
      success:function(res){
        console.log(res.data)
        if(res.statusCode==200){
          var Kilometre = res.data.baseInfo.goodsKilometre;
          var nums = (Kilometre/10000).toFixed(1);
          that.setData({
            detailCont: res.data,
            baseInfo: res.data.baseInfo,
            Kilometre: nums
          })
          // that.getSystemInfo();
          wx.setNavigationBarTitle({
            title: that.data.baseInfo.goodsFullName,
          })
         
        } else if (res.statusCode == 401) {
          that.showmodel('您尚未登录')
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail:function(){
        that.showmodel('服务器开小差了，请稍后再试')
      },
      complete:function(){
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  // getSystemInfo:function(){//获取系统信息
  //   var that = this;
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       var W = res.windowWidth;
  //       var arr = that.data.detailCont;
  //       var image = arr.imgList[0].goodsImagePath;
  //       console.log(image)
  //       wx.getImageInfo({
  //         src: image,
  //         success: function (res) {
  //           console.log(res)
  //           var imgH = res.height;
  //           var imgW = res.width;
  //           var swiperheight = Math.floor(W * imgH / imgW - 1);
  //           that.setData({
  //             swiperH: swiperheight
  //           })
  //         },
  //         fail:function(){
  //           wx.showModal({
  //             title: '温馨提示',
  //             confirmText: '刷新',
  //             confirmColor: '#4182FF',
  //             content: '轮播图获取失败，请刷新重试！',
  //             success: function (res) {
  //               if (res.confirm) {
  //                 wx.startPullDownRefresh({})
  //               } else if (res.cancel) {
  //                 return false;
  //               }
  //             }
  //           })
  //         },
  //         complete:function(){
  //           wx.hideNavigationBarLoading()
  //         }
  //       })
  //     },
  //   })
  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    bespoke = {'name': '','phone': ''};
    this.setData({
      namevalue: '',
      phonevalue: ''
    })
    wx.hideNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.hideLoading();
    wx.hideNavigationBarLoading();
    this.detailCar(carId);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: that.data.baseInfo.goodsFullName,
      path: '/pages/detailCar/detailCar?carId='+carId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  bindchange:function(e){//轮播图滑动事件
    this.setData({
      current: (e.detail.current+1)
    })
  },
  lookImg:function(){//图片预览
    var arr = this.data.detailCont;
    var image = arr.imgList;
    var imgList = [];
    for(var i=0;i<image.length;++i){
      imgList.push(image[i].goodsImagePath)
    }
    wx.previewImage({
      current: image[0].goodsImagePath,
      urls: imgList,
    })
  },
  //更多分期方案
  moreByStages:function(){
    var stages = this.data.detailCont.financialSchemeList;
    wx.navigateTo({
      url: '/pages/byStages/byStages?stages=' + JSON.stringify(stages),
    })
  },
  configDetail:function(){
    wx.navigateTo({
      url: '/pages/configure/configure?carId='+carId,
    })
  },
  bespoke:function(){//预约看车
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function (res) {
        if (res.data != '' && res.data != undefined) {
          that.setData({
            shadowShow: true
          }) 
          usertoken = res.data.token;
        }else{
          that.showModal();
        }
      },
      fail:function(){
        that.showModal();
      }
    })
  },
  showModal:function(){
    var that = this;
    wx.showModal({
      title: '温馨提示',
      confirmText: '去登录',
      confirmColor: '#4182FF',
      content: '您尚未登录',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  bindblurName:function(e){
    var that = this;
    var text = e.detail.value;
    bespoke.name = text;
  },
  bindblurPhone: function (e) {
    var that = this;
    var text = e.detail.value;
    bespoke.phone = text;
  },
  confirm:function(){//确认预约
    var that = this;
    clearTimeout(codeTimeout);
    if(bespoke.name==''&&bespoke.phone==''){
      wx.showModal({
        title: '温馨提示',
        content: '请把您的联系信息填写完整',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#4182FF',
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(bespoke.phone))){
      wx.showModal({
        title: '温馨提示',
        content: '联系电话格式错误',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#4182FF',
      })
    }else{
      this.setData({
        shadowShow: false
      })
      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '请稍等...',
      })
      wx.request({
        url: common.getWholeUrl('/qqd/order', { carId: carId, name: bespoke.name, tel: bespoke.phone }),
        header: {
          token: usertoken
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            wx.navigateTo({
              url: '/pages/bespokeSuccess/bespokeSuccess',
            })
          } else if (res.statusCode == 401) {
            that.showmodel('您尚未登录')
          } else if (res.statusCode == 400) {
            that.showmodel(res.data)
          } else {
            that.showmodel('服务器开小差了，请稍后再试')
          }
        },
        complete: function () {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
        }
      })
    }
  },
  shadow:function(){//阻止底层页面滑动
    return false;
  },
  offShadow:function(){//关闭弹框
    this.setData({
      shadowShow: false,
      namevalue: '',
      phonevalue: ''
    })
    bespoke = { 'name': '', 'phone': '' };
  },
  
  showmodel: function (text) {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: text,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4182FF',
      success:function(){
        wx.navigateBack({})
      }
    })
  }
})