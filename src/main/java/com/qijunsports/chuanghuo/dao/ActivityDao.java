package com.qijunsports.chuanghuo.dao;

import com.qijunsports.chuanghuo.model.ActivityInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityDao {
    List<ActivityInfo> getAllActivity();

    ActivityInfo getActivityById(@Param("id") String id);

    void addActivity(@Param("activityInfo") ActivityInfo activityInfo);

    void updateActivity(@Param("id") String id,
                        @Param("activityInfo") ActivityInfo activityInfo);
}
