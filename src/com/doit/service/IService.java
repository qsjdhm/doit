package com.doit.service;

import java.util.List;

/**
 * 声明业务逻辑的接口
 */
public interface IService<T> {

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
}
