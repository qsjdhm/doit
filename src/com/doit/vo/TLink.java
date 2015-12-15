package com.doit.vo;

import javax.persistence.*;

/*
 * 实体：对外链接类（供以后增加对外链接实体使用）
 */
@Entity//持久化的对象
@Table(name="link")  // 数据库表中的名字（link）

public class TLink {

	public TLink(){
		
	}
	
	@Id  // 创建数据库表中的主键
	@GeneratedValue(strategy=GenerationType.AUTO)  // 主键类型是自增的
	private int Link_ID = 0;
	private String Link_Name = "";
	private String Link_Url = "";
	
	public int getLink_ID() {
		return Link_ID;
	}
	public void setLink_ID(int link_ID) {
		Link_ID = link_ID;
	}
	public String getLink_Name() {
		return Link_Name;
	}
	public void setLink_Name(String link_Name) {
		Link_Name = link_Name;
	}
	public String getLink_Url() {
		return Link_Url;
	}
	public void setLink_Url(String link_Url) {
		Link_Url = link_Url;
	}
}
