/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment */

var activityView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/activity/activity'
	};

    // 全局Dom
    var jqueryMap = {
        $myContainer: null
    };

    var setJqueryMap = function () {
        jqueryMap.$myContainer = $('#activityView');
    };

	var getActivity = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                jqueryMap.$myContainer.find('#title').text(data.title);
                jqueryMap.$myContainer.find('#content').append(data.content);
            },
            error: function () {
                $.messager.popup('获取活动失败');
            }
        });
	};

	return {
		init: function (id) {
            setJqueryMap();
			getActivity(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=view.js