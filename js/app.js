angular.module('app', ['ngRoute'])
// 配置路由
.config(function ($routeProvider) {
    $routeProvider
    // 配置登录页面的路由
    .when('/login', {
        // 将外部的login.html引入进来
        templateUrl: 'view/login.html',
        controller: 'loginCtrl'
    })
    //配置主页面路由
    .when('/' , {
        templateUrl: 'view/main.html',
        controller : 'mainCtrl'
    })
    //创建用户
    .when('/createuser' , {
        templateUrl : 'view/createuser.html',
        controller : 'createuserCtrl'
    })
    //用户列表 pageNum表示用户列表页码
    .when('/userlist/:pageNum' , {
        templateUrl : 'view/userlist.html',
        controller : 'userlistCtrl'
    })
    //用户详情 userId表示用户的id
    .when('/userdetail/:userId' , {
        templateUrl : 'view/userdetail.html',
        controller : 'userdetailCtrl'
    })
     //创建新闻
    .when('/createnews' , {
        templateUrl : 'view/createnews.html',
        controller : 'createnewsCtrl'
    })
    //新闻列表 pageNum表示新闻列表页码
    .when('/newslist/:pageNum' , {
        templateUrl : 'view/newslist.html',
        controller : 'newslistCtrl'
    })
    //新闻详情 newId表示新闻的id
    .when('/newsdetail/:userId' , {
        templateUrl : 'view/newsdetail.html',
        controller : 'newsdetailCtrl'
    })
})
//定义创建用户控制器 
.controller('createuserCtrl' , function ($scope , $http , $location) {
    $scope.user = {};
    $scope.submit = function (){
        //将user数据发送到后端要用$http服务 
        $http({
            method : 'POST',
            url : 'action/createuser.php',
            data : $scope.user
        })
        .success(function (res){
            //提交成功默认跳转到列表的第一页
            if(res && res.errno == 0){
                $location.path('/userlist/1')
            }
        })
    }
})
//定义用户列表控制器 
.controller('userlistCtrl' , function ($scope , $routeParams,  $http) {
    // 在该模块中，我们只有先获取数据才能将视图渲染出来
    // 获取什么样的数据，要根据pageNum来决定，
    $scope.num = $routeParams.pageNum  //表示我们当前列表页的页码，是一个字符串
    // console.log($scope.num)
    // 发送一个请求来获取数据
    $http({
        method : 'GET',
        url : 'action/userlist.php',
        params : {
            pageNum : $scope.num
        }
    })
    .success(function (res){
        if(res && res.errno == 0){
            //将数据保存在list变量中
            $scope.list = res.data
            console.log($scope.list)
        }
    })
})
//定义用户详情控制器 
.controller('userdetailCtrl' , function ($scope , $routeParams , $http) {
    // 在该模块中，我们要先获取数据，再渲染页面，我们获取数据要根据用户id来或区域
    // $scope.id = $routeParams.userId
    $http({
        url : 'action/userdetail.php',
        method : 'GET',
        params : {
            id : $routeParams.userId
        }
    })
    .success(function (res){
        //如果返回成功，将data数据保存在user变量中
        if(res && res.errno == 0){
            $scope.user = res.data
            console.log( $scope.user)
        }
    })
})
//创建新闻控制器 
.controller('createnewsCtrl' , function ($scope , $http , $location) {
    //提交信息，并且返回成功时跳转到列表页
    $scope.submit = function (){
        $http({
            method : 'POST',
            url : 'action/createnews.php',
            data : $scope.news
        })
        .success(function (res){
            //如果请求返回成功，我们跳转到新闻列表页
            if(res && res.errno == 0){
                //跳转到默认的第一页
                $location.path('/newslist/1')
            }
        })
    }
})
//新闻列表控制器 
.controller('newslistCtrl' , function ($scope , $http , $routeParams) {
    //将页码参数保存在作用域中
    $scope.num = $routeParams.pageNum;
    //先请求数据，再渲染页面
    $http({
        method : 'GET',
        url : 'action/newslist.php',
        params : {
            pageNum : $scope.num
        }
    })
    .success(function (res){
        if(res && res.errno == 0){
            //将请求得到的数据保存在list变量中
            $scope.list = res.data;
            // console.log($scope.list)
        }
    })
})
//新闻详情控制器 
.controller('newsdetailCtrl' , function ($scope , $http , $routeParams) {
    //先获取数据再渲染页面
    $http({
        method : 'GET',
        url : 'action/newsdetail.php',
        params : {
            id : $routeParams.newId
        }
    })
    .success(function (res){
        //请求数据成功就将数据保存在news变量中
        if(res && res.errno == 0){
            $scope.news = res.data;
            // console.log($scope.news)
        }
    })
})
//定义主页面的控制器
.controller('mainCtrl' , function ($scope , $interval){
    $scope.date = new Date();
    $interval(function (){
        $scope.date = new Date();
    },1000)
})
// 定义导航列表控制器
.controller('navCtrl', function ($scope) {
    $scope.list = [
        {
            title: "主模块",
            childlist: [
                {
                    title: '主页面',
                    url: '#/'
                }
            ]
        },
        {
            title: "用户模块",
            childlist: [
                {
                    title: '用户列表',
                    url: '#/userlist/1'
                },
                {
                    title: '创建用户',
                    url: '#/createuser'
                }
            ]
        },
        {
            title: '新闻模块',
            childlist: [
                {
                    title: '新闻列表',
                    url: '#/newslist/1'
                },
                {
                    title: '创建新闻',
                    url: '#/createnews'
                }
            ]
        }
    ]
})
// 定义登录视图控制器
.controller('loginCtrl', function ($scope , $http , $location , $rootScope) {
    $scope.submit = function (){
        //将用户信息提交到后端
        $http({
            method : 'POST',
            url : 'action/login.php',
            data : $scope.user
        })
        .success(function (res){
            if(res && res.errno === 0){
                $rootScope.username = res.data.username
                $location.path('/')
            }
        })
    }
})
.run(function ($rootScope, $http, $location) {
    // 判断用户是否登录
    $http({
        url: 'action/checkLogin.php',
        method: 'GET'
    })
    .success(function (res) {
        // 判断返回的信息，如果res中data有数据那么就渲染主页面，如果没有数据，就渲染登录页面
        if (res && res.data) {
            // 进入主页面
            $rootScope.username = res.data.username
            $location.path('/')
        } else {
            // 进入登录页面
            // 将hash设置成#/login
            $location.path('/login')
        }
    })

});