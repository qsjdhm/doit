
module.exports = {
    path: 'ites-analytics',

    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/KernelCompare'),
                require('./routes/KernelTrend'),
                require('./routes/IntegratedPay'),
                require('./routes/CapitalCompare'),
                require('./routes/CapitalChange'),
                require('./routes/TotalRisk'),
                require('./routes/PayStatus'),//偿付能力状况表
                require('./routes/RiskComparative'),//风险对比分析
                require('./routes/RiskTendency'),//风险趋势分析
                require('./routes/RiskFactor'),//违约风险基础因子
                require('./routes/InvestmentComposition'),//投资构成分析
                require('./routes/InvestmentComparison'),//投资对比分析
                require('./routes/InvestmentTendency'),//投资趋势分析
                require('./routes/MainTarget'),//主要指标一览
                require('./routes/PayAbility'),//偿付能力分布
                require('./routes/ActualCapital'),//实际资本表
                require('./routes/AcceptCapital'),//认可资产表
                require('./routes/AcceptLiablity'),//认可负债表
                require('./routes/LifePremature'),//寿险合同未到期责任准备金
                require('./routes/MinimumCapital'),//最低资本表
                require('./routes/CapitalIndex'),//最低资本主要指标
                require('./routes/LiquidityRisk'),//流动性风险主要指标
                require('./routes/ComprehenFlow'),//综合流动比率
                require('./routes/FlowCover'),//流动覆盖率
                require('./routes/CashTest'),//基本情景现金流测试表
                require('./routes/PressureTest'),//压力情景现金流测试表
                require('./routes/RiskForm'),//风险对比分析
                require('./routes/InvestForm'),//投资构成分析
                require('./routes/InvestCompare'),//投资对比分析
                require('./routes/CapitalTrend'),//资本构成趋势分析
                require('./routes/InvestTrend'),//投资趋势分析
                require('./routes/UnderConstruction')//正在建设中
            ])
        })
    },
    /*  onEnter(nextState, replace){//进入route时触发的事件，可判断权限
     let session = XSmartStore.getSession();
     let loginRole = session?session.role:{};
     if (loginRole != "ircexanalyzeonly" && loginRole != "ircexanalyze" && loginRole != "ircexanalyzebaojianju") {//保监会和保监局
     replace("permission-dend");
     }
     },*/
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ItesAnalytics'))
        })
    },

    breadcrumbName:"智能分析"
}