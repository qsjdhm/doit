package com.doit.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * 操作登录用户
 */
public class OperateLoginUser {
	
	private static Map pMap = new HashMap();
	
	
    public static void setUserId(String pSessionId,String pUserId){
    	pMap.put(pSessionId, pUserId);
    } 
    
    public static String getUserId(String pSessionId){
    	return (String) pMap.get(pSessionId);
    }
    
    public static boolean removeUserId(String pSessionId){
    	pMap.remove(pSessionId);
    	return true;
    }
    
    public static void cleanInfo(String pUserId){
    	 Iterator pIterator = pMap.entrySet().iterator();
         while(pIterator.hasNext()){
             Map.Entry entry = (Map.Entry) pIterator.next();
             String key = (String) entry.getKey();
             String value = (String) entry.getValue();
             if(value.equals(pUserId)){
                 pMap.remove(key);
             }
         }
    }
}