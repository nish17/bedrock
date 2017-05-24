/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function($) {
    'use strict';

    var exp = $('#main-header-copy').data('experience');

    $('.download-link').each(function(i, link) {
        if (exp && link.href.indexOf('scene=2') > -1) {
            // specify v=1 template for scene 2
            link.href = link.href.replace('scene=2', 'scene=2&xv=' + exp);
        }
    });

    // trigger fade-in CSS animation
    $(function() {
        $('html').addClass('ready');
    });

    var mqDesktop;

    if (typeof matchMedia !== 'undefined') {
        mqDesktop = matchMedia('(min-width: 760px)');
    }

    var point1 = $('#point-1 .label');
    var point2 = $('#point-2 .label');
    var point3 = $('#point-3 .label');

    var buttonOpen = '<button type="button" class="open" title="'+ Mozilla.Utils.trans('global-open') +'">'+ Mozilla.Utils.trans('global-open') +'</button>';
    var buttonNext = '<button type="button" class="next" title="'+ Mozilla.Utils.trans('global-next') +'">'+ Mozilla.Utils.trans('global-next') +'</button>';

    if (mqDesktop.matches) {
        setupPoints();
    }

    mqDesktop.addListener(function(mq) {
        if (mq.matches) {
            setupPoints();
        } else {
            unsetPoints();
        }
    });

    function setupPoints() {
        $('#point-1, #point-2').prepend(buttonOpen);

        point1.append(buttonNext);
        point2.append(buttonNext);

        point1.show();

        $('#point-1 .next').on('click', function() {
            point1.fadeOut('fast');
            point2.fadeIn('fast');
        });

        $('#point-2 .next').on('click', function() {
            point2.fadeOut('fast');
            point3.fadeIn('fast');
        });

        $('.point .open').on('click', function() {
            $('.point .label:visible').fadeOut('fast');
            $(this).next('.label').fadeIn('fast');
        });
    }

    function unsetPoints() {
        point1.attr('style', '');
        point2.attr('style', '');
        point3.attr('style', '');
        $('#point-1, #point-2').find('button.open, button.next').remove();
    }


    // Early attempt at making the eye follow the mouse

    // var eye = $('.eye span');
    // var iris = document.createElement('span');
    // eye.append(iris);

    // document.addEventListener('mousemove', function(event) {
    //     var x = event.pageX;
    //     var y = event.pageY;
    //     var offsets = iris.getBoundingClientRect();
    //     var left = (offsets.left - x);
    //     var top = (offsets.top - y);
    //     var rad = Math.atan2(top, left);
    //     iris.style.transform = 'rotate(' + rad + 'rad)';
    // });

})(window.jQuery);
