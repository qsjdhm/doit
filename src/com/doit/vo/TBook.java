package com.doit.vo;

import javax.persistence.*;

/*
 * 实体：图书类（供图书实体使用）
 */
@Entity//持久化的对象
@Table(name="book")  // 数据库表中的名字（book）

public class TBook {

	public TBook(){
		
	}
	
	@Id  // 创建数据库表中的主键
	@GeneratedValue(strategy=GenerationType.AUTO)  // 主键类型是自增的
	private int Book_ID = 0;
	private String Book_Name = "";
	private int Book_Height = 0;
	private String Book_Cover = "";
	private String Book_Link = "";
	private int Sort_ID = 0;
	private String Sort_Name = "";
	private int Download_Num = 0;
	private int Recommend_Num = 0;
	
	public int getBook_ID() {
		return Book_ID;
	}
	public void setBook_ID(int book_ID) {
		Book_ID = book_ID;
	}
	public String getBook_Name() {
		return Book_Name;
	}
	public void setBook_Name(String book_Name) {
		Book_Name = book_Name;
	}
	public int getBook_Height() {
		return Book_Height;
	}
	public void setBook_Height(int book_Height) {
		Book_Height = book_Height;
	}
	public String getBook_Cover() {
		return Book_Cover;
	}
	public void setBook_Cover(String book_Cover) {
		Book_Cover = book_Cover;
	}
	public String getBook_Link() {
		return Book_Link;
	}
	public void setBook_Link(String book_Link) {
		Book_Link = book_Link;
	}
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
	public int getDownload_Num() {
		return Download_Num;
	}
	public void setDownload_Num(int download_Num) {
		Download_Num = download_Num;
	}
	public int getRecommend_Num() {
		return Recommend_Num;
	}
	public void setRecommend_Num(int recommend_Num) {
		Recommend_Num = recommend_Num;
	}
}
