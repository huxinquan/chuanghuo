<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>闯货</title>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- 第三方类库样式（开始） -->
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css"
          rel="stylesheet" type="text/css"/>
    <!-- 第三方类库样式（结束） -->

    <!--页面级样式-->
    <link href="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/select2/css/select2.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/select2/css/select2-bootstrap.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger-theme-block.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/jstree/themes/default/style.min.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css"
          rel="stylesheet">
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"
          rel="stylesheet" type="text/css"/>
    <!-- 页面级样式 -->

    <!-- 全局样式类（开始） -->
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet"
          type="text/css"/>
    <!-- 全局样式类（结束） -->
</head>
<body>
<h2 style="text-align: center;">闯货</h2>
</body>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/metisMenu/metisMenu.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.blockui.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/lodash.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>

<script src="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/moment-with-locales.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/select2/js/select2.full.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/select2/js/i18n/zh-CN.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootbox/bootbox.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/messenger/js/messenger.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tabdrop.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jstree/jstree.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/echarts/echarts.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/echarts/vintage.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script type="text/javascript">
    $(function () {

    });
</script>
</html>
