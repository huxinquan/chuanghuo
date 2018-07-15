<%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2018/7/14
  Time: 21:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>
<form action="#" id="activityForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        标题：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="title">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        内容：
                    </label>
                    <div class="col-md-9">
                        <div id="editor">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/activity/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        activityEdit.setPath("<%=request.getContextPath() %>");
        activityEdit.init("<%=id%>");
    });
</script>