$(function() {

//*********** Carousel *********** //
    $('.jcarousel').jcarousel({
        transitions: true,
        animation: {
            duration: 600,
            easing:   'cubic-bezier(.46,.16,.66,.92)'
        },
        wrap: 'circular'
    });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .jcarouselPagination({
            'item': function(page, carouselItems) {
                return '<a href="#' + page + '"></a>';
            }
        });

//*********** SelectBox *********** //

    $("select").selectBox({
        menuTransition: "fade",
        keepInViewport: true,
        bottomPositionCorrelation: 0
    })
    .change(function(event) {
        $(".selectBox-container")
            .removeClass()
            .addClass("selectBox-container " + event.target.value);
    });

//*********** CheckBox *********** //

    $(".js-wrapper").mousedown(function(event) {
        // don't fire click event on 'secret message' showing
        if ($(event.target).hasClass("message")) {
            return false;
        }
        // don't fire event on disabled input
        var input = $(this).find(".js-native-checkbox");
        if (input.attr("disabled")) return false;

        changeCheck($(this), input);
    });

    // if any checkboxes are checked or disabled, style them properly
    $(".js-wrapper").each(function() {
        changeCheckStart($(this));
    });

    // don't check native checkbox on click (conflict with script logic)
    $(".js-native-checkbox").click(function(event) {
        event.preventDefault();
    });

    // Helpers for js checkbox
    function changeCheck(el, input) {
        var container = el.find(".js-checkbox-container"),
        message = el.find(".message");

        if (!input.attr("checked")) {
            container.html('\u2228');
            input.attr("checked", true);
            message.css("display", "block");
        }
        else {
            container.html("");
            input.attr("checked", false);
            message.css("display", "none");
        }
        // fire event manually
        input.change();
    }

    function changeCheckStart(el) {
        var el = el,
        container = el.find(".js-checkbox-container"),
        input = el.find(".js-native-checkbox");

        if (input.attr("checked")) {
            container.html("\u2228");
        }

        if (input.attr("disabled")) {
            el.addClass("label-disabled");
            container.addClass("input-disabled");
        }
    }

//*********** Navigation *********** //
    // jQuery part

    // $(".inner-list").hide();
    //
    // $(".navigation a").click(function(event) {
    //     event.preventDefault();
    // });
    //
    // $(".list-container").hover(
    //     function() {
    //         var submenu = $(this).children("ul");
    //         submenu.slideToggle(250);
    //         submenu.toggleClass("animated");
    //     }
    // );

    // JavaScript part

    // Hide all submenues (if user has no js, everithing would be visible by default)
    // var submenues = document.getElementsByClassName("inner-list");
    // var len = submenues.length;
    // for (var i = 0; i < len; i++) {
    //     submenues[i].style.display = "none";
    // };

    // Prevent page reload on menu items click
    var links = document.querySelectorAll(".navigation a");
    len = links.length;
    for (var i = 0; i < len; i++) {
        links[i].addEventListener("click", function(event) {
            event.preventDefault();
        });
    }

    // Show submenues on parent hover
    var listContainers = document.getElementsByClassName("list-container");
    len = listContainers.length;

    // attach hover listeners to every list container
    for (var i = 0; i < len; i++) {
        listContainers[i].addEventListener("mouseenter", function() {
            var innerList = this.children[1];

            // animate slideDown effect
            animateSlideDown(innerList, 1000, 3);
        });

        listContainers[i].addEventListener("mouseleave", function() {
            var innerList = this.children[1];
            innerList.style.display = "none";
        });
    }

    function calcHeight(elem) {
        // get height of submenu list
        var initialTop = elem.style.top;
        elem.style.top = "-10000px";
        elem.style.display = "flex";
        var height;
        if (elem.offsetHeight) {
         height = elem.offsetHeight;
        }
        else if (elem.style.pixelHeight) {
         height = elem.style.pixelHeight;
        }
        console.log(height);
        elem.style.top = initialTop;
        return height;
    }

    function animateSlideDown(element, duration, step) {
        // find initial height of list
        var actualHeight = calcHeight(element);

        // prepare for animation
        element.style.overflow = "hidden";
        element.style.height = 0;

        // Animate slideDown effect
        var duration = 1000; // wanted animation duration
        var step = 3; // num of pixels per frame
        var frames = Math.floor(actualHeight / step); // num of frames
        var tick = Math.floor(duration / frames);
        var recalculatedDuration = tick * frames; // actual animation duration
        console.log("frames: ", frames, "tick: ", tick, "duration: ", recalculatedDuration);
        var currentHeight = actualHeight % step;
        var renderFrame = setInterval(function() {
            currentHeight += step;
            element.style.height = currentHeight + "px";
            // console.log(innerList.style.height);
        }, tick);

        setTimeout(function() {
            console.log("inside setTimeout");
            clearInterval(renderFrame);
            console.log(element.style.height);
        }, recalculatedDuration);
    }

}); // end of ready
