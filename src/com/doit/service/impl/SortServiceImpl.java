package com.doit.service.impl;

import java.util.List;

import com.doit.dao.IDao;
import com.doit.service.ISortService;
import com.doit.service.IService;
import com.doit.vo.TSort;

/**
 * 实现业务逻辑的接口
 */
public class SortServiceImpl<T extends TSort> extends ServiceImpl<T> implements ISortService<T> {
	
	/**
	 *  根据父分类获得此类型下的分类总个数
	 *  @param fSortId 父分类id
	 *  @return 分类个数
	 */
	@Override
	public int getSortLength(int fSortId) {
		
		String sql = "";
		if(fSortId==0){
			sql = "select COUNT(*) from TSort";
		}else{
			sql = "select COUNT(*) from TSort where F_Sort="+fSortId+"";
		}
		List sort = this.getDao().list(sql);
		Long count = (Long)sort.listIterator().next();
		return count.intValue();
	}
	
	/**
	 *  根据父分类和每页个数获取此分类下分类的总页数
	 *  @param fSortId 父分类id
	 *  @param pageNum 每页个数
	 *  @return 总页数
	 */
	@Override
	public int getSortPageCount(int fSortId, int pageNum) {
		// 先获得总个数
		String sql = "";
		if(fSortId==0){
			sql = "select COUNT(*) from TSort";
		}else{
			sql = "select COUNT(*) from TSort where F_Sort="+fSortId+"";
		}
		List sort = this.getDao().list(sql);
		int count = ((Long)sort.listIterator().next()).intValue();
		
		// 再根据每页个数计算出一共多少页
		int pageCount = (count-1) / pageNum+1;  // 这样就计算好了页码数量，逢1进1
		
		return pageCount;
	}
	
	/**
	 *  根据父分类、页数、每页个数获取此分类下的分类列表
	 *  @param fSortId 父分类id
	 *  @param pageId 当前页
	 *  @param pageNum 每页个数
	 *  @return 分类列表
	 */
	@Override
	public List<T> getSort(int fSortId, int pageId, int pageNum) {
		
		// 首先需要根据页数和每页个数计算出起始数和终止数
		int start = pageNum*(pageId-1);
		int end = pageNum;
		String sql = "";
		if(fSortId==0){
			sql = "select sort from TSort sort order by Sort_ID asc ";
		}else{
			sql = "select sort from TSort sort where F_Sort="+fSortId+" order by Sort_ID asc ";
		}
		List<T> sorts = this.getDao().pageQuery(sql, start, end);
		if(sorts.size()>0){
			return sorts;
		}
		return null;
	}
	
	/**
	 *  根据总分类查询它下面的所有分类的第一个的分类ID
	 *  @param fSortId 父分类id
	 *  @return 分类id
	 */
	public int getFirstSortByFSort(int fSortId){
		String sql = "select sort from TSort sort where F_Sort="+fSortId+" order by Sort_ID asc ";
		List<T> sorts = this.getDao().pageQuery(sql, 0, 1);
		if(sorts.size()>0){
			return sorts.get(0).getSort_ID();
		}
		return (Integer) null;
	}
	
	/**
	 *  获取文章下不包括笔记的分类
	 *  @return 分类列表
	 */
	@Override
	public List<T> getSortByAriticleNotNote() {
		
		String sql = "select sort from TSort sort where F_Sort=1 and Sort_ID!=8 order by Sort_ID asc ";
		List<T> sorts = this.getDao().pageQuery(sql, 0, 100);
		if(sorts.size()>0){
			return sorts;
		}
		return null;
	}
	
	/**
	 *  获取笔记分类
	 *  @return 分类列表
	 */
	@Override
	public List<T> getSortByNote() {
		
		String sql = "select sort from TSort sort where Sort_ID=8 order by Sort_ID asc ";
		List<T> sorts = this.getDao().pageQuery(sql, 0, 100);
		if(sorts.size()>0){
			return sorts;
		}
		return null;
	}
	
	/**
	 *  根据ID获取分类内容
	 *  @param id 分类ID
	 *  @return 单个分类内容
	 */
	@Override
	public TSort getSortByID(int id) {
		
		String sql = "select sort from TSort sort where Sort_ID="+id+"";
		TSort sort = this.getDao().find((Class<T>) TSort.class, id);
		
		return sort;
	}

}
