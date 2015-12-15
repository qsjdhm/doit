package com.doit.service;

import java.util.List;

import com.doit.vo.TLink;


public interface ILinkService <T extends TLink> extends IService<T> {

	// 获取对外链接的总个数
	public int getLinkLength();
	
	// 根据每页个数获取对外链接的总页数
	public int getLinkPageCount(int pageNum);

	// 根据当前页数、每页个数获取对外链接列表
	public List<T> getLink(int pageId, int pageNum);
	
	// 根据ID获取链接内容
	public TLink getLinkByID(int id);
	
}

