package com.doit.service.impl;

import java.util.List;

import org.hibernate.Query;

import com.doit.dao.IDao;
import com.doit.service.IBookService;
import com.doit.service.IService;
import com.doit.vo.TBook;

/**
 * 实现业务逻辑的接口
 */
public class BookServiceImpl<T extends TBook> extends ServiceImpl<T> implements IBookService<T> {
	
	/**
	 *  根据分类获得此类型下的图书总个数
	 *  @param sortId 图书类型id
	 *  @return 图书个数
	 */
	@Override
	public int getBookLength(int sortId) {
		
		String sql = "";
		if(sortId==0){
			sql = "select COUNT(*) from TBook";
		}else{
			sql = "select COUNT(*) from TBook where Sort_ID="+sortId+"";
		}
		List book = this.getDao().list(sql);
		Long count = (Long)book.listIterator().next();
		return count.intValue();
	}
	
	/**
	 *  根据分类和每页个数获取此分类下图书的总页数
	 *  @param sortId 图书类型id
	 *  @param pageNum 每页个数
	 *  @return 总页数
	 */
	@Override
	public int getBookPageCount(int sortId, int pageNum) {
		// 先获得总个数
		String sql = "";
		if(sortId==0){
			sql = "select COUNT(*) from TBook";
		}else{
			sql = "select COUNT(*) from TBook where Sort_ID="+sortId+"";
		}
		List book = this.getDao().list(sql);
		int count = ((Long)book.listIterator().next()).intValue();
		
		// 再根据每页个数计算出一共多少页
		int pageCount = (count-1) / pageNum+1;  // 这样就计算好了页码数量，逢1进1
		
		return pageCount;
	}
	
	/**
	 *  根据分类、页数、每页个数获取此分类下的图书列表
	 *  @param sortId 图书类型id
	 *  @param pageId 当前页
	 *  @param pageNum 每页个数
	 *  @return 图书列表
	 */
	@Override
	public List<T> getBook(int sortId, int pageId, int pageNum) {
		
		// 首先需要根据页数和每页个数计算出起始数和终止数
		int start = pageNum*(pageId-1);
		int end = pageNum;
		String sql = "";
		if(sortId==0){
			sql = "select book from TBook book order by Book_ID desc ";
		}else{
			sql = "select book from TBook book where Sort_ID="+sortId+" order by Book_ID desc ";
		}
		List<T> books = this.getDao().pageQuery(sql, start, end);
		if(books.size()>0){
			return books;
		}
		return null;
	}
	
	/**
	 *  根据推荐数获取图书的前3个
	 *  @param number 个数
	 *  @return 图书列表
	 */
	@Override
	public List<T> getBookByRecom(int number) {
		
		String sql = "select book from TBook book order by Recommend_Num desc ";
		List<T> books = this.getDao().pageQuery(sql, 0, number);
		if(books.size()>0){
			return books;
		}
		return null;
	}
	
	/**
	 *  根据ID获取图书内容
	 *  @param id 图书ID
	 *  @return 单个图书内容
	 */
	@Override
	public TBook getBookByID(int id) {
		
		String sql = "select book from TBook book where Book_ID="+id+"";
		TBook book = this.getDao().find((Class<T>) TBook.class, id);
		
		return book;
	}

}
