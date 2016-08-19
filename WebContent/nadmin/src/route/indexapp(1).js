import '../style/base/uncompileBase.css';

import ReactDOM from 'react-dom';
import React from 'react';
import 'core-js/fn/object/assign';
import { Router, browserHistory, hashHistory,  } from 'react-router'
import useBasename from 'history/lib/useBasename'

import xSmartLib from '../common/lib'
import CONSTANTS_GLOBAL from '../constants/GLOBAL'
import stubbedCourses from '../stubs/COURSES'

import MainPage from '../page/MainPage/MainPage';
import ErrorPage from '../page/ErrorPage/ErrorPage';
import MenuPage from '../page/MainPage/MenuPage/MenuPage';
import Welcome from '../page/MainPage/Welcome/Welcome';
import ItesAnalytics from '../routes/ItesAnalytics/components/ItesAnalytics';

//import { createHistory, createHashHistory, useBasename } from 'history';

if (!Modernizr.json) {
  console.info("add polyfill json");
  yepnope('../assets/js/polyfill/respond/json3_min.js');
}

if (!Modernizr.localstorage) {
  console.info("add polyfill localstorage");
  yepnope('../assets/js/polyfill/localStorage/localStorage.js');
}

if (!window.matchMedia) {
  console.info("add polyfill matchMedia");
  yepnope('../assets/js/polyfill/matchMedia/matchMedia.js');
}

// 此处用于添加根路径
//const history = useBasename(createHashHistory)({
//  queryKey: '_k',
//  //basename: global.XSMART.host +'/x-smart/ircexanalyze/dist/'
//  basename: '/'
//});
let rootRoute = {
  component: 'div',
  //path: `${global.XSMART.host}/x-smart/ircexanalyze/dist/`,{pageMenu: MenuPage, pageContent:}
  path: '/',
  childRoutes: [ {
    component: MainPage,
    indexRoute: { component:  Welcome },
    childRoutes: [
      require('../routes/ItesAnalytics'),  // 智能分析
      require('../routes/ItesAnalyticsMenu'),  // 智能分析（带看板）
      require('../routes/intelligentSearch'), // 全局搜索
      require('../routes/CustomAnalysis'), // 报告查询
      //require('../routes/IntelligentAssistant'),  // 报送统计
      require('../routes/SubmitManage'), // 报送统计
      require('../routes/ModelReportBrowse'), //查看详细校验报告
    	require('../routes/InformationPublish'), //信息发布
      require('../routes/CompanyReport'),//公司报告
      require('../routes/ExcelPlugins'),//excel插件
      require('../routes/RateRegulation'),//评分监管
      require('../routes/ClassifiedRegulation'),//分类监管
      require('../routes/XConsole'),//初始化任务
      require('../routes/PermissionDend'),//无权限页面
      require('../routes/CircSubmitManage')//保监局报送管理
    ]
  },
    {
      path: '*',
      component: ErrorPage
    } ]
}

if (0) {
  rootRoute.childRoutes[0].component = XSmartPageOrg;
}

let comRootRoute = <Router history={withExampleBasename(hashHistory, __dirname)} routes={rootRoute} />;

function DomReady() {
  ReactDOM.render( comRootRoute, document.getElementById('x-smart-page') );
  //comRootRoute.transitionTo('/calendar');
}

function withExampleBasename(history, dirname) {
  return useBasename(() => history)({ basename: `${dirname}` })
}

ready(DomReady);

//console.info('global.XSMART %o', global.XSMART);