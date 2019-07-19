(function () {
    let ul = document.querySelector("#main .list"),
        num = 125,
        trZ = -1200,

        trX = 0,
        roX = 0,
        roY = -30,
        li = ul.children;
    let oCss = document.querySelector('#css');
    let oalert = document.getElementById("alert");
    let oMain = document.getElementById('main');
    let oBack = document.getElementById('back');
    let oAll = document.getElementById('all');
    let oframe = document.querySelector('#iframe iframe');
    // 样式书写
    let transformation = {
        Grid: function () {
            if (transformation.Grid.ifExe) return;
            
            Css = '';
            [...li].forEach((element, i) => {
                let trY = (Math.floor(i % 25 / 5) - 2) * 200;
                let trX = (i % 25 % 5 - 2) * 200;
                let trZ = (2 - Math.floor(i / 25) ) * 500;
                Css += `#main .list.Grid li:nth-child(${i+1}){
                    transform:translate3D(${trX}px,${trY}px,${trZ}px) !important;
                }`;
            });
            
            oCss.innerHTML += Css;
            transformation.Grid.ifExe = true

        },

        Helix: function () {
            if (transformation.Helix.ifExe) return;
            [...li].forEach((element, i) => {
                let cycle = 3;
                let roY = cycle * 360 / num * i;
                let trY = 150 * cycle / num * (i - num / 2);
                let trZ = 800;
                Css +=`#main .list.Helix li:nth-child(${i+1}){
                    transform:rotateY(${roY}deg) translateY(${trY}px) translateZ(${trZ}px) !important;
                }`;
            })
            oCss.innerHTML += Css;
            transformation.Helix.ifExe =true
        },

        Table: function () {
            if (transformation.Table.ifExe) return;
            let midY = Math.ceil((num - 18) / 18) + 3;
            let coor = [
                { x: 0, y: 0 },
                { x: 0, y: 17 },
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 1, y: 12 },
                { x: 1, y: 13 },
                { x: 1, y: 14 },
                { x: 1, y: 15 },
                { x: 1, y: 16 },
                { x: 1, y: 17 },
                { x: 2, y: 0 },
                { x: 2, y: 1 },
                { x: 2, y: 12 },
                { x: 2, y: 13 },
                { x: 2, y: 14 },
                { x: 2, y: 15 },
                { x: 2, y: 16 },
                { x: 2, y: 17 },
            ];

            [...li].forEach((element, i) => {
                let trY = ((i < 18 ? coor[i].x : Math.floor(i / 18) + 2) - midY / 2) * 150,
                    trX = ((i < 18 ? coor[i].y : i % 18) - 8.5) * 120;
                    Css +=`#main .list.Table li:nth-child(${i+1}){
                        transform:translate3d(${trX}px,${trY}px,0px) !important;
                    }`;
                // element.style.transform = `translate3d(${trX}px,${trY}px,0px)`;
            });
            oCss.innerHTML += Css;
            transformation.Table.ifExe =true
        },

        Sphere: function () {
            if (transformation.Sphere.ifExe) return;

            let cengNum = [1, 3, 7, 9, 11, 14, 21, 16, 12, 10, 9, 7, 4, 1];
            let len = cengNum.length;
            [...li].forEach((element, i) => {
                [ceng, ge] = ce(i);
                let roX = -90+180/(len-1)*(len-ceng-1);
                let trZ = 800;
                let roY = 360/cengNum[ceng]*(ge)+ceng*10;
                // console.log(roY)
                Css +=`#main .list.Sphere li:nth-child(${i+1}){
                    transform:rotateY(${roY}deg) rotateX(${roX}deg)  translateZ(${trZ}px) !important;
                }`; 
            });
            oCss.innerHTML += Css;
            transformation.Sphere.ifExe =true



            function ce(i) {
                let cengNum = [1, 3, 7, 9, 11, 14, 21, 16, 12, 10, 9, 7, 4, 1];
                let sum = 0;
                for (let ceng = 0; ceng < cengNum.length; ceng++) {
                    sum += cengNum[ceng];
                    if (i <= sum) {
                        ge = (sum - i)
                        return [ceng, ge]
                    }
                }

            }

        }
    };

    // 初始样式
    (function () {
        
        let oAlertTitle = oalert.querySelector(".title span")
            ,oAlertAuthor = oalert.querySelector(".author span")
            ,oAlertInfo = oalert.querySelector(".info span")
            ,oAlertImg = oalert.querySelector(".img img");

        for (let i = 0; i < num; i++) {
            let ali = document.createElement('li');
            let odata = data[i]||{
                title : "Wait"
                ,author : "Wait"
                ,time : "Wait"
                ,topic : "案例添加中，敬请期待……"
                ,dec : "案例添加中，敬请期待……"
                ,src : ""
                ,img : "wait.jpg"
            };

            let HTML = `<p class='title'>${odata.title}</p>
            <p class='author'>${odata.author}</p>
            <p class='time'>${odata.time}</p>`;
            
            ali.innerHTML = HTML;
            let trY = ((Math.random() - 0.5) * 4000);
            let trX = ((Math.random() - 0.5) * 4000);
            let trZ = ((Math.random() - 0.5) * 5000);

            // 添加li的点击事件
            ali.onclick = function(e){
                e.stopPropagation()
                // 框进入动画
                
                oAlertTitle.innerHTML = odata.title;
                oAlertAuthor.innerHTML = odata.author;
                oAlertInfo.innerHTML = odata.dec;
                oAlertImg.src = odata.img;
            

                // 弹窗层出现的动画
                oalert.style.transition='.0s';
                oalert.style.transform='scale(2)';

                // 重绘
                oalert.offsetLeft;

                oalert.style.transition='.5s';  
                oalert.style.transform='scale(1)';
                oalert.style.opacity='1';
               
                oalert.onclick = function(e){
                    e.stopPropagation()
                    
                    if (!odata.src) return
                    oAll.classList.add('left')
                    oframe.src = odata.src
                }
            }
            

            ali.style.transform = `translate3d(${trX}px,${trY}px,${trZ}px)`;
            ul.appendChild(ali)
        }

        ul.offsetLeft;
        transformation.Grid();
        ul.className='list Grid';
    })();




    // 点击变换形态！
    (function () {
        let aLi = document.querySelectorAll('#btn li');
        eventArr = ['Table', 'Sphere', 'Helix', 'Grid'];
        aLi.forEach((ele, i) => {
            ele.onclick = function () {
                transformation[eventArr[i]]();
                ul.className='list ' + eventArr[i]
            }
        });

    })();


    // 滚轮事件
    (function () {
        document.addEventListener('mousewheel', function (e) {
            delta = e.wheelDelta;
            trZ += delta
            trZ = delta > 0 ? Math.min(1500, trZ) : Math.max(-3100, trZ)
            ul.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`
        })
    })();

    // 拖拽和惯性处理
    (function () {

        //====================DOM二级事件添加和删除鼠标移动的带参数事件================
        // function move(e, s) {
        //     console.log(e.pageX, s)
        // }

        // function move1(e) {
        //     move(e, 2)
        // }
        // document.addEventListener("mousedown", function () {
        //     document.addEventListener('mousemove', move1)
        // })
        // document.addEventListener('mouseup', function () {
        //     document.removeEventListener('mousemove', move1)
        // })
        // =================DOM 0级事件 处理======================
        let lastX, lastY, x_, y_;
        document.onmousedown = function (e) {
            

            lastX = e.pageX;
            lastY = e.pageY;
            this.onmousemove = function (e) {
                let nx = e.pageX;
                let ny = e.pageY;
                x_ = nx - lastX;
                y_ = ny - lastY;
                lastX = nx;
                lastY = ny;
                roY += (x_) * 0.1;
                roX += -(y_) * 0.1;

                ul.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`
            }
        }

        document.onmouseup = function () {
            this.onmousemove = null
            // 惯性
            function m() {
                if (Math.abs(x_ || y_) < 0.1) return
                x_ *= 0.95
                y_ *= 0.95
                roY += (x_) * 0.1;
                roX += (y_) * -0.1;
                ul.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`
                requestAnimationFrame(m)
            }

            requestAnimationFrame(m)
        }




    })();

    (function(){
        oMain.onclick = function(){
            if (oalert.style.opacity ==='0') return;
            oalert.style.transform='scale(0) rotateY(360deg)';
            oalert.style.opacity= '0';
        }

        oBack.onclick = function(){
            
            oAll.classList.remove('left');
        }

    })()

})()

