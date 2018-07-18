# etm-wallet

## Build Setup

``` bash
# install dependencies
npm install
# or
yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目结构（src目录）
```tree
│  App.vue                          #组件入口
│  main.js                          #js入口
│  
├─assets                            #静态资源目录
│  ├─api                                #api统一管理（这里没写）
│  │      index.js
│  │      
│  ├─css                            #CSS
│  │      iconfont.css                  #字体图标样式定义
│  │      public.css                    #公用样式（主要是分页样式）
│  │      reset.css                     #样式重置表
│  │      
│  ├─iconfont                       #iconfont
│  │      demo.css
│  │      demo_fontclass.html
│  │      demo_symbol.html
│  │      demo_unicode.html
│  │      iconfont.css
│  │      iconfont.eot
│  │      iconfont.js
│  │      iconfont.svg
│  │      iconfont.ttf
│  │      iconfont.woff
│  │      
│  ├─images                         #图片
│  │      1.png
│  │      ...
│  │      
│  └─js
│          gen.js                       #根据密码生成公钥、私钥、地址
│          utils.js                     #工具函数统一管理
│          
├─base                              #基础组件
│  │  filter-btn.vue                    #SCV矿工列表的过滤BTN及矿工说明弹框
│  │  nodata.vue                        #无数据组件
│  │  page.vue                          #分页组件
│  │  scv-table.vue                     #SCV表格
│  │  second-secret.vue                 #二级密码弹框
│  │  
│  ├─application                        #应用中心二级组件
│  │      applist.vue
│  │      download.vue
│  │      
│  ├─person                             #个人中心二级组件
│  │      account.vue
│  │      lock-up.vue
│  │      second-password.vue
│  │      
│  ├─scv-miner                          #SCV矿工列表二级组件
│  │      candidate-miners.vue
│  │      formal-miners.vue
│  │      remaining-miners.vue
│  │      
│  └─vote                               #该版块被废弃
│          record.vue
│          trustee-list.vue
│          vote-for-me.vue
│          
├─components                        #业务组件
│      application.vue                  #应用中心
│      block-appear.vue                 #区块生产
│      block-scan.vue                   #区块浏览
│      first-view.vue                   #首页
│      login.vue                        #登录
│      miner-detail.vue                 #矿工详情
│      miners-list.vue                  #矿工列表
│      node.vue                         #节点（已废弃）
│      person.vue                       #个人中心
│      select-miners.vue                #选择矿工
│      selected-miners.vue              #已选矿工
│      transfer.vue                     #转账
│      vote.vue                         #投票
│      
├─router                            #路由定义
│      index.js
│      
└─store                             #状态管理
        index.js
```
