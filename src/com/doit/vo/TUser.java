package com.doit.vo;

import javax.persistence.*;

/*
 * 实体：用户类（供以后增加用户实体使用）
 */
@Entity//持久化的对象
@Table(name="user")  // 数据库表中的名字（user）

public class TUser {

	public TUser(){
		
	}
	
	@Id  // 创建数据库表中的主键
	@GeneratedValue(strategy=GenerationType.AUTO)  // 主键类型是自增的
	private int User_ID = 0;
	private String User_Account = "";
	private String User_Password = "";
	private String User_Email = "";
	private String SessionId = "";
	
	public int getUser_ID() {
		return User_ID;
	}
	public void setUser_ID(int user_ID) {
		User_ID = user_ID;
	}
	public String getUser_Account() {
		return User_Account;
	}
	public void setUser_Account(String user_Account) {
		User_Account = user_Account;
	}
	public String getUser_Password() {
		return User_Password;
	}
	public void setUser_Password(String user_Password) {
		User_Password = user_Password;
	}
	public String getUser_Email() {
		return User_Email;
	}
	public void setUser_Email(String user_Email) {
		User_Email = user_Email;
	}
	public String getSessionId() {
		return SessionId;
	}
	public void setSessionId(String sessionId) {
		SessionId = sessionId;
	}
}
