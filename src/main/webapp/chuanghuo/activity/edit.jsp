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
                <label class="control-label col-md-3">
                    缩略图：
                </label>
                <div class="col-md-9">
                    <a href="javascript:void(0)" download="img.jpg">
                        <img src="<%=request.getContextPath()%>/assets/pages/img/upload.png"
                             width="128" height="128"></a>
                    <input id="thumbnail" name="myFileName" class="img-input" type="file"
                           accept="image/png,image/gif,image/jpeg,image/tiff"
                           style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        活动标题：
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
                        活动描述：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="describe">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        活动人数：
                    </label>
                    <div class="col-md-4">
                        <input type="number" class="form-control" id="minPeopleNumber">
                    </div>
                    <div class="col-md-1">
                        <span><B> ～ </B></span>
                    </div>
                    <div class="col-md-4">
                        <input type="number" class="form-control" id="maxPeopleNumber">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        活动时间：
                    </label>
                    <div class="col-md-4">
                        <div class="input-group date search-box search-input-small pull-left">
                            <input class="form-control input-sm" type="text" id="beginDate">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <span><B> ～ </B></span>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group date search-box search-input-small pull-left">
                            <input class="form-control input-sm" type="text" id="endDate">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        活动内容：
                    </label>
                    <div class="col-md-9">
                        <div id="editor">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        是否轮播：
                    </label>
                    <div class="col-md-9">
                        <div id="check" class="radio-list">
                            <label class="radio-inline">
                                <input type="radio" name="isTop"
                                       value="1"> 是
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="isTop"
                                       value="0"> 否
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="topPic" style="display: none">
            <div class="col-md-12">
                <label class="control-label col-md-3">
                    轮播图：
                </label>
                <div class="col-md-9">
                    <a href="javascript:void(0)" download="img.jpg">
                        <img src="<%=request.getContextPath()%>/assets/pages/img/upload.png"
                             width="128" height="128"></a>
                    <input id="picTop" name="myFileName" class="img-input" type="file"
                           accept="image/png,image/gif,image/jpeg,image/tiff"
                           style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        门店名称：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="storeName">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        活动地址：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="address">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        经度纬度：
                    </label>
                    <div class="col-md-4">
                        <input type="number" class="form-control" id="longitude" placeholder="经度">
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-4">
                        <input type="number" class="form-control" id="latitude" placeholder="纬度">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        联系电话：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="fixedTelephone">
                    </div>
                </div>
            </div>
        </div>
        <%--<div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        移动电话：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="mobilePhone" placeholder="多条用半角;分隔">
                    </div>
                </div>
            </div>
        </div>--%>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-3">
                        交通方式：
                    </label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="transportation">
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/activity/edit.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/ajaxfileupload.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        activityEdit.setPath("<%=request.getContextPath() %>");
        activityEdit.init("<%=id%>");
    });
</script>