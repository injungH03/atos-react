"use strict";
let fullpageApi = new fullpage("#fullpage",{
    licenseKey: "CL4M9-FMST7-051JK-HSS5H-UANCM",
    autoScrolling: !0,
    autoHeight: !0,
    scrollOverflow: !0,
    sectionSelector: ".section",
    keyboard: !0,
    navigation: !0,
    keyboardTab: !0,
    normalScrollElements: ".layer-popup",
    afterLoad: function(e, t, i) {
        4 === t.index && (animatePaths(),
        animateCircle());
        this.item.querySelectorAll(".bg-video").forEach(e => {
            e.play()
        }
        )
    },
    onLeave: function(e, t, i) {
        4 === t.index && (hidePaths(),
        hideCircle());
        this.item.querySelectorAll(".bg-video").forEach(e => {
            e.pause()
        }
        )
    }
});
const mainFun = function(e) {
    e.init = () => {
        t.init(),
        i.init()
    }
    ;
    const t = {
        init() {
            new Swiper(".visual-slide",{
                slidesPerView: 1,
                loop: !0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                speed: 700,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0,
                    renderBullet: function(e, t) {
                        return '<span class="' + t + '"><b class="progress-bar"> 0' + (e + 1) + "</b></span>"
                    }
                },
                on: {
                    init: function() {
                        var e = $(".swiper-pagination-bullet-active .progress-bar");
                        e.removeClass("bar-animation"),
                        e.addClass("bar-animation")
                    },
                    slideChange: function() {
                        var e = $(".swiper-pagination-bullet-active .progress-bar");
                        e.removeClass("bar-animation"),
                        e.addClass("bar-animation")
                    }
                },
                autoplay: {
                    delay: 8e3,
                    disableOnInteraction: !1
                }
            })
        }
    }
      , i = {
        init() {
            $("[data-pop]").hasClass("show", e => this.open(e)),
            $("body").on("click", ".popup-close", e => this.close(e))
        },
        open(e) {
            let t;
            t = "object" == typeof e ? "#" + $(e.currentTarget).attr("data-pop") : "#" + e,
            this.obj = $(e.currentTarget),
            $(t).attr({
                tabindex: 0,
                "aria-hidden": "false"
            }).addClass("show")
        },
        close(e) {
            ("object" == typeof e ? $(e.currentTarget).closest(".notice-popup") : $("#" + e)).attr({
                tabindex: "",
                "aria-hidden": "true"
            }).removeClass("show")
        }
    };
    return e.init(),
    {
        mainFun: e
    }
}(window.mainFun || {}, $(window));
let businessSlide = null;
function destroySwiper() {
    null !== businessSlide && (businessSlide.destroy(),
    businessSlide = null)
}
function initSwiper() {
    window.matchMedia("(max-width: 767px)").matches ? null === businessSlide && (businessSlide = new Swiper(".business-slide",{
        slidesPerView: 1.2,
        touch: !0,
        loop: !1
    })).update() : null !== businessSlide && destroySwiper()
}
initSwiper(),
window.addEventListener("resize", function() {
    initSwiper()
});
const paths = document.querySelectorAll(".item-line1, .item-line2, .item-line3, .item-line4")
  , circles = document.querySelectorAll(".item-circle1, .item-circle2");
function animatePaths() {
    paths.forEach( (e, t) => {
        setTimeout( () => {
            e.style.transition = "stroke-dashoffset 1s ease-in-out",
            e.style.strokeDashoffset = "0"
        }
        , 200 * t)
    }
    )
}
function hidePaths() {
    paths.forEach( (e, t) => {
        e.style.transition = "none",
        e.style.strokeDashoffset = e.getTotalLength()
    }
    )
}
function animateCircle() {
    circles.forEach( (e, t) => {
        setTimeout( () => {
            e.style.transition = "opacity 1.5s ease-in-out",
            e.style.opacity = "1"
        }
        , 400 * t)
    }
    )
}
function hideCircle() {
    circles.forEach( (e, t) => {
        e.style.transition = "none",
        e.style.opacity = "0"
    }
    )
}
function headAni() {
    $("#header").addClass("on"),
    setTimeout(function() {
        $("#header").addClass("active")
    }, 500),
    setTimeout(function() {
        $("#header .right-content").addClass("active")
    }, 1e3)
}
paths.forEach(e => {
    e.style.strokeDasharray = e.getTotalLength(),
    e.style.strokeDashoffset = e.getTotalLength()
}
),
circles.forEach(e => {
    e.style.opacity = "0"
}
),
headAni();
