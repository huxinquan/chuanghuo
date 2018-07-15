package com.qijunsports.chuanghuo.service.impl;

import com.qijunsports.chuanghuo.dao.ActivityDao;
import com.qijunsports.chuanghuo.model.ActivityInfo;
import com.qijunsports.chuanghuo.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    private ActivityDao activityDao;

    public List<ActivityInfo> getAllActivity() {
        return activityDao.getAllActivity();
    }

    public ActivityInfo getActivityById(String id) {
        return activityDao.getActivityById(id);
    }

    public void addActivity(ActivityInfo activityInfo) {
        activityDao.addActivity(activityInfo);
    }

    public void updateActivity(String id, ActivityInfo activityInfo) {
        activityDao.updateActivity(id, activityInfo);
    }
}
