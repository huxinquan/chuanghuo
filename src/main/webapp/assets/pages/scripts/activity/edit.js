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

/*global $, App, moment, jQuery, bootbox, _ */
var activityEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/activity/activity',
        id: '',
        editor: ''
    };

    // 全局Dom
    var jqueryMap = {
        $activityForm: null,
        $title: null
    };

    var setJqueryMap = function () {
        jqueryMap.$activityForm = $('#activityForm');
        jqueryMap.$title = jqueryMap.$activityForm.find('#title');
    };

    var initEditor = function () {
        var E = window.wangEditor;
        configMap.editor = new E('#editor');
        configMap.editor.customConfig.menus = [
            'bold',  // 粗体
            'fontSize',  // 字号
            'italic',  // 斜体
            'underline',  // 下划线
            'foreColor',  // 文字颜色
            'justify',  // 对齐方式
            'emoticon',  // 表情
            'image',  // 插入图片
            'video',  // 插入视频
            'undo'  // 撤销
        ];
        configMap.editor.create();


        if (configMap.id) {
            getActivity(configMap.id);
        }
    };

    var saveActivity = function (callback) {
        var blockTarget = jqueryMap.$activityForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            title: jqueryMap.$title.val(),
            content: configMap.editor.txt.html()
        };

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = url + "/" + configMap.id;
            requestType = 'PUT';
        }

        $.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$activityForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getActivity = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                jqueryMap.$title.val(data.title);
                configMap.editor.txt.html(data.content);
            },
            error: function () {
                $.messager.popup('获取活动失败');
            }
        });
    };

    return {
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            setTimeout(function () {
                initEditor();
            }, 200);
        },
        setPath: function (path) {
            configMap.path = path;
        },
        saveActivity: function (callback) {
            if (jqueryMap.$activityForm.valid()) {
                saveActivity(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js