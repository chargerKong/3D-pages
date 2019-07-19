# $ES6$笔记

## 1.let

### 1.1 let不会有变量提升，完全遵守从上到下执行

```HTML
<script>
    console.log(x);  //报错，x is not defined
    let x=10;
</script>
```

### 1.2在当前作用域定义该变量，则在定义前不允许使用

```HTML
<script>
    let x = 10;
    function a(){
        console.log(x)	// 它不会去上一个作用域找，会直接报错  x is not defined
        let x=10;      //在此作用域中定义了let
        }
    a()
</script>
```

### 1.3 在同一个作用域下，不允许对相同变量名定义2次

```HTML
<script>
    let x = 10; 
    let x = 11;  //报错 'x' has already been declared
</script>
```

即使是和函数的形参同名也不行，函数形参就已经是定义了一次

```HTML
<script>
    (function (a){
        let a = 6;    //报错 'x' has already been declared
        console.log(a) 
    })()
</script>
```

# 2.$const$

$const$  代表着本代码中的固定不变的常量，比如$\pi$,$e$...  ，所以不可以被二次赋值，却可以被修改！

## 2.1 $const$ 拥有let的所有特性

```HTML
(function (a){
    const a = 6;   //报错 'x' has already been declared
    console.log(a)
})()
```

```HTML
<script>
    const a = 3;
    let a = 3  //报错 'x' has already been declared
</script>
```

## 2.2 $const$ 一旦出现，必须赋值

```HTML
<script>
    let a;  //let 可以先定义一个
    const b //const不行
</script>
```

## 2.3 $const$修改

```HTML
<script>
    const a = 1;
    a =2   //报错，因为const变量被重新赋值
</script>
```

```HTML
<script>
    const a = [1,2,3,4,5];
    a.pop()
    a.push(1)
    console.log(a)  //这个操作确实可以的
</script>
```

# 3. 作用域

在$ES6$中，一个大括号就是一个作用域，例如 

```HTML
if (true){
	let a = 10; //let 定义的a ，只属于这个大括号中。因此外面调用是会报错的
    }
console.log(a) //报错
```
for 循环点击例子，因为let i 的定义，for循环的{}形成了一个作用域, 在此作用域中又定义了函数，所以形成了闭包，数据 $i$可以被保留下来，被点击出来

```HTML
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
<script>
let aLi = document.querySelectorAll("li")
for (let i = 0; i < aLi.length; i++) {
	aLi[i].onclick = function(){
    	console.log(i)
    }
}
</script>
```

{}相当于函数的自执行。下面两段代码的意思完全一样的

```HTML
{}
(function(){})
```



# 4. 顶层对象

在$ES5$中，全局环境下直接给`var a=10`,  是直接赋值给window的，可以直接调用，例如

```HTML
var a = 5;
console.log(a === window.a)  //返回结果true
```

但是在$ES6$中，赋值不是给window的，是给一个不可调用的global

```HTML
let a = 5;
window.a // 返回undefined
```

但是无论何时，无中生有就是给window的



# 5. 解构赋值

一种新的赋值方式, 对应的赋值，多一个值不要紧，少一个值为undefined

```HTML
let [a,b,c]=[10,20]
let [d,e]=[30,40,50]
console.log([a,b,c],[d,e]) //[10,20,undefined]
```

## 5.1 简写

花括号赋值方式，里面的内容写成对象键值对的形式。赋值的是`aa`和`bb`,x和y 不过是一种对应的关系

```HTML
let {x:aa,y:bb}={x:10,y:20}
console.log(aa,bb);  //定义的变量为aa 和bb  ;
```

当键和值 相等时 ，可以进行简写。例如`let {x:x,y:y} `可以等价的写为

```HTML
let {x,y}={x:10,y:20}  
console.log(x,y);  // x = 10 .y = 20
```

**注意** ：如果找不到对应关系的值，那么就是未定义了

```HTML
let {x,y}={a:10,y:20}
console.log(x,y); // x = undefined, y =20
```



## 5.2 适用之处

当参数的形式固定的时候，适用解构赋值较为方便。例如

```HTML
let data = {
    name :'zhang',
    age :18,
    sex: 1
}
let fn = function (ob){
    let {name,age,sex} = ob
}

fn(data) //传参
```

## 5.3 函数传参默认值问题

**只有传入值为undefined的时候，函数才会使用默认值**

```HTML
function sum([a=4,b]){
	return a+b
}
console.log(sum([undefined,4]))  //返回8
```

使用花括号传值,在这里相当于`function sum({a:a,b:b})`

```HTML
function sum({a,b}){
	return a+b
}
let num = sum({a:4,b:4})
console.log(num)
```

加入默认值`function sum({a:a=4,b:b=4})`，因此可以被简写为`sum(a=4,b=4)`

```html
function sum({a=3,b}){
	return a+b
}
let num = sum({a:undefined,b:4})
console.log(num) //返回7
```

如果默认值写在最后的变量，那么就可以不给传值，也无需写上undefined。

如果两个值都有默认值，想用默认值的时候，调用的时候参数必须传{}，否则根据解构赋值的原理，将会变成`{a=3,b=4}=undefined`  那么就会报错，如果有大括号 `{a=3,b=4}={}`，没有值的话就会默认使用默认值

或者可以换一种写法

```HTML
function sum({a,b}={a:3,b:4}){
	return a+b
}
let num = sum()
console.log(num)
```

当没有传值的时候，可以使用默认的等号，这个时候就可以赋值给a 和 b 了

# 6.模板字符串

## 6.1 定义

let s = `` , 这个标记为Tab上面的那个键

## 6.2 好处

1. $ES5$中的 `“  ”`是不可以换行的，但是` `` `这个里面的字符串是可以换行的，例如

   ```html
   let s = `i am a 
       excellent 
       
       graduted stu
       dent`;
   ```

   ​

2. 字符串和变量的组合再也不需要 ` +`了，没有繁琐的拼接只需要在模板字符串中用`${}`，里面就可以$JS$代码。

   ```HTML
   let obj = {
       name : 'zhang'
       ,age :18
   }
   s = `I am ${obj.name}, ${obj.age} years old`

   ```
	​
 # 7.扩展运算符 `...`

扩展运算符可以把外面的`[]`给拔了

```HTML
let arr = [1,2,3,4];  
console.log(...arr)  //相当于console.log(1,2,3,4),所以结果为1 2 3 4 
```



## 7.1 用处

### 7.1.1复制一个不带引用的数组

```html
let arr = [1,2,3,4];
let arr2= [...arr]
console.log(arr===arr2)   // false
```

### 7.1.2 求最值

- $ES5$ 中，`Math.max(1,2,3)`可以返回3，括号中放入的是各种值，而不是数组


`Math.max.apply(Math,[1,2,3])` 函数的apply函数 第一个参数,改变函数this 指向，参数需要用`[]`包起来。因此刚好可以利用这个来求最值。

- $ES6$  `Math.max(...arr)` 即可

### 7.1.3 数组拼接

```HTML
let arr = [1,2,3,4]
let arr2 = [...arr, 4, 6] //方便的拼接
```

### 7.1.4 数组接收方式

```HTML
let [a,b,...c] = [1,2,3,4,5,6,7]  //c返回[3,4,5,6,7]
let [a,b,...c] = [1,2]  //c返回 [] 
```

`...c`（rest参数）必须放在最后面。...返回的必须是一个数组。



函数的形参接受方式，这里...z和$arguement$的作用差不多，接受所有的形参  ...z 是一个纯数组

```html
function wb(x,y,...z){
    console.log(x)
    console.log(y)
    console.log(z) // 输出 z = [3,4,5,6]
}	   

wb(1,2,3,4,5,6)
```

# 8. 新的$API$



```HTML
let arr=['a','b','c','d','e']
console.log(...arr.keys())    //数组的位置 0 1 2 3 4 
console.log(...arr.values())	// 相应位置的值 a b c d e
console.log(...arr.entries())	// 五个数组，相应的键值对 [0,'a'],[1,'b']
```

可以用`for of`使用于数组

```HTML
let arr=['a','b','c','d','e']
for (let i of arr.keys() ){
	console.log(i)        //输入 0 1 2 3 4 中间含有换行符
}
for (let i of arr.values() ){
	console.log(i)        //输入a b c d e 中间含有换行符
}
for (let [i,j] of arr.entries() ){
	console.log(i,j)        //输入 0 'a'    1 'b' ...中间含有换行符
}
```

可以用`for of`使用于`Object.keys(对象)`或者是`values(),entries()`

**$ES5$ `for in` 中遍历的问题**

遍历`ob`对象的时候能把他的原型也遍历出来

```HTML
var Fn = function(name,age ){
    this.name = name;
    this.age = age
}
Fn.prototype.x = 10;
var ob = new Fn("KLQ",18)

for (var i in ob){
	console.log(i,ob[i])
}
```

结果为

```html
name KLQ
age 18
x 10
```

这里的x 是属于原型上的



利用$ES6$ `for of`可以解决这个问题

```html
let Fn = function(name,age ){
    this.name = name;
    this.age = age
}
Fn.prototype.x = 10;
let ob = new Fn("KLQ",18)
for (let i of Object.keys(ob)){
	console.log(i,ob[i])
}
```

这样的结果是不包含x的。



# 9. 箭头函数

$ES6$中用于定义函数的另一种方式

```html
let b = ()=>{}
```

这个等价于

```html
let b = function(){}
```

## 9.1 简写

如果函数形参只有一个,可以把形参的括号去掉

```html
let b= (x) =>{console.log(x)}
//可以简写为
let b = x => {console.log(x)}
```

如果大括号内的代码只有一行，可以省略大括号，并且这个时候返回值为表达式的值，例如

```html
let b = (a,b)=>(a+b)
b(2,3)
```

第一，这个函数的代码只有一行，第二他输出的值为a+b 

因为`b(2,3)`是有返回值的，为5

***注意：箭头函数没有this，这里的this在函数被定义的时候就已经指向了函数所在的作用域***

# 10 Symbol（） 新的数据类型

## 10.1 定义及其性质

```html
let a = symbol('这里可以加标识')
```

性质：绝对唯一，不重复

## 用途

在不得已给对象加属性的时候，为了避免变量的重复，可以建一个symbol，因为绝对的唯一。例如

```HTML
let obj = {"name":"zhangsan","age":20};
let goudan = Symbol()
obj[goudan]="傻狗"
```



# 11. set 集合，无序不重复	

用途

```htm
let arr = [1,2,3,4,4,5]
let newArr = [...new Set(arr)]
```

返回一个不重复的数组

# 12. map数据结构

一般情况下，对象是不能作为一个key 存储在一个对象中，但是使用map可以

定义为

```html
let m = new Map()
```

set 和get 方法.可以往里面塞任何的key, 都可以

```html
m.set('name','zhangsan')
m.set(true,123)
```

可以使用`for(let [key,value] of m)`进行遍历获取。



# 13. 类与继承

关键词 Class、例如

```htm
class Person{
    //相当于初始化函数
    constructor(n,a){
        //定义私有变量
        this.name = n;
        this.age = a
    }
	//相当于原型方法
    showName(){
        console.log(this.name)
    }

}

let zhangsan = new Person('zhangsan',18)
zhangsan.showName()
```

虽然可以通过

`Teacher.prototype.showName=function(){}`来写，但是就不推荐了

## 13.2 继承

```html
zhangsan.showName()
class Teacher extends Person{
    constructor(n,a,i){
        //继承父类的私有方法
        super();
        this.id = i
    }
    showName(){
        //执行原来的方法，下面也可以继续改
        super.showName()
    }

}
```



这里的继承不需要管原型的问题。绝对不会影响父类的原型



# 14 对象简写，当属性名和变量名重合的时候

```html
let obj = {
    x,
    y,
    sum() {
        return this.x
    }
}
```

等价于

```HTML
let obj = {
    x:X,
    y:y,
    sum:function() {
        return this.x
    }
}
```

