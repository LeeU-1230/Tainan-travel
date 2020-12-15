var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    speed: 1000,
    loop: true,
    autoplay: {
        delay: 3000,
    },

    // If we need pagination
    // pagination: {
    //     el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})