package com.qijunsports.chuanghuo.service;

import com.qijunsports.chuanghuo.model.ActivityInfo;

import java.util.List;

public interface ActivityService {
    List<ActivityInfo> getAllActivity();

    ActivityInfo getActivityById(String id);

    void addActivity(ActivityInfo activityInfo);

    void updateActivity(String id, ActivityInfo activityInfo);
}
