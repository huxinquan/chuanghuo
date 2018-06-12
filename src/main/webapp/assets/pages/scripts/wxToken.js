/**
 * Created by huxinquan on 2018/3/9.
 */

var wxToken = function () {

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/wxToken',
    uuid: '',
    signature: '',
    nonce: '',
    echostr: ''
  };

  // 全局Dom
  var jqueryMap = {
    $blockTarget: null
  };

  var setJqueryMap = function () {
    jqueryMap.$blockTarget = $('body');
  };

  var valid = function () {
    alert(configMap.echostr);
    return configMap.echostr;
  };

  return {
    init: function (uuid, signature, timestamp, nonce, echostr) {
      configMap.uuid = uuid;
      configMap.signature = signature;
      configMap.timestamp = timestamp;
      configMap.nonce = nonce;
      configMap.echostr = echostr;
      setJqueryMap();
      valid();
    },
    setPath: function (path) {
      configMap.path = path;
    }
  };
}();
//@ sourceURL=wxToken.js