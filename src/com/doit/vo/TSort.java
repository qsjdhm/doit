package com.doit.vo;

import javax.persistence.*;

/*
 * 实体：分类类（供文章、标签等分类区别使用）
 */
@Entity//持久化的对象
@Table(name="sort")  // 数据库表中的名字（sort）

public class TSort {

	public TSort(){
		
	}
	
	@Id  // 创建数据库表中的主键
	@GeneratedValue(strategy=GenerationType.AUTO)  // 主键类型是自增的
	private int Sort_ID = 0;
	private String Sort_Name = "";
	private int F_Sort = 0;
	
	public int getSort_ID() {
		return Sort_ID;
	}
	public void setSort_ID(int sort_ID) {
		Sort_ID = sort_ID;
	}
	public String getSort_Name() {
		return Sort_Name;
	}
	public void setSort_Name(String sort_Name) {
		Sort_Name = sort_Name;
	}
	public int getF_Sort() {
		return F_Sort;
	}
	public void setF_Sort(int f_Sort) {
		F_Sort = f_Sort;
	}
}
