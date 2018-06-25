//构建
function Promise(fn){
    var callback ;
    this.then = function(value){
        callback = value;

    }
    function resolve(){
        callback();
    }
    fn(resolve);
}

//链式支持

function Promise(fn){
    var promise = this,
        value = null;
        promise._resolves = [];


        this.then = function(onFulfilled){
            promise._resolves.push(onFulfilled);
            return this;

        }
        function resolve(value){
            setTimeout(function(){
                promise._resolves.forEach(function(callback){
                    callback(value);
                });

            },0)

        }
        fn(resolve);
}

//状态
function promise(fn){
    var promise = this,
        value = null;
        promise._resolves =[];
        promise._status = "pending";
        this.then = function(onFulfilled){
            if(promise._status == 'pending'){
                promise._resolves.push(onFulfilled);
                return this;
            }
            onFulfilled(value);
            return this;
        }

        function resolve(value){
            setTimeout(function(){
                promise._status = "funfilled";
                promise._resolves.forEach(function(callback){
                    callback(value);
                })

            },0)

        }
        fn(resolve);
}

function promise (fn){
    var promise = this,
        value   = null;
        promise._resolves = [];
        promise.status = 'pending';

        this.then = function(onFulfilled){
            return new Promise(function(onFulfilled){
                var ret  = typeof onFulfilled === 'function' &&onFulfilled(value) || value;
                resolve(ret);
            })
            if (promise._status === 'pending') {
                promise._resolves.push(handle);
            } else if(promise._status === FULFILLED){
                handle(value);
            }


        }
        function resolve(value) {
            setTimeout(function(){
                promise._status = "FULFILLED";
                promise._resolves.forEach(function (callback) {
                    value = callback( value);
                })
            },0);
        }
    
        fn(resolve);
}

//对象判断

function Promise(){
    var promise = this,
        value = null;
        promise._resolves = [];
        promise._status   = 'pending';

        this.then = function(onFulfilled){
            return new Promise(function(resolve){
                function handle(value){
                    var ret = typeof onFulfilled === 'function' && onFulfilled(value) ||value;
                    if(ret && typeof ret ['then'] =='function'){
                        ret.then(function(value){
                            resolve(value);

                        })
                    }else{
                        resolve(ret);
                    }
                }
                if(promise._status === 'pending'){
                    promise._resolves.push(handle);
                }else if(promise._status === FULFILLED){
                    handle(value);
                }

            })
        }
        function resolve(value) {
            setTimeout(function(){
                promise._status = "FULFILLED";
                promise._resolves.forEach(function (callback) {
                    value = callback.call(promise, value);
                })
            },0);
        }
    
        fn(resolve);
}

// 添加拒绝方法，添加一个数组方法存放