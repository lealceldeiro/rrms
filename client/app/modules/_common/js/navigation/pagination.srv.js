/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var paginationSrv = function () {
    var vm = this;

    const FIRST_STEP = 8;

    vm.core = {
        rest: {
            offset: 0
        },

        itemsPerPage: 8,
        totalItems: 0,
        maxLinks: 7
    };

    vm.service = {
        setItemsPerPage: fnSetItemsPerPage,
        setTotalItems: fnSetTotalItems,

        getOffset: getOffset,
        getItemsPerPage: getItemsPerPage,
        getTotalItems: getTotalItems,
        getMaxLinks: getMaxLinks,
        getItemsPerPageSteps: fnGetItemsPerPageSteps,
        //
        resetPagination: fnResetPagination,
        initialise: fnInitialise,
        moveTo: fnMoveTo
    };

    return vm.service;

    function fnResetPagination() {
        vm.core.rest.offset = 0;
        vm.core.totalItems = 0;
    }

    function fnInitialise(totalItems) {
        vm.core.totalItems = totalItems;
    }

    function fnSetTotalItems(t) {
        if (typeof t !== 'undefined' && t !== null) {
            vm.core.totalItems = t;
        }
        else{
            vm.core.totalItems = 0;
        }
    }

    /**
     * Sets a new number of items per page. If the new value of items per page is different to the old one, the
     * pagination values are resetter. After calling this method the 'search' method should be called again.
     * @param ipp
     */
    function fnSetItemsPerPage(ipp) {
        if (vm.core.itemsPerPage != ipp) {
            vm.service.resetPagination();
        }
        if (typeof ipp === 'undefined' || ipp === null) {
            vm.core.itemsPerPage = FIRST_STEP;
        }
        else{
            vm.core.itemsPerPage = ipp;
        }
    }

    function fnMoveTo(page) {
        if (typeof page == 'undefined' || page < 1 || page == null) {
            page = 1;
        }

        vm.core.rest.offset = (page - 1) * vm.core.itemsPerPage;
    }

    function fnGetItemsPerPageSteps() {
        var t = vm.core.total <= 50 ? vm.core.total : 50;
        var r = [];
        var i = 0;
        do {
            i += FIRST_STEP;
            r.push({value: i, label: i});
            if (i > 20) {
                i += FIRST_STEP;    //first step twice
            }
            if (i > 40) {
                i += FIRST_STEP;                //first step three times
            }
        }while(i <= t);

        return r;
    }

    //getters
    function getOffset() {
        return vm.core.rest.offset;
    }
    function getItemsPerPage() {
        return vm.core.itemsPerPage;
    }
    function getTotalItems() {
        return vm.core.totalItems;
    }
    function getMaxLinks() {
        return vm.core.maxLinks;
    }

};

paginationSrv.$inject = [];

angular.module('rrms')
    .service('paginationSrv', paginationSrv);