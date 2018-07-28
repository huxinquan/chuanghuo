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

/*global $, App, moment, jQuery, bootbox, activityEdit */

var activity = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/activity',
        activityGrid: null,
        editPageUrl: '/chuanghuo/activity/edit.jsp',
        viewPageUrl: '/chuanghuo/activity/view.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" ' +
        'title="编辑"><i class="fa fa-edit"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" ' +
        'title="删除"><i class="fa fa-times"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="view" data-toggle="tooltip" ' +
        'title="查看"><i class="fa fa-search"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $myContainer: null,
        $btnNew: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$myContainer = jqueryMap.$blockTarget.find('#activity');
        jqueryMap.$btnNew = jqueryMap.$myContainer.find('#btnNew');
    };

    var initActivityData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在获取数据...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllActivity',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                configMap.activityGrid.clear().draw();
                if (datas.length > 0) {
                    configMap.activityGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {
            cancel: {
                label: '关闭',
                className: 'btn-default'
            }
        };

        if (type === 'edit') {
            dialogButtons.success = {
                label: "保存",
                className: "btn-primary",
                callback: function () {
                    activityEdit.saveActivity(function (result) {
                        if (result) {
                            initActivityData();
                            jqueryMap.$myContainer.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        $.get(url, function (html) {
            jqueryMap.$myContainer = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewActivity = function () {
        var el = $(this);
        var rowIndex = configMap.activityGrid.cell(el.parent()).index().row;
        var id = configMap.activityGrid.row(rowIndex).data().id;
        openModal("查看", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    var addActivity = function () {
        openModal('添加', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editActivity = function () {
        var el = $(this);
        var rowIndex = configMap.activityGrid.cell(el.parent()).index().row;
        var id = configMap.activityGrid.row(rowIndex).data().id;
        openModal('编辑', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    var delActivity = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据...'
        });
        var rowIndex = configMap.activityGrid.cell(element.parent()).index().row;
        var id = configMap.activityGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/delete/" + id,
            type: 'PUT',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    initActivityData();
                    $.messager.popup("删除成功");
                }
                else {
                    $.messager.popup("删除失败");
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var initActivityGrid = function () {
        configMap.activityGrid = jqueryMap.$myContainer.find('#activity_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "language": {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            "columns": [
                {
                    "data": "title",
                    "render": function (data, type, row) {
                        if (row.isTop === 1) {
                            return '<B style="color: red;">[轮播]</B> ' + data;
                        } else {
                            return data;
                        }
                    }
                },
                {
                    "data": "publishDate",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleteBtn_html + configMap.viewBtn_html;
                    }
                }
            ],
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$myContainer);
                var editContainer = $('[data-type="edit"]', jqueryMap.$myContainer);
                var delContainer = $('[data-type="del"]', jqueryMap.$myContainer);
                var viewContainer = $('[data-type="view"]', jqueryMap.$myContainer);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editActivity);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delActivity
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewActivity);
                }
            }
        });
    };

    var event = function () {
        jqueryMap.$btnNew.off('click').on('click', function () {
            addActivity();
        });
    };

    return {
        init: function () {
            setJqueryMap();
            initActivityGrid();
            initActivityData();
            event();
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=activity.js