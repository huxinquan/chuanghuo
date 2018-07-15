<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="activityView">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">标题：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="title"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">内容：</label>
						<div class="col-md-9">
							<div id="content"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/activity/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		activityView.setPath("<%=request.getContextPath() %>");
		activityView.init("<%=request.getParameter("id")%>");
	});
</script>