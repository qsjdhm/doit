package com.doit.service;

import java.util.List;

import com.doit.vo.TBook;


public interface IBookService <T extends TBook> extends IService<T> {
	
	// 根据总分类获得此类型下的图书总个数
	public int getBookLength(int SortId);
	
	// 根据总分类和每页个数获取此分类下图书的总页数
	public int getBookPageCount(int SortId, int pageNum);
	
	// 根据总分类、页数、每页个数获取此分类下的图书列表
	public List<T> getBook(int SortId, int pageId, int pageNum);

	// 根据推荐数获取图书的前3个
	public List<T> getBookByRecom(int number);
	
	// 根据id获取图书内容
	public TBook getBookByID(int id);
	
}

