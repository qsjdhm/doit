package com.doit.service;

import java.util.List;

import com.doit.vo.TSort;


public interface ISortService <T extends TSort> extends IService<T> {

	// 根据总分类获得此类型下的文章总个数
	public int getSortLength(int fSortId);
	
	// 根据总分类和每页个数获取此分类下文章的总页数
	public int getSortPageCount(int fSortId, int pageNum);
	
	// 根据总分类、页数、每页个数获取此分类下的文章列表
	public List<T> getSort(int fSortId, int pageId, int pageNum);
	
	// 根据总分类查询它下面的所有分类的第一个的分类ID
	public int getFirstSortByFSort(int fSortId);
	
	// 获取文章下不包括笔记的分类
	public List<T> getSortByAriticleNotNote();
	
	// 获取笔记分类
	public List<T> getSortByNote();
	
	// 根据ID获取分类内容
	public TSort getSortByID(int id);
}

