package com.doit.dao;

import java.util.List;

/**
 * 声明数据访问的接口
 */
public interface IDao<T> {
    /**
     * 功能描述：根据id查找对象
     */
	public T find(Class<T> clazz ,int id);
    /**
     * 功能描述：创建实例对象
     */
	public void create(T bean);
	/**
	 * 功能描述：保存对象
	 */
	public void update(T bean);
	/**
	 * 功能描述：删除对象
	 */
	public void delete(T bean);
	/**
	 * 功能描述：列出对象
	 */
	public List<T> list(String hql);
	/**
	 * 功能描述：查询从第几条到第几条记录
	 */
	public List<T> pageQuery(String hql, int start, int end);
	
}
