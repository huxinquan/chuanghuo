package com.qijunsports.chuanghuo.controller;

import com.qijunsports.chuanghuo.model.ActivityInfo;
import com.qijunsports.chuanghuo.service.ActivityService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * 活动
 *
 * @author huxinquan
 */
@Controller
@RequestMapping("/activity")
public class ActivityController {
  private Logger logger = Logger.getLogger(ActivityController.class);

  @Autowired
  private ActivityService activityService;

  /**
   * 获取所有活动
   *
   * @return 活动集合
   */
  @RequestMapping(value = "/getAllActivity", method = RequestMethod.GET)
  @ResponseBody
  public List<ActivityInfo> getAllActivity() {
    return activityService.getAllActivity();
  }

  /**
   * 查
   *
   * @param id id
   * @return 活动对象
   */
  @RequestMapping(value = "/activity/{id}", method = RequestMethod.GET)
  @ResponseBody
  public ActivityInfo getActivity(@PathVariable("id") String id) {
    return activityService.getActivityById(id);
  }

  /**
   * 增
   *
   * @param activityInfo 活动对象
   * @return true || false
   */
  @RequestMapping(value = "/activity", method = RequestMethod.POST)
  @ResponseBody
  public Boolean addActivity(@RequestBody ActivityInfo activityInfo) {
    try {
      activityInfo.setId(UUID.randomUUID().toString());
      activityService.addActivity(activityInfo);
      return true;
    } catch (Exception e) {
      logger.error("", e);
    }

    return false;
  }

  /**
   * 改
   *
   * @param id id
   * @param activityInfo 活动对象
   * @return true || false
   */
  @RequestMapping(value = "/activity/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public Boolean updateActivity(@PathVariable("id") String id,
                                @RequestBody ActivityInfo activityInfo) {
    try {
      activityService.updateActivity(id, activityInfo);
      return true;
    } catch (Exception e) {
      logger.error("", e);
    }

    return false;
  }

  /**
   * 删
   *
   * @param id id
   * @return true || false
   */
  @RequestMapping(value = "/delete/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public Boolean updateActivity(@PathVariable("id") String id) {
    try {
      ActivityInfo activityInfo = new ActivityInfo();
      activityInfo.setIsDelete(1);
      activityService.updateActivity(id, activityInfo);
      return true;
    } catch (Exception e) {
      logger.error("", e);
    }

    return false;
  }

  /**
   * 获取轮播数量
   *
   * @return 轮播数量
   */
  @RequestMapping(value = "/activity/getIsTopCount", method = RequestMethod.GET)
  @ResponseBody
  public int getIsTopCount() {
    return activityService.getIsTopCount();
  }
}
