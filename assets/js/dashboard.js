/* globals Chart:false, feather:false */

(function() {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })


    // eslint-disable-next-line no-unused-vars
    // Graphs

    // eslint-disable-next-line no-unused-vars

    $("#avatar").attr("src", sessionStorage.getItem("avatar"));
    $("#user").text(sessionStorage.getItem("username"));
})()