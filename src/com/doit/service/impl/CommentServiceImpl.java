package com.doit.service.impl;

import java.util.List;

import com.doit.dao.IDao;
import com.doit.service.ICommentService;
import com.doit.service.IService;
import com.doit.vo.TComment;

/**
 * 实现业务逻辑的接口
 */
public class CommentServiceImpl<T extends TComment> extends ServiceImpl<T> implements ICommentService<T> {
	
	/**
	 *  获取评论的总个数
	 *  @return 总个数
	 */
	@Override
	public int getCommentLength() {
		
		String sql = "select COUNT(*) from TComment";
		List comment = this.getDao().list(sql);
		Long count = (Long)comment.listIterator().next();
		return count.intValue();
	}

	/**
	 *  根据每页个数获取评论的总页数
	 *  @param pageNum 每页个数
	 *  @return 总页数
	 */
	@Override
	public int getCommentPageCount(int pageNum) {
		
		// 先获得总个数
		String sql = "select COUNT(*) from TComment";
		List comment = this.getDao().list(sql);
		int count = ((Long)comment.listIterator().next()).intValue();
		
		// 再根据每页个数计算出一共多少页
		int pageCount = (count-1) / pageNum+1;  // 这样就计算好了页码数量，逢1进1
		
		return pageCount;
	}

	/**
	 *  根据当前页数、每页个数获取评论列表
	 *  @param pageId 当前页数
	 *  @param pageNum 每页个数
	 *  @return 评论列表
	 */
	@Override
	public List<T> getComment(int pageId, int pageNum) {
		
		// 首先需要根据页数和每页个数计算出起始数和终止数
		int start = pageNum*(pageId-1);
		int end = pageNum;
		String sql = "select comment from TComment comment order by Comment_ID desc ";
		List<T> links = this.getDao().pageQuery(sql, start, end);
		if(links.size()>0){
			return links;
		}
		return null;
	}
	
	/**
	 *  根据时间获取最新的前number条评论
	 *  @param number 获取评论个数
	 *  @return 评论列表
	 */
	@Override
	public List<T> getCommentByTime(int number) {
		
		// 首先需要根据页数和每页个数计算出起始数和终止数
		String sql = "select comment from TComment comment order by Comment_ID desc ";
		List<T> comments = this.getDao().pageQuery(sql, 0, number);
		if(comments.size()>0){
			return comments;
		}
		return null;
	}

	/**
	 *  根据文章ID获取此文章下的评论
	 *  @param id 文章ID
	 *  @return 评论列表
	 */
	@Override
	public List<T> getCommentByArticleID(int id) {
		
		// 首先需要根据页数和每页个数计算出起始数和终止数
		String sql = "select comment from TComment comment where Comment_ArticleID="+id+" order by Comment_ID asc ";
		List<T> comments = this.getDao().pageQuery(sql, 0, 1000);
		if(comments.size()>0){
			return comments;
		}
		return null;
	}
	
	/**
	 *  根据ID获取评论内容
	 *  @param id 评论ID
	 *  @return 单个评论内容
	 */
	@Override
	public TComment getCommentByID(int id) {
		
		String sql = "select comment from TComment comment where Comment_ID="+id+"";
		TComment comment = this.getDao().find((Class<T>) TComment.class, id);
		
		return comment;
	}
	
	
	
}
