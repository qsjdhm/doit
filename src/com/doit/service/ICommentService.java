package com.doit.service;

import java.util.List;

import com.doit.vo.TComment;


public interface ICommentService <T extends TComment> extends IService<T> {
	
	// 获取评论的总个数
	public int getCommentLength();
	
	// 根据每页个数获取评论的总页数
	public int getCommentPageCount(int pageNum);

	// 根据当前页数、每页个数获取评论列表
	public List<T> getComment(int pageId, int pageNum);
	
	// 根据时间获取最新的前5条评论
	public List<T> getCommentByTime(int number);
	
	// 根据文章ID获取此文章下的评论
	public List<T> getCommentByArticleID(int id);
	
	// 根据ID获取评论内容
	public TComment getCommentByID(int id);
}

