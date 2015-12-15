package com.doit.service;

import java.util.List;

import com.doit.vo.TArticle;


public interface IArticleService <T extends TArticle> extends IService<T> {

	// 根据总分类获得此类型下的文章总个数
	public int getArticleLength(int fSortId);
	
	// 根据总分类和每页个数获取此分类下文章的总页数
	public int getArticlePageCount(int fSortId, int pageNum);
	
	// 根据总分类、页数、每页个数获取此分类下的文章列表
	public List<T> getArticle(int fSortId, int pageId, int pageNum);
	

	/* 子分类就相当于是笔记下的文章 */
	// 根据子分类获得此类型下的文章总个数
	public int getArticleSubSortLength(int sortId);
	
	// 根据子分类和每页个数获取此分类下文章的总页数
	public int getArticleSubSortPageCount(int sortId, int pageNum);

	// 根据子分类、页数、每页个数获取此分类下的文章列表
	public List<T> getArticleSubSort(int sortId, int pageId, int pageNum);
	
	// 根据推荐数获取文章列表
	public List<T> getArticleByRecomNumber(int fSortId, int pageId, int pageNum);
	
	// 根据推荐数获取除了笔记分类的文章的前5个文章
	public List<T> getArticleByRecomNotNote(int number);
	
	// 根据推荐数获取笔记分类的前5个笔记
	public List<T> getArticleByRecomIsNote(int number);
		
	// 根据关键字获得此关键字下的文章总个数
	public int getArticleLengthByKeyword(String keyword, int type);
	
	// 根据关键字获得此关键字下的文章总页数
	public int getArticlePageCountByKeyword(String keyword, int pageNum, int type);
	
	// 根据关键字、页数、每页个数获取文章列表
	public List<T> getArticleByKeyword(String keyword, int pageId, int pageNum, int type);
	
	// 根据id获取文章内容
	public TArticle getArticleByID(int id);
	
	// 根据id获取此文章的上一篇文章
	public TArticle getPrevArticleByID(int id);
	
	// 根据id获取此文章的下一篇文章
	public TArticle getNextArticleByID(int id);
	
}

