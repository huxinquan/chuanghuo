<%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2018/3/9
  Time: 9:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.UUID" %>
<html>
<head>
    <title>token</title>
</head>
<body>
    <%
        // uuid
        String uuid = UUID.randomUUID().toString();
        // 微信加密签名
        String signature = request.getParameter("signature");
        // 时间戳
        String timestamp = request.getParameter("timestamp");
        // 随机数
        String nonce = request.getParameter("nonce");
        // 随机字符串
        String echostr = request.getParameter("echostr");

        if (signature == null) {
          signature = "";
        }
        if (timestamp == null) {
            timestamp = "";
        }
        if (nonce == null) {
            nonce = "";
        }
        if (echostr == null) {
            echostr = "";
        }
    %>
    <script src="<%=request.getContextPath()%>/assets/pages/scripts/wxToken.js"
            type="text/javascript"></script>
    <script type="text/javascript">
      $(function () {
        wxToken.setPath('<%=request.getContextPath()%>');
        wxToken.init('<%=uuid%>', '<%=signature%>', '<%=timestamp%>', '<%=nonce%>', '<%=echostr%>');
      });
    </script>
</body>
</html>
