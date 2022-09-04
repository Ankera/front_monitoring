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



### 三、常见埋点方案

##### 1、代码埋点

嵌入式的代码埋点，比如用户点击事件，会选择在用户输入时，增加一段代码；

优点：可以在任意时刻，精确发送数或保存所需要的数据信息；

缺点：工作量较大；

##### 2、可视化埋点

大部分是第三方提供

##### 3、无痕埋点

前端的任意一个事件被绑定一个标识，所有的事件都记录下来；通过定期上传记录文件，配合文件解析，解析出我们想要的数据，并生产可视化报告提供专业人员分析；

优点：采集全量数据，不会出现漏埋和误埋等现象；

缺点：数据传输和服务器增加压力，也无法灵活定制数据结构；



### 四、DOM解析流程图

![](https://egg-anker.oss-cn-hangzhou.aliyuncs.com/temp/DOM-analysis.png)

### 五、DOM解析时间流程表格

```json
{
    "connectStart": 1662306488367,
    "navigationStart": 1662306488364,
    "loadEventEnd": 1662306488463,
    "domLoading": 1662306488383,
    "secureConnectionStart": 0,
    "fetchStart": 1662306488367,
    "domContentLoadedEventStart": 1662306488455,
    "responseStart": 1662306488376,
    "responseEnd": 1662306488379,
    "domInteractive": 1662306488432,
    "domainLookupEnd": 1662306488367,
    "redirectStart": 0,
    "requestStart": 1662306488374,
    "unloadEventEnd": 1662306488381,
    "unloadEventStart": 1662306488381,
    "domComplete": 1662306488462,
    "domainLookupStart": 1662306488367,
    "loadEventStart": 1662306488462,
    "domContentLoadedEventEnd": 1662306488455,
    "redirectEnd": 0,
    "connectEnd": 1662306488367
}
```

![](https://egg-anker.oss-cn-hangzhou.aliyuncs.com/temp/js-times.png)



### 六、DOM、CSS、JS解析流程图

![](https://egg-anker.oss-cn-hangzhou.aliyuncs.com/temp/dom-parse.png)
