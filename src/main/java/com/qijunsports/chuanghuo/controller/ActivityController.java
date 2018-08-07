package com.qijunsports.chuanghuo.controller;

import com.qijunsports.chuanghuo.model.ActivityInfo;
import com.qijunsports.chuanghuo.service.ActivityService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
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
    List<ActivityInfo> resultList = new ArrayList<>();
    List<ActivityInfo> activityInfoList = activityService.getAllActivity();
    for (ActivityInfo activityInfo : activityInfoList) {
      activityInfo = processGetActivity(activityInfo);
      resultList.add(activityInfo);
    }
    return resultList;
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
    ActivityInfo activityInfo = activityService.getActivityById(id);
    activityInfo = processGetActivity(activityInfo);
    return activityInfo;
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
      activityInfo = processEditActivity(activityInfo);
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
   * @param id           id
   * @param activityInfo 活动对象
   * @return true || false
   */
  @RequestMapping(value = "/activity/{id}", method = RequestMethod.PUT)
  @ResponseBody
  public Boolean updateActivity(@PathVariable("id") String id,
                                @RequestBody ActivityInfo activityInfo) {
    try {
      activityInfo.setUpdateDate(new Date());
      activityInfo = processEditActivity(activityInfo);
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
      activityInfo.setUpdateDate(new Date());
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

  /**
   * 处理获取的活动
   */
  private ActivityInfo processGetActivity(ActivityInfo activityInfo) {
    String content = "";
    String spiltString = "#####";
    if (activityInfo.getContent1() != null) {
      String text = activityInfo.getContent1();
      if (activityInfo.getContent2() != null) {
        content += text.substring(0, text.length() - 4);
      } else {
        content += text;
      }
    }
    if (activityInfo.getVideo1() != null) {
      content += spiltString + activityInfo.getVideo1() + spiltString;
    }
    if (activityInfo.getContent2() != null) {
      String text = activityInfo.getContent2();
      if (activityInfo.getContent3() != null) {
        content += text.substring(3, text.length() - 4);
      } else {
        content += text.substring(3, text.length());
      }
    }
    if (activityInfo.getVideo2() != null) {
      content += spiltString + activityInfo.getVideo2() + spiltString;
    }
    if (activityInfo.getContent3() != null) {
      String text = activityInfo.getContent3();
      if (activityInfo.getContent4() != null) {
        content += text.substring(3, text.length() - 4);
      } else {
        content += text.substring(3, text.length());
      }
    }
    if (activityInfo.getVideo3() != null) {
      content += spiltString + activityInfo.getVideo3() + spiltString;
    }
    if (activityInfo.getContent4() != null) {
      String text = activityInfo.getContent4();
      if (activityInfo.getContent5() != null) {
        content += text.substring(3, text.length() - 4);
      } else {
        content += text.substring(3, text.length());
      }
    }
    if (activityInfo.getVideo4() != null) {
      content += spiltString + activityInfo.getVideo4() + spiltString;
    }
    if (activityInfo.getContent5() != null) {
      String text = activityInfo.getContent5();
      if (activityInfo.getContent6() != null) {
        content += text.substring(3, text.length() - 4);
      } else {
        content += text.substring(3, text.length());
      }
    }
    if (activityInfo.getVideo5() != null) {
      content += spiltString + activityInfo.getVideo5() + spiltString;
    }
    if (activityInfo.getContent6() != null) {
      String text = activityInfo.getContent6();
      content += text.substring(3, text.length());
    }
    activityInfo.setContent(content);

    return activityInfo;
  }

  /**
   * 处理编辑的活动
   */
  private ActivityInfo processEditActivity(ActivityInfo activityInfo) {
    if (activityInfo.getContent() != null) {
      String[] spiltList = activityInfo.getContent().split("#####");
      int length = spiltList.length;
      for (int i = 0; i < length; i++) {
        switch (i) {
          case 0:
            if (length > 1) {
              activityInfo.setContent1(spiltList[i] + "</p>");
            } else {
              activityInfo.setContent1(spiltList[i]);
            }
            break;
          case 1:
            activityInfo.setVideo1(spiltList[i]);
            break;
          case 2:
            if (length > 3) {
              activityInfo.setContent2("<p>" + spiltList[i] + "</p>");
            } else {
              activityInfo.setContent2("<p>" + spiltList[i]);
            }
            break;
          case 3:
            activityInfo.setVideo2(spiltList[i]);
            break;
          case 4:
            if (length > 5) {
              activityInfo.setContent3("<p>" + spiltList[i] + "</p>");
            } else {
              activityInfo.setContent3("<p>" + spiltList[i]);
            }
            break;
          case 5:
            activityInfo.setVideo3(spiltList[i]);
            break;
          case 6:
            if (length > 7) {
              activityInfo.setContent4("<p>" + spiltList[i] + "</p>");
            } else {
              activityInfo.setContent4("<p>" + spiltList[i]);
            }
            break;
          case 7:
            activityInfo.setVideo4(spiltList[i]);
            break;
          case 8:
            if (length > 9) {
              activityInfo.setContent5("<p>" + spiltList[i] + "</p>");
            } else {
              activityInfo.setContent5("<p>" + spiltList[i]);
            }
            break;
          case 9:
            activityInfo.setVideo5(spiltList[i]);
            break;
          case 10:
            activityInfo.setContent6("<p>" + spiltList[i]);
            break;
          default:
            break;
        }
      }
    }

    return activityInfo;
  }
}
