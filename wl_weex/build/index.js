/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/ce809cf18596e50d32148e3684ad1d9e", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__webpack_require__(1);
	var stream = __weex_require__('@weex-module/stream')
	var timer = __weex_require__('@weex-module/timer')

	    __weex_module__.exports = {
	        data: function () {return {
	            hostU:'',
	            leftimg:'',
	            urls:'',
	            lks:'',
	            platform:'',
	            shown:false,  
	            ifbanner:true,
	            ifcate:true,
	            ifhot:true,
	            ifhotwz:true,
	            iflogo:true,
	            ifrecoms:true,
	            ifrecomswz:true,
	            intervalValue:"2000",
	            isAutoPlay:"true",
	            displayRefresh:false,
	            borders:"1px",
	            pdtop:'0px',
	            res_data:'',
	            countryinfor:{},
	            bannerList:[],
	            cate:[],
	            addleft:[],
	            addright:[],
	            logom:[],
	            recoms:[],
	            gotoimg:'', 
	            shtitle:'',
	            tjid:'',
	            channel_uid:'',
	            isload:true,
	            jiazai:false
	        }},
	        created:function(){
	            /**
	            * 顶部返回按钮
	            */
	            var vm = this;
	            vm.hostU = 'http://dev.ms.vipwifi.com';
	            // stream.fetch({
	            //     url: 'http://dev.ms.vipwifi.com/wl_weex/build/host.json',
	            //     type: 'json',
	            //     method: 'GET'
	            // }, function (res) {   
	            //     if(typeof res == 'string'){
	            //         res = JSON.parse(res);
	            //     }
	            //     var res_data = res.data; 
	            //     if(typeof res_data == 'string'){
	            //         res_data = JSON.parse(res_data);
	            //     }
	            //     vm.hostU = res_data.hosturl;
	                vm.leftimg = vm.hostU+'/wl_weex/images/left-rowbg.png';
	                vm.$on('naviBar.leftItem.click',function(e){
	                    vm.pop()
	                });
	                vm.$getConfig(function (config) {
	                    var env = config.env;
	                    vm.platform = env.platform.toLowerCase();
	                    if(vm.platform == 'ios'){
	                        var scale = env.scale;
	                        var deviceWidth = env.deviceWidth / scale;
	                        vm.navBarHeight = 64.0 * 750.0 / deviceWidth;
	                    }
	                }.bind(this));
	                vm.urls = vm.hostU+'/wl_weex/build/third.js'
	                vm.lks = '?'
	                if(vm.platform == 'web'){
	                    vm.pdtop = '2px'
	                    vm.borders = '2px'
	                    vm.lks = '&'
	                    vm.urls = vm.hostU+'/wl_weex/build/index.html?page=third.js'
	                    stream.fetch({
	                        url: vm.hostU+'/MshopApi/User/get_online_userid',
	                        type: 'json',
	                        method: 'GET'
	                    }, function (res) {
	                        if (res.data.msg=='success'){
	                            vm.channel_uid = res.data.data.uid;
	                        }else{
	                            vm.channel_uid = '';
	                        }
	                    },function(response){
	                        vm.channel_uid = '';
	                    })
	                }
	                /**
	                * stream 动态接口数据
	                */
	                var bundleUrl = vm.$getConfig().bundleUrl;
	                var parentid = bundleUrl.split('parent_id=')[1]
	                if (parentid==undefined){
	                    parentid = '19'
	                }
	                var platapp = '';
	                if (vm.platform == 'ios' || vm.platform == 'android'){
	                    platapp = '1';
	                }else{
	                    platapp = '2';
	                }
	                stream.fetch({
	                    url: vm.hostU+'/MshopApi/Fun/country_content?mdd_country_id='+parentid+"&platform="+platapp,
	                    type: 'json',
	                    method: 'GET'
	                }, function (res) {   
	                    if(typeof res == 'string'){
	                        res = JSON.parse(res);
	                    }
	                    var res_data = res.data;
	                    if(typeof res_data === 'string'){
	                        res_data = JSON.parse(res_data);
	                    }
	                    if (res_data.msg=='success'){
	                        vm.getData(res_data)
	                    }else{
	                    }
	                },function(response){

	                })
	            // },function(response){
	                
	            // })
	        },
	        methods: {
	            getData:function(res_data){
	                this.res_data = res_data.data; 
	                this.countryinfor = this.res_data.country_info; 
	                if (this.res_data.banner_list==undefined){
	                    this.ifbanner = false;
	                }else{
	                    this.bannerList = this.res_data.banner_list;
	                }
	                if (this.res_data.category_list==undefined){
	                    this.ifcate = false;
	                }else{
	                    this.cate = this.res_data.category_list;
	                }
	                if (this.res_data.brand_logo_list==undefined){
	                    this.iflogo = false;
	                }else{
	                    this.logom = this.res_data.brand_logo_list;
	                }
	                if (this.res_data.recommends_list==undefined){
	                    this.ifrecoms = false;
	                    this.ifrecomswz = false;
	                }else{
	                    this.recoms = this.res_data.recommends_list;
	                }

	                if (this.res_data.activity_list==undefined){
	                    this.ifhot = false;
	                    this.ifhotwz = false;
	                }else{
	                    var actilen = this.res_data.activity_list.length;
	                    if (actilen >= 2){
	                        for (var i = 0;i < actilen;i++){
	                            if ( i >=2){
	                                this.addright.push(this.res_data.activity_list[i])
	                            }else{
	                                this.addleft.push(this.res_data.activity_list[i])
	                            }
	                        }
	                    }else{
	                        for (var i = 0;i < actilen;i++){
	                            this.addleft.push(this.res_data.activity_list[i])
	                        }
	                    }
	                }
	                
	            }, 
	            push: function(e) {
	                var vm = this;
	                var thirdHref = e.target.attr.hrefs.replace(/&amp;/g,'&');
	                vm.gotoimg = e.target.attr.shlogo;
	                if (e.target.attr.shlogo.indexOf('http://')==-1){
	                    vm.gotoimg = vm.hostU+e.target.attr.shlogo;
	                }
	                vm.shtitle = e.target.attr.shtitle;
	                vm.tjid = e.target.attr.tjid;
	                var ishth='?'
	                if (thirdHref.indexOf('?')>-1){
	                    ishth = '&'
	                }
	                 var thirdlink = 'shtitle='+encodeURI(vm.shtitle)+"&href="+decodeURI(thirdHref)+ishth+'channel_client=weixin&channel=uroaming&channel_uid='+vm.channel_uid;
	                /**
	                *   web微信端，默认状态已登录，直接将channel_uid 传给第三方并跳转到第三方js
	                **/
	                if(vm.platform == 'web'){
	                    // 统计user_id 和 content_id
	                    stream.fetch({
	                        url: vm.hostU+'/Adsunion/Statistics/addHits?user_id='+vm.channel_uid+"&content_id="+vm.tjid,
	                        type: 'json',
	                        method: 'GET'
	                    }, function (res) {   
	                        
	                    },function(response){
	                        
	                    })
	                    var webUrl = vm.urls+vm.lks+thirdlink;
	                    vm.shown = true;
	                    var ua = navigator.userAgent.toLowerCase(); 
	                    // 如果打开的不是第三方页面，则判断链接是否是app的链接或者web链接
	                    if (thirdHref.indexOf('wl_weex/build/')>-1){
	                        // 打开的不是第三方页面，链接是web链接
	                        if (thirdHref.indexOf('index.html?page=')>-1){
	                            
	                            if ((/iphone|ipad|ipod/).test(ua)) {
	                                var params = {
	                                    'url':thirdHref,
	                                    'animated' : 'true',
	                                }
	                                vm.$call('navigator','push',params, function () {});
	                            }else{
	                                vm.$openURL(thirdHref)
	                            }
	                        }else{
	                            // 打开的不是第三方页面，链接是app链接,要转换成web链接
	                            var gotoUrl = thirdHref.split('wl_weex/build/')[0]+'wl_weex/build/index.html?page='+thirdHref.split('wl_weex/build/')[1];
	                            if ((/iphone|ipad|ipod/).test(ua)) {
	                                var params = {
	                                    'url':gotoUrl,
	                                    'animated' : 'true',
	                                }
	                                vm.$call('navigator','push',params, function () {});
	                            }else{
	                                vm.$openURL(gotoUrl)
	                            }
	                        }
	                    }else{
	                        timer.setTimeout(function () { 
	                            vm.shown = false;
	                            if ((/iphone|ipad|ipod/).test(ua)) {
	                                var params = {
	                                    'url':webUrl,
	                                    'animated' : 'true',
	                                }
	                                vm.$call('navigator','push',params, function () {});
	                            }else{
	                                webUrl = thirdHref+ishth+'channel_client=weixin&channel=uroaming&channel_uid='+vm.channel_uid;
	                                vm.$openURL(webUrl)
	                            }
	                        }, 1000)
	                    }  
	                }else{
	                    /**
	                    *   客户端提供原生方法，获取用户channer_uid
	                    **/
	                    var eventModule = __weex_require__('@weex-module/event');
	                    var loginModule = __weex_require__('@weex-module/login');
	                    eventModule.openURL('url',function(ret) {
	                        if (ret.userid!=''){
	                            vm.channel_uid = ret.userid;
	                            // 统计user_id 和 content_id
	                            stream.fetch({
	                                url: vm.hostU+'/Adsunion/Statistics/addHits?user_id='+vm.channel_uid+"&content_id="+vm.tjid,
	                                type: 'json',
	                                method: 'GET'
	                            }, function (res) {  

	                            },function(response){
	                                
	                            })
	                            if (thirdHref.indexOf('wl_weex/build/')>-1){
	                                // 打开的不是第三方页面，链接是web链接
	                                if (thirdHref.indexOf('index.html?page=')>-1){
	                                    var gotoUrl = thirdHref.split('wl_weex/build/')[0]+'wl_weex/build/'+thirdHref.split('wl_weex/build/')[1];
	                                    var params = {
	                                        'url':gotoUrl,
	                                        'animated' : 'true',
	                                    }
	                                    if(vm.platform == 'ios'){
	                                        vm.$call('navigator','push',params, function () {});
	                                    }else{
	                                        vm.$call('navigator','push',{}, function () {});
	                                        loginModule.openURL(gotoUrl,false)
	                                    }
	                                }else{
	                                    // 打开的不是第三方页面，链接是app链接,要转换成web链接
	                                    var params = {
	                                        'url':thirdHref,
	                                        'animated' : 'true',
	                                    }
	                                   if(vm.platform == 'ios'){
	                                        vm.$call('navigator','push',params, function () {});
	                                    }else{
	                                        vm.$call('navigator','push',{}, function () {});
	                                        loginModule.openURL(thirdHref,false)
	                                    }
	                                }
	                            }else{
	                                thirdlink = 'shtitle='+encodeURI(vm.shtitle)+"&href="+decodeURI(thirdHref)+ishth+'channel_client=app&channel=uroaming&channel_uid='+vm.channel_uid;
	                                var thirdUrl = vm.urls+vm.lks+thirdlink;
	                                if (timer) {
	                                /**
	                                *   ios setTimeout必须带timer. 
	                                *   页面跳转到第三方
	                                **/
	                                    if(vm.platform == 'ios'){
	                                        vm.shown = true;
	                                        timer.setTimeout(function () { 
	                                            vm.shown = false;
	                                            var params = {
	                                                'url': thirdUrl,
	                                                'animated' : 'true',
	                                            }
	                                            vm.$call('navigator','push',params, function () {});
	                                        }, 1000)
	                                    }else{
	                                        /**
	                                        *   安卓 setTimeout必须带timer. 
	                                        *   页面跳转到第三方
	                                        **/
	                                        vm.shown = true;
	                                        setTimeout(function () { 
	                                            vm.shown =false
	                                            var params = {
	                                                'url': thirdUrl,
	                                                'animated' : 'true',
	                                            }
	                                            vm.$call('navigator','push',{}, function () {});
	                                            loginModule.openURL(thirdUrl,false)
	                                        }, 1000)
	                                    }   
	                                }else{
	                                    /**
	                                    *   无计时器时，不影响直接打开第三方
	                                    **/
	                                    vm.shown =false;
	                                    var params = {
	                                        'url': thirdUrl,
	                                        'animated' : 'true',
	                                    }
	                                    vm.$call('navigator','push',params, function () {});
	                                }
	                            }
	                        }else{
	                            /**
	                            *   未登陆时，跳转到登录页面，登陆完成再次回到此页面
	                            **/
	                            loginModule.openURL('http://login.js',false);
	                        }
	                    });
	                }               
	            },
	            pop: function() {
	                var vm = this;
	                var params = {
	                    'animated' : 'true',
	                }
	                vm.$call('navigator','pop',params, function () {});
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "wxc-navpage",
	  "attr": {
	    "dataRole": "none",
	    "backgroundColor": "#ffffff",
	    "height": "128",
	    "title": function () {return this.countryinfor.name},
	    "titleColor": "#051b28",
	    "leftItemSrc": function () {return this.leftimg}
	  },
	  "children": [
	    {
	      "type": "scroller",
	      "classList": [
	        "main"
	      ],
	      "shown": function () {return this.isload},
	      "children": [
	        {
	          "type": "container",
	          "children": [
	            {
	              "type": "container",
	              "classList": [
	                "slider-container"
	              ],
	              "shown": function () {return this.ifbanner},
	              "children": [
	                {
	                  "type": "slider",
	                  "classList": [
	                    "index_slider"
	                  ],
	                  "attr": {
	                    "interval": function () {return this.intervalValue},
	                    "autoPlay": function () {return this.isAutoPlay}
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "classList": [
	                        "slider-pages"
	                      ],
	                      "repeat": function () {return this.bannerList},
	                      "attr": {
	                        "hrefs": function () {return this.url},
	                        "tjid": function () {return this.id},
	                        "shtitle": function () {return this.ads_merchant_name},
	                        "shlogo": function () {return this.ads_merchant_logo}
	                      },
	                      "events": {
	                        "click": "push"
	                      },
	                      "children": [
	                        {
	                          "type": "image",
	                          "classList": [
	                            "thumb"
	                          ],
	                          "attr": {
	                            "src": function () {return this.img}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "indicator",
	                      "classList": [
	                        "indicator"
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "category"
	              ],
	              "style": {
	                "borderBottomWidth": function () {return this.borders}
	              },
	              "shown": function () {return this.ifcate},
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "cate"
	                  ],
	                  "repeat": function () {return this.cate},
	                  "children": [
	                    {
	                      "type": "div",
	                      "attr": {
	                        "hrefs": function () {return this.url},
	                        "tjid": function () {return this.id},
	                        "shtitle": function () {return this.ads_merchant_name},
	                        "shlogo": function () {return this.ads_merchant_logo}
	                      },
	                      "events": {
	                        "click": "push"
	                      },
	                      "children": [
	                        {
	                          "type": "image",
	                          "classList": [
	                            "cate_img"
	                          ],
	                          "attr": {
	                            "src": function () {return this.img}
	                          }
	                        },
	                        {
	                          "type": "text",
	                          "classList": [
	                            "catea"
	                          ],
	                          "attr": {
	                            "value": function () {return this.title}
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "dest-adsM"
	              ],
	              "shown": function () {return this.ifhot},
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "hot-hd"
	                  ],
	                  "events": {
	                    "click": "alerts"
	                  },
	                  "style": {
	                    "borderBottomWidth": function () {return this.borders}
	                  },
	                  "shown": function () {return this.ifhotwz},
	                  "attr": {
	                    "value": "热门活动"
	                  }
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "dest-ads"
	                  ],
	                  "children": [
	                    {
	                      "type": "div",
	                      "classList": [
	                        "ads-left"
	                      ],
	                      "style": {
	                        "paddingTop": function () {return this.pdtop}
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "classList": function () {return ['bordersleft' + (this.$index+1)]},
	                          "repeat": function () {return this.addleft},
	                          "style": {
	                            "borderBottomWidth": function () {return this.borders},
	                            "borderRightWidth": function () {return this.borders}
	                          },
	                          "children": [
	                            {
	                              "type": "image",
	                              "classList": function () {return ['ads-left' + (this.$index+1)]},
	                              "attr": {
	                                "src": function () {return this.img},
	                                "tjid": function () {return this.id},
	                                "shtitle": function () {return this.ads_merchant_name},
	                                "hrefs": function () {return this.url},
	                                "shlogo": function () {return this.ads_merchant_logo}
	                              },
	                              "events": {
	                                "click": "push"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "classList": [
	                        "ads-right"
	                      ],
	                      "children": [
	                        {
	                          "type": "div",
	                          "classList": function () {return ['bordersright' + (this.$index+1)]},
	                          "repeat": function () {return this.addright},
	                          "style": {
	                            "borderBottomWidth": function () {return this.borders}
	                          },
	                          "children": [
	                            {
	                              "type": "image",
	                              "classList": function () {return ['ads-right' + (this.$index+1)]},
	                              "attr": {
	                                "src": function () {return this.img},
	                                "tjid": function () {return this.id},
	                                "shtitle": function () {return this.ads_merchant_name},
	                                "hrefs": function () {return this.url},
	                                "shlogo": function () {return this.ads_merchant_logo}
	                              },
	                              "events": {
	                                "click": "push"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "children": [
	                {
	                  "type": "scroller",
	                  "attr": {
	                    "scrollDirection": "horizontal"
	                  },
	                  "classList": [
	                    "ads-slider"
	                  ],
	                  "shown": function () {return this.iflogo},
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "ads-logo"
	                      ],
	                      "attr": {
	                        "src": function () {return this.img},
	                        "hrefs": function () {return this.url},
	                        "tjid": function () {return this.id},
	                        "shtitle": function () {return this.ads_merchant_name},
	                        "shlogo": function () {return this.ads_merchant_logo}
	                      },
	                      "events": {
	                        "click": "push"
	                      },
	                      "repeat": function () {return this.logom}
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "text",
	              "classList": [
	                "hot-hd"
	              ],
	              "style": {
	                "borderBottomWidth": function () {return this.borders}
	              },
	              "shown": function () {return this.ifrecomswz},
	              "attr": {
	                "value": "独家享有"
	              }
	            }
	          ]
	        },
	        {
	          "type": "container",
	          "classList": [
	            "dest-proBox"
	          ],
	          "repeat": function () {return this.recoms},
	          "style": {
	            "borderBottomWidth": function () {return this.borders}
	          },
	          "shown": function () {return this.ifrecoms},
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "dest-productimg"
	              ],
	              "attr": {
	                "src": function () {return this.img},
	                "hrefs": function () {return this.url},
	                "tjid": function () {return this.id},
	                "shtitle": function () {return this.ads_merchant_name},
	                "shlogo": function () {return this.ads_merchant_logo}
	              },
	              "events": {
	                "click": "push"
	              }
	            },
	            {
	              "type": "div",
	              "classList": [
	                "dest-titpri"
	              ],
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "dest-titdiv"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "dest-tit"
	                      ],
	                      "attr": {
	                        "hrefs": function () {return this.url},
	                        "tjid": function () {return this.id},
	                        "shtitle": function () {return this.ads_merchant_name},
	                        "shlogo": function () {return this.ads_merchant_logo},
	                        "value": function () {return this.title}
	                      },
	                      "events": {
	                        "click": "push"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "p",
	                  "classList": [
	                    "dest-price"
	                  ],
	                  "attr": {
	                    "hrefs": function () {return this.url},
	                    "tjid": function () {return this.id},
	                    "shtitle": function () {return this.ads_merchant_name},
	                    "shlogo": function () {return this.ads_merchant_logo}
	                  },
	                  "events": {
	                    "click": "push"
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "dest-pricen"
	                      ],
	                      "attr": {
	                        "value": function () {return '￥' + (this.pro_price) + '起'}
	                      }
	                    },
	                    {
	                      "type": "text",
	                      "classList": [
	                        "dest-pricey"
	                      ],
	                      "attr": {
	                        "value": function () {return '￥' + (this.mar_price)}
	                      }
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "outerfix"
	          ],
	          "shown": function () {return this.shown}
	        },
	        {
	          "type": "container",
	          "classList": [
	            "thirdCon"
	          ],
	          "shown": function () {return this.shown},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "thirdGo"
	              ],
	              "attr": {
	                "value": "即将前往"
	              }
	            },
	            {
	              "type": "div",
	              "classList": [
	                "third-logobr"
	              ],
	              "style": {
	                "borderBottomWidth": function () {return this.borders}
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "classList": [
	                    "third-logo"
	                  ],
	                  "attr": {
	                    "src": function () {return this.gotoimg}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "third-btm"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "third-ts"
	                  ],
	                  "attr": {
	                    "value": function () {return '现在为您跳转至' + (this.shtitle)}
	                  }
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "main": {
	    "backgroundColor": "#e4ecef",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\"",
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0
	  },
	  "outerfix": {
	    "backgroundColor": "rgba(0,0,0,0.3)",
	    "width": 750,
	    "height": 1334,
	    "position": "fixed",
	    "zIndex": 999
	  },
	  "thirdCon": {
	    "width": 690,
	    "height": 502,
	    "backgroundColor": "#ffffff",
	    "borderBottomLeftRadius": 18,
	    "borderBottomRightRadius": 18,
	    "borderTopLeftRadius": 18,
	    "borderTopRightRadius": 18,
	    "zIndex": 999,
	    "position": "fixed",
	    "left": 30,
	    "top": 418
	  },
	  "thirdGo": {
	    "paddingTop": 39,
	    "paddingBottom": 20,
	    "textAlign": "center",
	    "color": "#333333",
	    "fontSize": 28,
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "third-logo": {
	    "width": 117,
	    "height": 62
	  },
	  "third-logobr": {
	    "borderStyle": "solid",
	    "borderBottomColor": "#e9e7e7",
	    "width": 650,
	    "marginLeft": 20,
	    "alignItems": "center",
	    "junstifyContent": "center",
	    "paddingBottom": 20
	  },
	  "third-btm": {
	    "backgroundColor": "#fe4c4c",
	    "height": 140,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "marginTop": 100
	  },
	  "third-ts": {
	    "color": "#ffffff",
	    "fontSize": 38,
	    "flex": 1,
	    "textAlign": "center",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "white": {
	    "color": "#ffffff"
	  },
	  "refresh-view": {
	    "width": 750,
	    "flexDirection": "row"
	  },
	  "refresh-arrow": {
	    "fontSize": 25,
	    "color": "#eeeeee",
	    "marginLeft": 36
	  },
	  "font20": {
	    "fontSize": 20
	  },
	  "slider-container": {
	    "position": "relative",
	    "width": 750,
	    "height": 370,
	    "backgroundColor": "#ffffff"
	  },
	  "index_slider": {
	    "width": 750,
	    "height": 370,
	    "backgroundColor": "#ffffff",
	    "marginTop": 0,
	    "zIndex": 5,
	    "overflow": "visible"
	  },
	  "indicator": {
	    "position": "absolute",
	    "width": 750,
	    "height": 20,
	    "left": 0,
	    "bottom": 10,
	    "itemSize": 16,
	    "itemColor": "#dddddd",
	    "itemSelectedColor": "#fe4c4c",
	    "zIndex": 900
	  },
	  "thumb": {
	    "width": 750,
	    "height": 330,
	    "marginTop": 0
	  },
	  "category": {
	    "paddingTop": 20,
	    "paddingBottom": 16,
	    "backgroundColor": "#ffffff",
	    "flexDirection": "row",
	    "borderStyle": "solid",
	    "borderBottomColor": "#dadada",
	    "width": 750,
	    "flexWrap": "wrap"
	  },
	  "cate": {
	    "flexWrap": "wrap",
	    "width": 187.5
	  },
	  "cate_img": {
	    "width": 88,
	    "height": 88,
	    "marginLeft": 50,
	    "borderRadius": 44,
	    "overflow": "hidden"
	  },
	  "catea": {
	    "paddingTop": 18,
	    "paddingBottom": 18,
	    "width": 187.5,
	    "textAlign": "center",
	    "color": "#333333",
	    "fontSize": 24
	  },
	  "swiper-bg": {
	    "position": "absolute",
	    "left": 0,
	    "bottom": 12,
	    "width": 750,
	    "height": 23,
	    "zIndex": 999
	  },
	  "dest-adsM": {
	    "backgroundColor": "#ffffff",
	    "marginTop": 24
	  },
	  "dest-ads": {
	    "flexDirection": "row"
	  },
	  "hot-hd": {
	    "paddingTop": 28,
	    "paddingBottom": 28,
	    "paddingLeft": 26,
	    "width": 750,
	    "backgroundColor": "#ffffff",
	    "color": "#181818",
	    "fontSize": 32,
	    "fontWeight": "bold",
	    "borderStyle": "solid",
	    "borderBottomColor": "#d2d2d2"
	  },
	  "ads-left": {
	    "width": 374
	  },
	  "ads-left1": {
	    "width": 373,
	    "height": 376
	  },
	  "bordersleft1": {
	    "borderStyle": "solid",
	    "borderBottomColor": "#d2d2d2",
	    "borderRightColor": "#d2d2d2"
	  },
	  "ads-left2": {
	    "width": 373,
	    "height": 189,
	    "paddingBottom": 1
	  },
	  "bordersleft2": {
	    "borderStyle": "solid",
	    "borderRightColor": "#d2d2d2",
	    "borderBottomColor": "#d2d2d2"
	  },
	  "ads-right": {
	    "width": 374
	  },
	  "ads-right1": {
	    "width": 374,
	    "height": 188
	  },
	  "bordersright1": {
	    "borderStyle": "solid",
	    "borderBottomColor": "#d2d2d2"
	  },
	  "ads-right2": {
	    "width": 374,
	    "height": 188
	  },
	  "bordersright2": {
	    "borderStyle": "solid",
	    "borderBottomColor": "#d2d2d2"
	  },
	  "ads-right3": {
	    "width": 374,
	    "height": 188,
	    "paddingBottom": 1
	  },
	  "bordersright3": {
	    "borderStyle": "solid",
	    "borderBottomColor": "#d2d2d2"
	  },
	  "ads-slider": {
	    "backgroundColor": "#e4ecef",
	    "height": 210,
	    "width": 750,
	    "flexDirection": "row"
	  },
	  "slidertouch": {
	    "flexDirection": "row",
	    "alignItems": "center",
	    "junstifyContent": "center"
	  },
	  "ads-logo": {
	    "width": 264,
	    "height": 130,
	    "marginLeft": 20,
	    "marginTop": 40
	  },
	  "dest-proBox": {
	    "borderStyle": "solid",
	    "borderBottomColor": "#dddddd",
	    "backgroundColor": "#ffffff",
	    "paddingTop": 24,
	    "paddingBottom": 24,
	    "paddingLeft": 24,
	    "paddingRight": 24,
	    "flexDirection": "row"
	  },
	  "dest-productimg": {
	    "width": 240,
	    "height": 160,
	    "borderBottomLeftRadius": 4,
	    "borderBottomRightRadius": 4,
	    "borderTopLeftRadius": 4,
	    "borderTopRightRadius": 4
	  },
	  "dest-titpri": {
	    "width": 436,
	    "marginLeft": 26
	  },
	  "dest-titdiv": {
	    "width": 436,
	    "flexDirection": "row",
	    "height": 88,
	    "alignItems": "center"
	  },
	  "dest-tit": {
	    "fontSize": 32,
	    "color": "#181818",
	    "flex": 1
	  },
	  "dest-price": {
	    "flexDirection": "row",
	    "height": 70,
	    "alignItems": "center"
	  },
	  "dest-pricen": {
	    "fontSize": 30,
	    "color": "#ff5a00"
	  },
	  "dest-pricey": {
	    "fontSize": 24,
	    "color": "#999999",
	    "marginLeft": 29,
	    "textDecoration": "line-through"
	  },
	  "ads-top": {
	    "width": 450,
	    "height": 143
	  },
	  "ads-btm": {
	    "marginTop": 1,
	    "flexDirection": "row"
	  },
	  "ads-btmimg": {
	    "height": 218,
	    "flex": 1
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/ce809cf18596e50d32148e3684ad1d9e", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);


/***/ },
/* 2 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-button", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      size: 'large',
	      value: ''
	    }},
	    methods: {
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['btn-txt', 'btn-txt-' + (this.type), 'btn-txt-sz-' + (this.size)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "btn": {
	    "marginBottom": 0,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#333333"
	  },
	  "btn-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "borderColor": "rgb(40,96,144)"
	  },
	  "btn-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "borderColor": "rgb(76,174,76)"
	  },
	  "btn-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "borderColor": "rgb(70,184,218)"
	  },
	  "btn-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "borderColor": "rgb(238,162,54)"
	  },
	  "btn-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "borderColor": "rgb(212,63,58)"
	  },
	  "btn-link": {
	    "borderColor": "rgba(0,0,0,0)",
	    "borderRadius": 0
	  },
	  "btn-txt-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-txt-primary": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-success": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-info": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-warning": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-danger": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-link": {
	    "color": "rgb(51,122,183)"
	  },
	  "btn-sz-large": {
	    "width": 300,
	    "height": 100,
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 40,
	    "paddingRight": 40,
	    "borderRadius": 15
	  },
	  "btn-sz-middle": {
	    "width": 240,
	    "height": 80,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderRadius": 10
	  },
	  "btn-sz-small": {
	    "width": 170,
	    "height": 60,
	    "paddingTop": 12,
	    "paddingBottom": 12,
	    "paddingLeft": 25,
	    "paddingRight": 25,
	    "borderRadius": 7
	  },
	  "btn-txt-sz-large": {
	    "fontSize": 45
	  },
	  "btn-txt-sz-middle": {
	    "fontSize": 35
	  },
	  "btn-txt-sz-small": {
	    "fontSize": 30
	  }
	})
	})

/***/ },
/* 3 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-hn", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      level: 1,
	      value: ''
	    }},
	    methods: {}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['h' + (this.level)]},
	  "style": {
	    "justifyContent": "center"
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['txt-h' + (this.level)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "h1": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h2": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h3": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "txt-h1": {
	    "fontSize": 70
	  },
	  "txt-h2": {
	    "fontSize": 52
	  },
	  "txt-h3": {
	    "fontSize": 42
	  }
	})
	})

/***/ },
/* 4 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-list-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      bgColor: '#ffffff'
	    }},
	    methods: {
	      touchstart: function() {
	        // FIXME android touch
	        // TODO adaptive opposite bgColor
	//        this.bgColor = '#e6e6e6';
	      },
	      touchend: function() {
	        // FIXME android touchend not triggered
	//        this.bgColor = '#ffffff';
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "item"
	  ],
	  "events": {
	    "touchstart": "touchstart",
	    "touchend": "touchend"
	  },
	  "style": {
	    "backgroundColor": function () {return this.bgColor}
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "height": 160,
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#dddddd"
	  }
	})
	})

/***/ },
/* 5 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-panel", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      title: '',
	      paddingBody: 20,
	      paddingHead: 20,
	      dataClass: '', // FIXME transfer class
	      border: 0
	    }},
	    ready: function() {
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['panel', 'panel-' + (this.type)]},
	  "style": {
	    "borderWidth": function () {return this.border}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingHead},
	        "paddingBottom": function () {return this.paddingHead},
	        "paddingLeft": function () {return this.paddingHead*1.5},
	        "paddingRight": function () {return this.paddingHead*1.5}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    },
	    {
	      "type": "div",
	      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingBody},
	        "paddingBottom": function () {return this.paddingBody},
	        "paddingLeft": function () {return this.paddingBody*1.5},
	        "paddingRight": function () {return this.paddingBody*1.5}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "panel": {
	    "marginBottom": 20,
	    "backgroundColor": "#ffffff",
	    "borderColor": "#dddddd",
	    "borderWidth": 1
	  },
	  "panel-primary": {
	    "borderColor": "rgb(40,96,144)"
	  },
	  "panel-success": {
	    "borderColor": "rgb(76,174,76)"
	  },
	  "panel-info": {
	    "borderColor": "rgb(70,184,218)"
	  },
	  "panel-warning": {
	    "borderColor": "rgb(238,162,54)"
	  },
	  "panel-danger": {
	    "borderColor": "rgb(212,63,58)"
	  },
	  "panel-header": {
	    "backgroundColor": "#f5f5f5",
	    "fontSize": 40,
	    "color": "#333333"
	  },
	  "panel-header-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "color": "#ffffff"
	  },
	  "panel-header-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "color": "#ffffff"
	  },
	  "panel-header-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "color": "#ffffff"
	  },
	  "panel-header-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "color": "#ffffff"
	  },
	  "panel-header-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "color": "#ffffff"
	  },
	  "panel-body": {}
	})
	})

/***/ },
/* 6 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tip", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'success',
	      value: ''
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['tip', 'tip-' + (this.type)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['tip-txt', 'tip-txt-' + (this.type)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "tip": {
	    "paddingLeft": 36,
	    "paddingRight": 36,
	    "paddingTop": 36,
	    "paddingBottom": 36,
	    "borderRadius": 10
	  },
	  "tip-txt": {
	    "fontSize": 28
	  },
	  "tip-success": {
	    "backgroundColor": "#dff0d8",
	    "borderColor": "#d6e9c6"
	  },
	  "tip-txt-success": {
	    "color": "#3c763d"
	  },
	  "tip-info": {
	    "backgroundColor": "#d9edf7",
	    "borderColor": "#bce8f1"
	  },
	  "tip-txt-info": {
	    "color": "#31708f"
	  },
	  "tip-warning": {
	    "backgroundColor": "#fcf8e3",
	    "borderColor": "#faebcc"
	  },
	  "tip-txt-warning": {
	    "color": "#8a6d3b"
	  },
	  "tip-danger": {
	    "backgroundColor": "#f2dede",
	    "borderColor": "#ebccd1"
	  },
	  "tip-txt-danger": {
	    "color": "#a94442"
	  }
	})
	})

/***/ },
/* 7 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-countdown", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        now: 0,
	        remain: 0,
	        time: {
	            elapse: 0,
	            D: '0',
	            DD: '0',
	            h: '0',
	            hh: '00',
	            H: '0',
	            HH: '0',
	            m: '0',
	            mm: '00',
	            M: '0',
	            MM: '0',
	            s: '0',
	            ss: '00',
	            S: '0',
	            SS: '0'
	        },
	        outofview: false
	    }},
	    ready: function() {
	        if (this.remain <= 0) {
	            return;
	        }
	        // this.isWeb = this.$getConfig().env.platform === 'Web';
	        this.now = Date.now();
	        this.nextTick();
	    },
	    methods: {
	        nextTick: function() {
	            if (this.outofview) {
	                setTimeout(this.nextTick.bind(this), 1000);
	            } else {
	                this.time.elapse = parseInt((Date.now() - this.now) / 1000);

	                if (this.calc()) {
	                    this.$emit('tick', Object.assign({}, this.time));
	                    setTimeout(this.nextTick.bind(this), 1000);
	                } else {
	                    this.$emit('alarm', Object.assign({}, this.time));
	                }
	                this._app.updateActions(); 
	            }
	        },
	        format: function(str) {
	            if (str.length >= 2) {
	                return str;
	            } else {
	                return '0' + str;
	            }
	        },
	        calc: function() {
	            var remain = this.remain - this.time.elapse;
	            if (remain < 0) {
	                remain = 0;
	            }
	            this.time.D = String(parseInt(remain / 86400));
	            this.time.DD = this.format(this.time.D);
	            this.time.h = String(parseInt((remain - parseInt(this.time.D) * 86400) / 3600));
	            this.time.hh = this.format(this.time.h);
	            this.time.H = String(parseInt(remain / 3600));
	            this.time.HH = this.format(this.time.H);
	            this.time.m = String(parseInt((remain - parseInt(this.time.H) * 3600) / 60));
	            this.time.mm = this.format(this.time.m);
	            this.time.M = String(parseInt(remain / 60));
	            this.time.MM = this.format(this.time.M);
	            this.time.s = String(remain - parseInt(this.time.M) * 60);
	            this.time.ss = this.format(this.time.s);
	            this.time.S = String(remain);
	            this.time.SS = this.format(this.time.S);
	            // console.log(remain, this.D, this.h, this.hh, this.H, this.HH, this.m, this.MM, this.s, this.ss, this.S, this.SS);
	            return remain > 0;
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "style": {
	    "overflow": "hidden",
	    "flexDirection": "row"
	  },
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrap": {
	    "overflow": "hidden"
	  }
	})
	})

/***/ },
/* 8 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-marquee", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        step: 0,
	        count: 0,
	        index: 1,
	        duration: 0,
	        interval: 0,
	        outofview: false
	    }},
	    ready: function () {
	        if (this.interval > 0
	                && this.step > 0
	                && this.duration > 0) {
	            this.nextTick();    
	        }
	    },
	    methods: {
	        nextTick: function() {
	            var self = this;
	            if (this.outofview) {
	                setTimeout(self.nextTick.bind(self), self.interval);
	            } else {
	                setTimeout(function() {
	                    self.animation(self.nextTick.bind(self));
	                }, self.interval);
	            }
	        },
	        animation: function(cb) {
	            var self = this;
	            var offset = -self.step * self.index;
	            var $animation = __weex_require__('@weex-module/animation');
	            $animation.transition(this.$el('anim'), {
	              styles: {
	                transform: 'translateY(' + String(offset) + 'px) translateZ(0)'
	              },
	              timingFunction: 'ease',
	              duration: self.duration
	            }, function() {
	                self.index = (self.index + 1) % (self.count);
	                self.$emit('change', {
	                    index: self.index,
	                    count: self.count
	                });
	                cb && cb();
	            });
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrap"
	  ],
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "div",
	      "id": "anim",
	      "classList": [
	        "anim"
	      ],
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrap": {
	    "overflow": "hidden",
	    "position": "relative"
	  },
	  "anim": {
	    "flexDirection": "column",
	    "position": "absolute",
	    "transform": "translateY(0) translateZ(0)"
	  }
	})
	})

/***/ },
/* 9 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-navbar", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',

	          //导航条背景色
	          backgroundColor: 'black',

	          //导航条高度
	          height: 88,

	          //导航条标题 
	          title: "",

	          //导航条标题颜色
	          titleColor: 'black',

	          //右侧按钮图片
	          rightItemSrc: '',

	          //右侧按钮标题
	          rightItemTitle: '',

	          //右侧按钮标题颜色
	          rightItemColor: 'black',

	          //左侧按钮图片
	          leftItemSrc: '',

	          //左侧按钮标题
	          leftItemTitle: '',

	          //左侧按钮颜色
	          leftItemColor: 'black',
	        }},
	        methods: {
	          onclickrightitem: function (e) {
	            this.$dispatch('naviBar.rightItem.click', {});
	          },
	          onclickleftitem: function (e) {
	            this.$dispatch('naviBar.leftItem.click', {});
	          }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "height": function () {return this.height},
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "attr": {
	    "dataRole": function () {return this.dataRole}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "right-text"
	      ],
	      "style": {
	        "color": function () {return this.rightItemColor}
	      },
	      "attr": {
	        "naviItemPosition": "right",
	        "value": function () {return this.rightItemTitle}
	      },
	      "shown": function () {return !this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "right-image"
	      ],
	      "attr": {
	        "naviItemPosition": "right",
	        "src": function () {return this.rightItemSrc}
	      },
	      "shown": function () {return this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "left-text"
	      ],
	      "style": {
	        "color": function () {return this.leftItemColor}
	      },
	      "attr": {
	        "naviItemPosition": "left",
	        "value": function () {return this.leftItemTitle}
	      },
	      "shown": function () {return !this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "left-image"
	      ],
	      "attr": {
	        "naviItemPosition": "left",
	        "src": function () {return this.leftItemSrc},
	        "resize": "contain"
	      },
	      "shown": function () {return this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "center-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "naviItemPosition": "center",
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "container": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "width": 750
	  },
	  "right-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "right": 32,
	    "textAlign": "right",
	    "fontSize": 40,
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "left-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "left": 32,
	    "textAlign": "left",
	    "fontSize": 40,
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "center-text": {
	    "position": "absolute",
	    "width": 500,
	    "bottom": 21,
	    "left": 125,
	    "textAlign": "center",
	    "fontSize": 40,
	    "fontWeight": "bold",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "left-image": {
	    "position": "absolute",
	    "bottom": 24,
	    "left": 32,
	    "width": 43,
	    "height": 43
	  },
	  "right-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "right": 28,
	    "width": 50,
	    "height": 50
	  }
	})
	})

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-navpage", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(9);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',
	          backgroundColor: 'black',
	          height: 88,
	          title: "",
	          titleColor: 'black',
	          rightItemSrc: '',
	          rightItemTitle: '',
	          rightItemColor: 'black',
	          leftItemSrc: '',
	          leftItemTitle: '',
	          leftItemColor: 'black',
	        }}
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "wxc-navbar",
	      "attr": {
	        "dataRole": function () {return this.dataRole},
	        "height": function () {return this.height},
	        "backgroundColor": function () {return this.backgroundColor},
	        "title": function () {return this.title},
	        "titleColor": function () {return this.titleColor},
	        "leftItemSrc": function () {return this.leftItemSrc},
	        "leftItemTitle": function () {return this.leftItemTitle},
	        "leftItemColor": function () {return this.leftItemColor},
	        "rightItemSrc": function () {return this.rightItemSrc},
	        "rightItemTitle": function () {return this.rightItemTitle},
	        "rightItemColor": function () {return this.rightItemColor}
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "wrapper"
	      ],
	      "style": {
	        "marginTop": function () {return this.height}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750
	  }
	})
	})

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-tabbar", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(12);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          tabItems: [ ],
	          selectedIndex: 0,
	          selectedColor: '#ff4a46',
	          unselectedColor: '#cdcdd4',
	        }},
	        created: function () {
	          this.selected(this.selectedIndex);

	          this.$on('tabItem.onClick',function(e){
	            var detail= e.detail;
	            this.selectedIndex = detail.index;
	            this.selected(detail.index);

	            var params = {
	              index: detail.index
	            };
	            this.$dispatch('tabBar.onClick', params);
	          });
	        },
	        methods: {
	            selected: function(index) {
	              for(var i = 0; i < this.tabItems.length; i++) {
	                var tabItem = this.tabItems[i];
	                if(i == index){
	                  tabItem.icon = tabItem.selectedImage;
	                  tabItem.titleColor = this.selectedColor;
	                  tabItem.visibility = 'visible';
	                }
	                else {
	                  tabItem.icon = tabItem.image;
	                  tabItem.titleColor = this.unselectedColor;
	                  tabItem.visibility = 'hidden';
	                }
	              }
	            },  
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "embed",
	      "classList": [
	        "content"
	      ],
	      "style": {
	        "visibility": function () {return this.visibility}
	      },
	      "repeat": function () {return this.tabItems},
	      "attr": {
	        "src": function () {return this.src},
	        "type": "weex"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "tabbar"
	      ],
	      "append": "tree",
	      "children": [
	        {
	          "type": "wxc-tabitem",
	          "repeat": function () {return this.tabItems},
	          "attr": {
	            "index": function () {return this.index},
	            "icon": function () {return this.icon},
	            "title": function () {return this.title},
	            "titleColor": function () {return this.titleColor}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "width": 750,
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0
	  },
	  "content": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "marginTop": 0,
	    "marginBottom": 97
	  },
	  "tabbar": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 97
	  }
	})
	})

/***/ },
/* 12 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tabitem", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          index: 0,
	          title: '',
	          titleColor: '#cdcdd4',
	          icon: '',
	          backgroundColor: '#ffffff',
	        }},
	        methods: {
	          onclickitem: function (e) {
	            var vm = this;
	            var params = {
	              index: vm.index
	            };
	            vm.$dispatch('tabItem.onClick', params);
	          }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "events": {
	    "click": "onclickitem"
	  },
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "tab-icon"
	      ],
	      "attr": {
	        "src": function () {return this.icon}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "tab-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "container": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "height": 97,
	    "borderTop": "1px solid #dddddd"
	  },
	  "top-line": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "height": 2
	  },
	  "tab-icon": {
	    "marginTop": 10,
	    "width": 48,
	    "height": 48
	  },
	  "tab-text": {
	    "textAlign": "center",
	    "fontSize": 20,
	    "color": "#cdcdd4",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  }
	})
	})

/***/ }
/******/ ]);