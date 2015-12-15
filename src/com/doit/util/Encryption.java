package com.doit.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;


/**
 * 操作字符串加密工具类
 */
public class Encryption {
	
	// 加密字符串
	public String encryption(String content){
		char hexDigits[] = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
        
        try {
            byte[] pStrTemt = content.getBytes();
            BASE64Encoder base64 = new BASE64Encoder();
            String base64Str = base64.encode(pStrTemt);
            byte[] pbase64 = base64Str.getBytes();
            MessageDigest pMdTemp = MessageDigest.getInstance("MD5");
            pMdTemp.update(pbase64);
            byte[] md = pMdTemp.digest();
            int j = md.length;
            char str[] = new char[j*2];
            int k = 0;
            for(int i = 0; i<j; i++){
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>>6 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (NoSuchAlgorithmException e) {
          
           return null;
        }
	}
}
