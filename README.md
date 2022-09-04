# front_monitoring
前端监控



### 一、前进监控目标

#### 1、稳定性

- JS错误（JS执行错误或promise异常）；
- 资源异常（script、link）等资源加载异常；
- 接口错误（ajax等异常）；
- 白屏（页面空白）；

#### 2、用户体验

- DOM加载时间、性能优化；
- TTFB；
- FP；
- FCP；
- FMP；
- FID；

#### 3、业务

- PV；页面浏览量或点击量；
- UV；访问某个站点的不同IP地址的人数；
- 页面的停留时间；



### 二、前端监控流程

前端埋点；

数据上报；

分析和计算将采集到的数据进行加工汇总；

可视化展示，将数据按照各种维度进行展示；

![](https://egg-anker.oss-cn-hangzhou.aliyuncs.com/temp/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_833d11d2-6be4-40be-afab-d218072d945f.png)
