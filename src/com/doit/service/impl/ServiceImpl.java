package com.doit.service.impl;

import java.util.List;

import com.doit.dao.IDao;
import com.doit.service.IService;

/**
 * 实现业务逻辑的接口
 */
public class ServiceImpl<T> implements IService<T> {

	/**
     * 功能描述：创建实例对象
     * @param bean 对象
     */
	@Override
	public void create(T bean) {
		dao.create(bean);
	}
	/**
	 * 功能描述：删除对象
	 * @param bean 对象
	 */
	@Override
	public void delete(T bean) {
        dao.delete(bean);
	}
	/**
	 * 功能描述：根据id查找对象
	 * @param id 对象id
	 */
	@Override
	public T find(Class<T> clazz, int id) {
		return dao.find(clazz, id);
	}
	/**
	 * 功能描述：列出对象
	 * @param hql 查询的hql语句
	 * @return 对象集合
	 */
	@Override
	public List<T> list(String hql) {
		return dao.list(hql);
	}
	/**
	 * 功能描述：更新对象
	 *  @param bean 对象
	 */
	@Override
	public void update(T bean) {
		dao.update(bean);
		
	}

	
	private IDao<T> dao;
	
	public IDao<T> getDao() {
		return dao;
	}

	public void setDao(IDao<T> dao) {
		this.dao = dao;
	}
}
