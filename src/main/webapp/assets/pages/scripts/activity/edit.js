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
        // 上传图片
        configMap.editor.customConfig.uploadImgServer = configMap.path + '/Img/upload'; //上传URL
        configMap.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
        configMap.editor.customConfig.uploadImgMaxLength = 50;
        configMap.editor.customConfig.uploadFileName = 'myFileName';
        configMap.editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.data;
                insertImg(url);

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };

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