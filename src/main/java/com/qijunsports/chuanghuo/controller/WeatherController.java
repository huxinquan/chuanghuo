package com.qijunsports.chuanghuo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping(value = "/weather")
public class WeatherController {
  private Logger logger = Logger.getLogger(WeatherController.class);

  @RequestMapping(value = "/getWeather", method = RequestMethod.GET)
  @ResponseBody
  public String getWeather() {
    // 心知天气
    // 地区
    String area = "qingdao";
    // key
    String key = "ntso0bdpmukwrlyi";
    // 天气实况
    String temperatureUrl = "https://api.seniverse.com/v3/weather/now.json?key=" + key
        + "&location=" + area + "&language=zh-Hans&unit=c";
    // String lifeUrl = "";

    BufferedReader reader = null;
    String result = null;
    StringBuilder sb = new StringBuilder();
    try {
      URL url = new URL(temperatureUrl);
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("GET");
      connection.connect();
      InputStream is = connection.getInputStream();
      reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
      String strRead = null;
      while ((strRead = reader.readLine()) != null) {
        sb.append(strRead);
        sb.append("\r\n");
      }
      reader.close();
      result = sb.toString();
    } catch (Exception e) {
      e.printStackTrace();
    }

    JSONObject jsonResult = JSONObject.parseObject(result);
    JSONArray jsonArray = (JSONArray) jsonResult.get("results");
    JSONObject jsonContent = (JSONObject) jsonArray.get(0);
    JSONObject now = (JSONObject) jsonContent.get("now");
    String temperature = now.get("temperature").toString() + "度";
    String tempText = now.get("text").toString();
    // String lastUpdate = jsonContent.get("last_update").toString();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String lastDate = sdf.format(new Date());
    JSONObject location = (JSONObject) jsonContent.get("location");
    String areaName = location.get("name").toString();

    String weather = "【天气情况】\n【地区】：" + areaName + "\n【时间】：" + lastDate + "\n【天气】："
        + tempText + "\n【温度】：" + temperature;

    return weather;
  }
}
