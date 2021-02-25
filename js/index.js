window.addEventListener('load', function() {

    // get Element
    //close the header
    let header = document.querySelector('.app');
    let close = header.children[0].children[0];

    close.addEventListener('click', function() {
        header.style.display = 'none';
    });

    //goback button show or hide
    let goback = document.querySelector('.goback');
    let itemBox = document.querySelectorAll('.item');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= itemBox[0].offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    })

    //back to top button
    goback.addEventListener('click', function() {
        window.scroll(0, 0);
    })



})