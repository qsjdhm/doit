package com.doit.vo;

import javax.persistence.*;

/*
 * 实体：评论类（供用户发表评论实体使用）
 */
@Entity//持久化的对象
@Table(name="comment")  // 数据库表中的名字（comment）

public class TComment {

	public TComment(){
		
	}
	
	@Id  // 创建数据库表中的主键
	@GeneratedValue(strategy=GenerationType.AUTO)  // 主键类型是自增的
	private int Comment_ID = 0;
	private String Comment_Person_Name = "";
	private String Comment_Person_Email = "";
	private String Comment_Content = "";
	private String Comment_Time = "";
	private int Comment_ArticleID = 0;
	private String Comment_ArticleTitle = "";
	private int Parent_CommentID = 0;
	
	public int getComment_ID() {
		return Comment_ID;
	}
	public void setComment_ID(int comment_ID) {
		Comment_ID = comment_ID;
	}
	public String getComment_Person_Name() {
		return Comment_Person_Name;
	}
	public void setComment_Person_Name(String comment_Person_Name) {
		Comment_Person_Name = comment_Person_Name;
	}
	public String getComment_Person_Email() {
		return Comment_Person_Email;
	}
	public void setComment_Person_Email(String comment_Person_Email) {
		Comment_Person_Email = comment_Person_Email;
	}
	public String getComment_Content() {
		return Comment_Content;
	}
	public void setComment_Content(String comment_Content) {
		Comment_Content = comment_Content;
	}
	public String getComment_Time() {
		return Comment_Time;
	}
	public void setComment_Time(String comment_Time) {
		Comment_Time = comment_Time;
	}
	public int getComment_ArticleID() {
		return Comment_ArticleID;
	}
	public void setComment_ArticleID(int comment_ArticleID) {
		Comment_ArticleID = comment_ArticleID;
	}
	public String getComment_ArticleTitle() {
		return Comment_ArticleTitle;
	}
	public void setComment_ArticleTitle(String comment_ArticleTitle) {
		Comment_ArticleTitle = comment_ArticleTitle;
	}
	public int getParent_CommentID() {
		return Parent_CommentID;
	}
	public void setParent_CommentID(int parent_CommentID) {
		Parent_CommentID = parent_CommentID;
	}
}
