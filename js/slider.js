window.addEventListener('load', function() {

    // slider
    //get elements
    let sliderbox = document.querySelector('.slider');
    let ul = sliderbox.children[0];
    let ol = sliderbox.children[1];

    //get width of slider box 
    let w = sliderbox.offsetWidth;
    // console.log(w);

    // 1. sing setInterval 
    let index = 0;
    let timer = setInterval(function() {
        index++;
        //using translate and transition
        //when timer start ul of slider_box will move 
        let translatex = -(index * w);
        ul.style.transition = 'all 0.9s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 3000);


    // 2. jump back to the 1st pic
    //must wait unitl the trasition animation finish
    ul.addEventListener('transitionend', function() {
        // console.log('transition end');
        // console.log(index);
        //if index==the number of the last pic ,let index =0 (the number of the first pic)
        if (index >= 3) {
            index = 0;
            // console.log(index);
            // remove transition animation 
            ul.style.transition = 'none';
            //let transition animation reastart
            let translatex = -(index * w);
            ul.style.transform = 'translateX(' + translatex + 'px)';

        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            //let transition animation reastart
            let translatex = -(index * w);
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }

        // 3. ol dots
        // using classList.toggle()
        // console.log(ol.children[0].classList);
        // no need for loop
        ol.querySelector('li.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })


    // 4. slider finger
    //touchstart--->toouchmove--->touchend
    let falg = false; //手指是否移动，不移动不会有回弹效果判断
    let startX = 0;
    ul.addEventListener('touchstart', function(e) {

        startX = e.targetTouches[0].pageX;
        // console.log(startX);

        // stop timer
        clearInterval(timer);

        falg = true;
    })

    let moveX = 0;
    ul.addEventListener('touchmove', function(e) {

        moveX = e.targetTouches[0].pageX - startX;

        // move box
        let translatex = -(index * w) + moveX;

        //no need transition  animation
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';

        //取消默认行为（滑动时整个屏幕都会动）
        e.preventDefault();
    })

    ul.addEventListener('touchend', function(e) {
        if (falg == true) {
            // if finger moving more than 100px ,show the last pic or the next pic
            if (Math.abs(moveX) > 100) {
                //if move to left,then show the last one
                //if move to right,then show the nextone
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }

                let translatex = -(index * w);
                ul.style.transition = 'all 0.9s';
                ul.style.transform = 'translateX(' + translatex + 'px)';

            } else {
                // if finger moving less than 100px ,still be whiere it is 
                let translatex = -(index * w);
                ul.style.transition = 'all 0.9s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }

            // restart timer
            clearInterval(timer);
            setInterval(function() {
                index++;
                //using translate and transition
                //when timer start ul of slider_box will move 
                let translatex = -(index * w);
                ul.style.transition = 'all 0.9s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }, 3000);

        }
    })
})