/**
 * Extend bootstrap-multiselect.js to allow the dropdowns to make use of
 * bootstraps divider element.
 */
!function($) {
    "use strict";

    // Save a reference to the original multiselect component
    var _super = $.fn.multiselect;

    // Override the constructor
    function Multiselect(select, options) {
        // Run the original bootstrap multiselect to make all the proper
        // dropdowns
        _super.apply($(select), options);

        // Convert dividers to bootstrapper dividers properly
        this.make_dividers(select);

        // Convert select all entries to function properly
        this.make_select_all(select);
    }

    // Extend the Multiselect prototype and add _super functionality
    Multiselect.prototype = $.extend({}, _super.constructor.prototype, {
        constructor: Multiselect,
        _super: function() {
            var args = $.makeArray(arguments);
            _super.constructor.prototype[args.shift()].apply(this, args);
        },
        make_dividers: function(select) {
            $(select).find('option').each(function(index) {
                if($(this).hasClass('divider')) {
                    $(select)
                        .parent()
                        .find('ul.dropdown-menu li:eq(' + index + ')')
                        .replaceWith('<li class="divider">');
                }
            });
        },
        make_select_all: function(select) {
            $(select).find('option').each(function(index) {
                if($(this).hasClass('select_all')) {
                    var elem = $(select)
                        .parent()
                        .find('ul.dropdown-menu li:eq(' + index + ')');

                    // Remove the checkbox
                    elem.find('input').hide();

                    // Change the onclick action
                    elem.on('change', function(event) {
                        event.preventDefault();

                        // Disable any active state set on this object
                        $(this).removeClass('active');

                        // Set all the remaining elements to active/checked
                        $(this)
                            .nextAll(':has(input[type=checkbox]:visible:not(:checked))')
                            .each(function() {
                                $(this).find('input').click();
                            });
                    });
                }
            });
        },
    });

    // Override the original init functionality to make use of our new
    // constructor
    $.fn.multiselect = $.extend(function(option) {
        var args = $.makeArray(arguments),
            option = args.shift();

        return this.each(function () {
            var data = $(this).data('multiselect'),
                options = $.extend({}, _super.defaults, $(this).data(), typeof option == 'object' && option);

            if (!data) {
                $(this).data('multiselect', (data = new Multiselect(this, options)));
            }

            if (typeof option == 'string') {
                data[option]();
            }
        });
    }, $.fn.multiselect)
}(window.jQuery);
