;(function($, window, document, undefined) {
    'use strict';

    const $document = $(document),
        $window = $(window),
        $body = $('body'),
        $html = $('html'),
        $shadow = $('#shadow'),
        $call = $('#call'),
        $container = $('#container'),

        stuck = new IntersectionObserver(
            ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
            {threshold: [1]}
        );

    $(document).ready(function() {

        stretchFullScreen();

        if ($call.length)
            stuck.observe(document.querySelector('#call'));

        // call aside
        $document.on('click', '.call-aside', function (e) {
            e.preventDefault();
            let self = $(this);

            if (self.data('trigger')) {
                $body
                    .removeClass(function (index, css) {
                        return (css.match(/\bopen-\S+/g) || []).join(' ');
                    })
                    .addClass('open-' + self.data('trigger'));

                $html.css('overflow', 'hidden');
                $shadow.addClass('active');
            }
        });
        // end call aside

        // close aside
        $document.on('click', '#shadow, .close-aside', function(e) {
            e.preventDefault();

            $body.removeClass(function (index, css) {
                return (css.match(/\bopen-\S+/g) || []).join(' ');
            });

            $html.css('overflow', '');
            $shadow.removeClass('active');
        });
        // end close aside


        //- set up button
        $document.scroll(function() {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop,
                up = $('.up');

            if (scrolled > 100 && $('.up:hidden')) {
                up.fadeIn();
            } else {
                up.fadeOut();
            }

            if ((scrolled + $(window).height() - up.height()) >= $('.footer').offset().top) {
                up.addClass('absolute');
            } else {
                up.removeClass('absolute');
            }
        });

        $document.on('click', '.up', function(e) {
            e.preventDefault();
            $('body,html').animate({scrollTop: 0}, 800);
        });

        //- end set up button

        $document.on('click', '.content__open', function() {
            $(this).closest('.content').toggleClass('active');
        });
    });

    $(window).on('resize', function() {
        stretchFullScreen();
    });



    // let stretch block out of container
    function stretchFullScreen() {
        let winWidth = $window.width(),
            stretchBox = $('.stretch'),
            gap = winWidth - $container.outerWidth();

        if (stretchBox.length) {
            if (winWidth > $container.outerWidth()) {
                stretchBox.css({'width': winWidth, 'left': (gap + 30) / -2 + 'px'});
            } else {
                stretchBox.removeAttr('style');
            }
        }
    }
    // end let stretch block out of container




    // return true if desktop with chosen size
    function desktopSize(size) {
        return $window.width() >= size;
    }

}($, window, document));




