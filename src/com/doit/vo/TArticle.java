package com.doit.vo;

import javax.persistence.*;

/*
 * 实体：文章类（包含笔记等文章属性的类）
 */
@Entity//持久化的对象
@Table(name="article")  // 数据库表中的名字（article）

public class TArticle {
	
	@Id  // 创建数据库表中的主键
	@GeneratedValue(strategy=GenerationType.AUTO)  // 主键类型是自增的
	private Integer Article_ID;
	private String Article_Title = "";
	private String Article_Date = "";
	private String Article_Cover = "";
	private String Article_Content = "";
	private String Article_Tag = "";
	private Integer Sort_ID = 0;
	private String Sort_Name = "";
	private Integer F_Sort_ID = 0;
	private Integer Recommend_Num = 0;
	private Integer Read_Num = 0;
	
	public Integer getArticle_ID() {
		return Article_ID;
	}
	public void setArticle_ID(Integer article_ID) {
		Article_ID = article_ID;
	}
	public String getArticle_Title() {
		return Article_Title;
	}
	public void setArticle_Title(String article_Title) {
		Article_Title = article_Title;
	}
	public String getArticle_Date() {
		return Article_Date;
	}
	public void setArticle_Date(String article_Date) {
		Article_Date = article_Date;
	}
	public String getArticle_Cover() {
		return Article_Cover;
	}
	public void setArticle_Cover(String article_Cover) {
		Article_Cover = article_Cover;
	}
	public String getArticle_Content() {
		return Article_Content;
	}
	public void setArticle_Content(String article_Content) {
		Article_Content = article_Content;
	}
	public String getArticle_Tag() {
		return Article_Tag;
	}
	public void setArticle_Tag(String article_Tag) {
		Article_Tag = article_Tag;
	}
	public Integer getF_Sort_ID() {
		return F_Sort_ID;
	}
	public void setF_Sort_ID(Integer f_sort_ID) {
		F_Sort_ID = f_sort_ID;
	}
	public String getSort_Name() {
		return Sort_Name;
	}
	public void setSort_Name(String sort_Name) {
		Sort_Name = sort_Name;
	}
	public Integer getSort_ID() {
		return Sort_ID;
	}
	public void setSort_ID(Integer sort_ID) {
		Sort_ID = sort_ID;
	}
	public Integer getRecommend_Num() {
		return Recommend_Num;
	}
	public void setRecommend_Num(Integer recommend_Num) {
		Recommend_Num = recommend_Num;
	}
	public Integer getRead_Num() {
		return Read_Num;
	}
	public void setRead_Num(Integer read_Num) {
		Read_Num = read_Num;
	}
}
