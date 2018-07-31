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
    blockTarget: '',
    dataUrl: '/activity/activity',
    uploadUrl: '/Img/upload',
    id: '',
    editor: '',
    alreadyTop: ''
  };

  // 全局Dom
  var jqueryMap = {
    $activityForm: null,
    $title: null,
    $describe: null,
    $minPeopleNumber: null,
    $maxPeopleNumber: null,
    $beginDate: null,
    $endDate: null,
    $topPic: null,
    $storeName: null,
    $address: null,
    $longitude: null,
    $latitude: null,
    $fixedTelephone: null,
    $mobilePhone: null,
    $transportation: null
  };

  var setJqueryMap = function () {
    jqueryMap.$activityForm = $('#activityForm');
    jqueryMap.$title = jqueryMap.$activityForm.find('#title');
    jqueryMap.$describe = jqueryMap.$activityForm.find('#describe');
    jqueryMap.$minPeopleNumber = jqueryMap.$activityForm.find('#minPeopleNumber');
    jqueryMap.$maxPeopleNumber = jqueryMap.$activityForm.find('#maxPeopleNumber');
    jqueryMap.$beginDate = jqueryMap.$activityForm.find('#beginDate');
    jqueryMap.$endDate = jqueryMap.$activityForm.find('#endDate');
    jqueryMap.$topPic = jqueryMap.$activityForm.find('#topPic');
    jqueryMap.$storeName = jqueryMap.$activityForm.find('#storeName');
    jqueryMap.$address = jqueryMap.$activityForm.find('#address');
    jqueryMap.$longitude = jqueryMap.$activityForm.find('#longitude');
    jqueryMap.$latitude = jqueryMap.$activityForm.find('#latitude');
    jqueryMap.$fixedTelephone = jqueryMap.$activityForm.find('#fixedTelephone');
    jqueryMap.$mobilePhone = jqueryMap.$activityForm.find('#mobilePhone');
    jqueryMap.$transportation = jqueryMap.$activityForm.find('#transportation');
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

  var initDateTimePicker = function () {
    jqueryMap.$beginDate.datetimepicker({
      format: 'yyyy-mm-dd',
      startView: 'month',
      minView: 'hour',
      language: 'zh-CN',
      autoclose: true
    }).on('click', function () {
      jqueryMap.$beginDate.datetimepicker("setEndDate", jqueryMap.$endDate.val())
    });

    jqueryMap.$endDate.datetimepicker({
      format: 'yyyy-mm-dd',
      startView: 'month',
      minView: 'hour',
      language: 'zh-CN',
      autoclose: true
    }).on('click', function () {
      jqueryMap.$endDate.datetimepicker("setStartDate", jqueryMap.$beginDate.val())
    });

    jqueryMap.$beginDate.val(moment().format('YYYY-MM-DD'));
    jqueryMap.$endDate.val(moment().add(1, 'months').format('YYYY-MM-DD'));

    jqueryMap.$beginDate.parent().find('button.btn-default').off('click').on('click', function () {
      jqueryMap.$beginDate.datetimepicker('show');
    });

    jqueryMap.$endDate.parent().find('button.btn-default').off('click').on('click', function () {
      jqueryMap.$endDate.datetimepicker('show');
    });
  };

  var initIcheck = function () {
    jqueryMap.$activityForm.find('input[name="subLevel"]').iCheck({
      checkboxClass: 'icheckbox_minimal',
      radioClass: 'iradio_minimal',
      increaseArea: '20%'
    });
    jqueryMap.$activityForm.find('input[name=isTop][value="0"]').iCheck('check');
  };

  var saveActivity = function (callback) {
    App.blockUI({
      target: configMap.blockTarget,
      boxed: true,
      message: '正在保存数据...'
    });

    var data = {
      thumbnail: jqueryMap.$activityForm.find('#thumbnail').prev().find('img').attr("src"),
      title: jqueryMap.$title.val(),
      describe: jqueryMap.$describe.val(),
      minPeopleNumber: jqueryMap.$minPeopleNumber.val(),
      maxPeopleNumber: jqueryMap.$maxPeopleNumber.val(),
      beginDate: jqueryMap.$beginDate.val(),
      endDate: jqueryMap.$endDate.val(),
      content: configMap.editor.txt.html(),
      picTop: jqueryMap.$activityForm.find('#picTop').prev().find('img').attr("src"),
      isTop: jqueryMap.$activityForm.find('input[name=isTop]:checked').val(),
      storeName: jqueryMap.$storeName.val(),
      address: jqueryMap.$address.val(),
      longitude: jqueryMap.$longitude.val(),
      latitude: jqueryMap.$latitude.val(),
      fixedTelephone: jqueryMap.$fixedTelephone.val(),
      mobilePhone: jqueryMap.$mobilePhone.val(),
      transportation: jqueryMap.$transportation.val()
    };

    $.ajax({
      url: configMap.path + configMap.dataUrl + '/getIsTopCount',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: function (result) {
        App.unblockUI(configMap.blockTarget);
        var topValue = jqueryMap.$activityForm.find('[name=isTop]:checked').val();
        if (result >= 3 && topValue === '1' && configMap.alreadyTop !== '1') {
          $.messager.popup("只能设置三个轮播活动！");
          jqueryMap.$activityForm.find('[name=isTop][value=0]').iCheck('check');
          jqueryMap.$topPic.hide();
        } else {
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
              App.unblockUI(configMap.blockTarget);
              callback(true);
            },
            error: function () {
              App.unblockUI(configMap.blockTarget);
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
        }
      },
      error: function () {
        App.unblockUI(configMap.blockTarget);
        $.messager.popup('获取活动失败');
      }
    });
  };

  var getActivity = function (id) {
    App.blockUI({
      target: configMap.blockTarget,
      boxed: true,
      message: '正在保存数据...'
    });
    $.ajax({
      url: configMap.path + configMap.dataUrl + '/' + id,
      dataType: 'JSON',
      type: 'GET',
      success: function (data) {
        App.unblockUI(configMap.blockTarget);
        jqueryMap.$title.val(data.title);
        jqueryMap.$describe.val(data.describe);
        jqueryMap.$minPeopleNumber.val(data.minPeopleNumber);
        jqueryMap.$maxPeopleNumber.val(data.maxPeopleNumber);
        jqueryMap.$beginDate.val(moment().format('YYYY-MM-DD'));
        jqueryMap.$endDate.val(moment().format('YYYY-MM-DD'));
        configMap.editor.txt.html(data.content);
        jqueryMap.$activityForm.find('input[name=isTop][value="' + data.isTop + '"]').iCheck('check');
        jqueryMap.$storeName.val(data.storeName);
        jqueryMap.$address.val(data.address);
        jqueryMap.$longitude.val(data.longitude);
        jqueryMap.$latitude.val(data.latitude);
        jqueryMap.$fixedTelephone.val(data.fixedTelephone);
        jqueryMap.$mobilePhone.val(data.mobilePhone);
        jqueryMap.$transportation.val(data.transportation);
        if (data.thumbnail !== '') {
          jqueryMap.$activityForm.find('#thumbnail').prev().find('img').attr("src", data.thumbnail);
        }
        if (jqueryMap.$activityForm.find('input[name=isTop]:checked').val() === '1') {
          jqueryMap.$topPic.show();
          if (data.picTop !== '') {
            jqueryMap.$activityForm.find('#picTop').prev().find('img').attr("src", data.picTop);
          }
        }
        configMap.alreadyTop = jqueryMap.$activityForm.find('input[name=isTop]:checked').val();
      },
      error: function () {
        App.unblockUI(configMap.blockTarget);
        $.messager.popup('获取活动失败');
      }
    });
  };

  var event = function () {
    configMap.blockTarget = jqueryMap.$activityForm.closest(".modal-content");

    jqueryMap.$activityForm.find('.img-input').parent().on('change', function () {
      var imgId = $(this).find('input').attr('id');
      ajaxFileUpload(imgId);
    });

    jqueryMap.$activityForm.find('[name=isTop]').on('change', function () {
      if ($(this).val() === '1') {
        jqueryMap.$topPic.show();
      } else {
        jqueryMap.$topPic.hide();
      }
    });
  };

  // 上传图片
  var ajaxFileUpload = function (imgId) {
    // 执行上传文件操作的函数
    $.ajaxFileUpload({
      //处理文件上传操作的服务器端地址(可以传参数,已亲测可用)
      url: configMap.path + configMap.uploadUrl,
      secureuri: false, // 是否启用安全提交,默认为false
      fileElementId: imgId, // 文件选择框的id属性
      type: 'POST',
      dataType: 'JSON',
      async: false,
      success: function (data) {
        jqueryMap.$activityForm.find('#' + imgId).prev().find('img').attr("src", data.data);
      }
    });
  };

  return {
    init: function (id) {
      configMap.id = id;
      setJqueryMap();
      event();
      setTimeout(function () {
        initEditor();
      }, 200);
      initDateTimePicker();
      initIcheck();
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