package com.doit.util;

import com.doit.vo.TArticle;
import com.doit.vo.TBook;
import com.doit.vo.TComment;
import com.doit.vo.TLink;
import com.doit.vo.TSort;
import com.doit.vo.TUser;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import com.doit.util.ENV;

/**
 * 生成页面所需要的html代码工具类
 */
public class GenerateHtml {

	// 生成home页面的主文章列表html代码
	public String generateHomeMainHtml(List <TArticle> articles) throws Exception{
		String listHtml = "";
		if(articles!=null){
			int size = articles.size();
			for(int i=0; i<size; i++){
				TArticle article = articles.get(i);
				
				// 组织标签的html
				String tagsHtml = "";
				String[] tags = article.getArticle_Tag().split(",");
				for(int j=0; j<tags.length; j++){
					String tag = URLEncoder.encode(URLEncoder.encode(tags[j],"utf-8"));
					if(j==0){
						tagsHtml += "<a title='"+tags[j]+"' rel='tag' href='"+new ENV().baseUrl+"/search/"+tag+"/0/2/search' style='font-size:13px;'>"+tags[j]+"</a>";
					}else{
						tagsHtml += " , <a title='"+tags[j]+"' rel='tag' href='"+new ENV().baseUrl+"/search/"+tag+"/0/2/search' style='font-size:13px;'>"+tags[j]+"</a>";
					}
				}
				
				OperateString operateString = new OperateString();
				String contentHtml = article.getArticle_Content();
				//String contentHtml = "dsafkjbsdkds<pre class='brush: js;'>function helloSyntaxHighlighter(){return 'hi!';}</pre><div class='ui segment '><img src='123.png' /><IMG src='456.png' /></div>afkjbsdkdsafkjbsdk中文结尾";
				// 过滤图片
				OperateImage operateImage = new OperateImage();
				contentHtml = operateImage.filterImage(contentHtml);
				// 过滤html所有标签
				contentHtml = operateString.filterHtmlTag(contentHtml);
				// 截取字符串
				contentHtml = operateString.interceptCharacters(contentHtml, 0, 200);
				
				String item = "";
				item += "<div id='item"+article.getArticle_ID()+"' class='ui stacked segment'>";
				item += "	<h2 class='article_title'>";
				item += "		<a href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"' style='font-size:24px;'>"+article.getArticle_Title()+"</a>";
				item += "	</h2>";
				item += "	<h2></h2>";
				item += "	<div class='article_date'>";
				item += "		<span property='dc:date dc:created' content='2013-11-10T12:30:01+08:00' datatype='xsd:dateTime' rel='sioc:has_creator' style='margin-right:20px;'>	发布时间 : "+article.getArticle_Date()+" </span>";
				item += "		<span style='color:#434A54;'>Tags : </span>";
				item += 		tagsHtml;
				item += "	</div>";
				item += "	<div class='row'>";
				item += "		<a class='thumbnail' href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"' style='float:left;width:240px;oveflow:hidden;'>";
				item += "			<img src='"+article.getArticle_Cover()+"' style='height: 175px; width: 100%; display: block;' data-src='holder.js/100%x175'>";
				item += "		</a>";
				item += "		<span id='artContent"+article.getArticle_ID()+"' class='sDiv article_content'>"+contentHtml+"</span>";
				item += "	</div>";
				item += "</div>";
				
				listHtml += item;
			}
		}
		System.out.println(listHtml);
		return listHtml;
	}
	
	// 生成个人作品页面的作品列表html代码
	public String generateWorksMainHtml(List <TArticle> articles) throws UnsupportedEncodingException{
		String listHtml = "";
		if(articles!=null){
			int size = articles.size();
			for(int i=0; i<size; i++){
				
				if(i%2!=0){  // 奇数
					TArticle prevArticle = articles.get(i-1);  // 获得这一行的第一个
					TArticle nowArticle = articles.get(i);  // 获得这一行的第二个
					
					// 获取封面
					String prevCoverHtml = "";
					String nowCoverHtml = "";
					if(prevArticle.getArticle_Cover()==""){
						prevCoverHtml = ""+new ENV().baseUrl+"/common/images/cover_default.png";
					}else{
						prevCoverHtml = prevArticle.getArticle_Cover();
					}
					if(nowArticle.getArticle_Cover()==""){
						nowCoverHtml = ""+new ENV().baseUrl+"common/images/cover_default.png";
					}else{
						nowCoverHtml = nowArticle.getArticle_Cover();
					}
					
					// 组织html
					String rowItem = "";
					rowItem += "<div class='row'>";
					rowItem += "	<div class='col-md-6'>";
					rowItem += "		<a class='works_item' href='"+new ENV().baseUrl+"/show/"+prevArticle.getArticle_ID()+"'>";
					rowItem += "			<div class='works_pic'>";
					rowItem += "				<img class='img-responsive' xsalt='Responsive image' src='"+prevCoverHtml+"' />";     
					rowItem += "			</div>";
					rowItem += "			<div class='works_info'>";
					rowItem += "				<div class='works_name'>"+prevArticle.getArticle_Title()+"</div>";
					rowItem += "				<div class='works_others'>";
					rowItem += "					<span class='works_others_guide'>";
					rowItem += "						<span>"+prevArticle.getArticle_Tag()+"</span>";
					rowItem += "					</span>";
					rowItem += "					<span class='works_others_info'>";
					rowItem += "						<i class='unhide icon' style='margin:0 2px 0 20px;'></i>"+prevArticle.getRead_Num()+"";
					rowItem += "						<i class='heart icon' style='margin:0 2px 0 10px;'></i>"+prevArticle.getRecommend_Num()+"";
					rowItem += "					</span>";
					rowItem += "				</div>";
					rowItem += "			</div>";
					rowItem += "		</a>";
					rowItem += "	</div>";
					rowItem += "	<div class='col-md-6'>";
					rowItem += "		<a class='works_item' href='"+new ENV().baseUrl+"/show/"+nowArticle.getArticle_ID()+"'>";
					rowItem += "			<div class='works_pic'>";
					rowItem += "				<img class='img-responsive' xsalt='Responsive image' src='"+nowCoverHtml+"' />";     
					rowItem += "			</div>";
					rowItem += "			<div class='works_info'>";
					rowItem += "				<div class='works_name'>"+nowArticle.getArticle_Title()+"</div>";
					rowItem += "				<div class='works_others'>";
					rowItem += "					<span class='works_others_guide'>";
					rowItem += "						<span>"+nowArticle.getArticle_Tag()+"</span>";
					rowItem += "					</span>";
					rowItem += "					<span class='works_others_info'>";
					rowItem += "						<i class='unhide icon' style='margin:0 2px 0 20px;'></i>"+nowArticle.getRead_Num()+"";
					rowItem += "						<i class='heart icon' style='margin:0 2px 0 10px;'></i>"+nowArticle.getRecommend_Num()+"";
					rowItem += "					</span>";
					rowItem += "				</div>";
					rowItem += "			</div>";
					rowItem += "		</a>";
					rowItem += "	</div>";
					rowItem += "</div>";
					
					listHtml += rowItem;
				}else{  // 偶数
					if(i+1 == size){  // 最后一个
						TArticle nowArticle = articles.get(i);  // 获得这一行的第二个
						
						// 获取封面
						String nowCoverHtml = "";
						if(nowArticle.getArticle_Cover()==""){
							nowCoverHtml = new ENV().baseUrl+"/common/images/cover_default.png";
						}else{
							nowCoverHtml = nowArticle.getArticle_Cover();
						}
						
						// 组织html
						String rowItem = "";
						rowItem += "<div class='row'>";
						rowItem += "	<div class='col-md-6'>";
						rowItem += "		<a class='works_item' href='"+new ENV().baseUrl+"/show/"+nowArticle.getArticle_ID()+"'>";
						rowItem += "			<div class='works_pic'>";
						rowItem += "				<img class='img-responsive' xsalt='Responsive image' src='"+nowCoverHtml+"' />";     
						rowItem += "			</div>";
						rowItem += "			<div class='works_info'>";
						rowItem += "				<div class='works_name'>"+nowArticle.getArticle_Title()+"</div>";
						rowItem += "				<div class='works_others'>";
						rowItem += "					<span class='works_others_guide'>";
						rowItem += "						<span>"+nowArticle.getArticle_Tag()+"</span>";
						rowItem += "					</span>";
						rowItem += "					<span class='works_others_info'>";
						rowItem += "						<i class='unhide icon' style='margin:0 2px 0 20px;'></i>"+nowArticle.getRead_Num()+"";
						rowItem += "						<i class='heart icon' style='margin:0 2px 0 10px;'></i>"+nowArticle.getRecommend_Num()+"";
						rowItem += "					</span>";
						rowItem += "				</div>";
						rowItem += "			</div>";
						rowItem += "		</a>";
						rowItem += "	</div>";
						rowItem += "</div>";
						
						listHtml += rowItem;
					}
				}
			}
		}
		return listHtml;
	}
	
	// 生成九宫格标签html代码
	public String generateSudokuSortHtml(List <TSort> sudokuSorts) throws UnsupportedEncodingException{
		String listHtml = "";
		int size = sudokuSorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sudokuSorts.get(i);
			String item = "<li><a href='"+new ENV().baseUrl+"/search/"+URLEncoder.encode(URLEncoder.encode(sort.getSort_Name(),"utf-8"))+"/0/2/search'>"+sort.getSort_Name()+"</a></li>";
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成热门文章列表html代码
	public String generateTopArticleHtml(List <TArticle> articles){
		String listHtml = "";
		if(articles==null){
			return listHtml;
		}
		int size = articles.size();
		for(int i=0; i<size; i++){
			TArticle article = articles.get(i);
			
			String item = "";
			item += "<p>";
			item += "	<span>●</span>";
			item += "	<a href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"'>"+article.getArticle_Title()+"</a>";
			item += "</p>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成热门笔记列表html代码
	public String generateTopNoteHtml(List <TArticle> articles){
		String listHtml = "";
		if(articles==null){
			return listHtml;
		}
		int size = articles.size();
		for(int i=0; i<size; i++){
			TArticle article = articles.get(i);
			
			String item = "";
			item += "<p>";
			item += "	<span>●</span>";
			item += "	<a href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"'>"+article.getArticle_Title()+"</a>";
			item += "</p>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成热门图书列表html代码
	public String generateTopBookHtml(List <TBook> books){
		String listHtml = "";
		if(books==null){
			return listHtml;
		}
		int size = books.size();
		for(int i=0; i<size; i++){
			TBook book = books.get(i);
			String item = "";
			item += "<div class='item'>";
			item += "	<img class='ui avatar image' src='"+book.getBook_Cover()+"'>";
			item += "	<div class='content'>";
			item += "		<div class='header'>"+book.getBook_Name()+"</div>";
			item += "		<div class='header' style='margin-top:10px;'>";
			item += "			<a href='"+book.getBook_Link()+"' target='_blank'>点此下载</a>";
			item += "		</div>";
			item += "	</div>";
			item += "</div>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成对外链接列表html代码
	public String generateLinkHtml(List <TLink> links){
		String listHtml = "";
		if(links==null){
			return listHtml;
		}
		int size = links.size();
		for(int i=0; i<size; i++){
			TLink link = links.get(i);
			String item = "";
			
			item += "<li>";
			item += "	<span class='glyphicon glyphicon-hand-right'></span>";
			item += "	<a href='"+link.getLink_Url()+"' target='_blank'>"+link.getLink_Name()+"</a>";
			item += "</li>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成标签列表html代码
	public String generateSortHtml(List <TSort> sorts) throws UnsupportedEncodingException{
		String sortHtml = "";
		if(sorts==null){
			return sortHtml;
		}
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "";
			item += "<a href='"+new ENV().baseUrl+"/search/"+URLEncoder.encode(URLEncoder.encode(sort.getSort_Name(),"utf-8"))+"/0/2/search' class='tagadelic level1' rel='tag' title='"+sort.getSort_Name()+"'>"+sort.getSort_Name()+"</a>";
			sortHtml += item;
		}
		return sortHtml;
	}
	
	// 生成评论列表html代码
	public String generateNewCommentHtml(List <TComment> comments){
		String sortHtml = "";
		if(comments==null){
			return sortHtml;
		}
		int size = comments.size();
		for(int i=0; i<size; i++){
			TComment comment = comments.get(i);
			// 如果是对关于我页面发表的评论，链接地址要更改
			if(comment.getComment_ArticleID()==999999){
				String item = "";
				item += "<p>";
				item += "	<span>"+comment.getComment_Person_Name()+"</span><br/>";
				item += "	<span>对 : </span><a href='"+new ENV().baseUrl+"/me' target='_blank'>"+comment.getComment_ArticleTitle()+"</a><br/>";
				item += "	<span>评论 : </span><a href='"+new ENV().baseUrl+"/show' target='_blank'>"+comment.getComment_Content()+"</a>";
				item += "</p>";
				sortHtml += item;
			}else{
				String item = "";
				item += "<p>";
				item += "	<span>"+comment.getComment_Person_Name()+"</span><br/>";
				item += "	<span>对 : </span><a href='"+new ENV().baseUrl+"/show/"+comment.getComment_ArticleID()+"' target='_blank'>"+comment.getComment_ArticleTitle()+"</a><br/>";
				item += "	<span>评论 : </span><a href='"+new ENV().baseUrl+"/show/"+comment.getComment_ArticleID()+"' target='_blank'>"+comment.getComment_Content()+"</a>";
				item += "</p>";
				sortHtml += item;
			}
			
		}
		return sortHtml;
	}
	
	// 生成笔记分类列表html代码
	public String generateNoteSortHtml(int sortID, List sortsNumber, List <TSort> sorts){
		String sortHtml = "";
		if(sorts==null){
			return sortHtml;
		}
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "";
			if(sortID == sort.getSort_ID()){
				item += "<a id='nodeType"+sort.getSort_ID()+"' class='active item' classifytypeid='"+sort.getSort_ID()+"'>";
				item += "	<div class='ui teal label'>"+sortsNumber.get(i)+"</div>"+sort.getSort_Name()+"";
				item += "</a>";
			}else{
				item += "<a id='nodeType"+sort.getSort_ID()+"' class='item' classifytypeid='"+sort.getSort_ID()+"'>";
				item += "	<div class='ui label'>"+sortsNumber.get(i)+"</div>"+sort.getSort_Name()+"";
				item += "</a>";
			}
			sortHtml += item;
		}
		return sortHtml;
	}
	
	// 生成笔记列表html代码
	public String generateNoteHtml(List <TArticle> articles) throws Exception{
		String listHtml = "";
		if(articles==null){
			listHtml = "<div style='margin-bottom: 100px; font-size: 30px; text-align: center; margin-top: 20px;'>此分类下暂时没有笔记</div>";
			return listHtml;
		}
		int size = articles.size();
		for(int i=0; i<size; i++){
			TArticle article = articles.get(i);
			
			// 组织标签的html
			String tagsHtml = "";
			String[] tags = article.getArticle_Tag().split(",");
			for(int j=0; j<tags.length; j++){
				String tag = URLEncoder.encode(URLEncoder.encode(tags[j],"utf-8"));
				if(j==0){
					tagsHtml += "<a title='"+tags[j]+"' rel='tag' href='"+new ENV().baseUrl+"/search/"+tag+"/0/2/search' style='font-size:13px;'>"+tags[j]+"</a>";
				}else{
					tagsHtml += " , <a title='"+tags[j]+"' rel='tag' href='"+new ENV().baseUrl+"/search/"+tag+"/0/2/search' style='font-size:13px;'>"+tags[j]+"</a>";
				}
			}
			
			String item = "";
			item += "<div id='item"+article.getArticle_ID()+"' class='ui stacked segment'>";
			item += "	<h2 class='article_title'>";
			item += "		<a href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"' style='font-size:24px;'>"+article.getArticle_Title()+"</a>";
			item += "	</h2>";
			item += "	<div class='article_date'>";
			item += "		<span property='dc:date dc:created' content='2013-11-10T12:30:01+08:00' datatype='xsd:dateTime' rel='sioc:has_creator' style='margin-right:20px;'>	发布时间 : "+article.getArticle_Date()+" </span>";
			item += "		<span style='color:#434A54;'>Tags : </span>";
			item += 		tagsHtml;
			item += "	</div>";
			item += "	<h2></h2>";
			item += "	<div id='artContent'"+article.getArticle_ID()+" class='article_content'></div>";
			item += "</div>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成图书分类列表html代码
	public String generateBookSortHtml(List <TSort> sorts){
		String listHtml = "";
		if(sorts==null){
			return listHtml;
		}
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "<li id='classify"+sort.getSort_ID()+"' data-filter='"+sort.getSort_ID()+"'>"+sort.getSort_Name()+"</li>";
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成图书列表html代码
	public String generateBookHtml(List <TBook> books){
		String listHtml = "";
		if(books==null){
			return listHtml;
		}
		int size = books.size();
		for(int i=0; i<size; i++){
			TBook book = books.get(i);
			
			String item = "";
			item += "<li data-filter-class='[\""+book.getSort_ID()+"\"]' style='display: list-item; position: absolute; top: 0px; left: 15px;'>";
			item += "	<img width='180' height='"+book.getBook_Height()+"' src='"+book.getBook_Cover()+"' />";
			item += "	<p>"+book.getBook_Name()+"</p>";
			item += "	<p>";
			item += "		<a href='"+book.getBook_Link()+"' target='_blank'>下载此书</a>";
			item += "		<span class='book_info'>";
			item += "		<i class='download disk icon' style='margin:0 2px 0 0px;'></i>"+book.getDownload_Num()+"";
			item += "		<i class='heart icon' style='margin:0 2px 0 10px;'></i>"+book.getRecommend_Num()+"";
			item += "		</span>";
			item += "	</p>";
			item += "</li>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 根据文章生成它的标签html代码
	public String generateArticleTagsHtml(TArticle article) throws UnsupportedEncodingException{
		
		String tagsHtml = "";
		String[] tags = article.getArticle_Tag().split(",");
		for(int j=0; j<tags.length; j++){
			String tag = URLEncoder.encode(URLEncoder.encode(tags[j],"utf-8"));
			if(j==0){
				tagsHtml += "<a title='"+tags[j]+"' rel='tag' href='"+new ENV().baseUrl+"/search/"+tag+"/0/2/search'>"+tags[j]+"</a>";
			}else{
				tagsHtml += " , <a title='"+tags[j]+"' rel='tag' href='"+new ENV().baseUrl+"/search/"+tag+"/0/2/search'>"+tags[j]+"</a>";
			}
		}
		
		return tagsHtml;
	}
	
	// 生成文章展示页面的上一条文章链接html代码
	public String generatePrevArticleHtml(TArticle article){
		
		String prevHtml = "";
		if(article.getArticle_ID()==null){
			prevHtml += "<i class='hand link left icon' style='font-size: 18px;'></i><span>第一篇了, 亲~</span>";
		}else{
			prevHtml += "<a href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"'><i class='hand link left icon' style='font-size: 18px;'></i>"+article.getArticle_Title()+"</a>";
		}
		
		return prevHtml;
	}
	
	// 生成文章展示页面的下一条文章链接html代码
	public String generateNextArticleHtml(TArticle article){
		
		String nextHtml = "";
		if(article.getArticle_ID()==null){
			nextHtml += "<span>坐等站主更新~</span><i class='hand link right icon' style='font-size: 18px;'></i>";
		}else{
			nextHtml += "<a href='"+new ENV().baseUrl+"/show/"+article.getArticle_ID()+"'>"+article.getArticle_Title()+"<i class='hand link right icon' style='font-size: 18px;'></i></a>";
		}
		
		return nextHtml;
	}
		
	/********************生成后台管理中所需要的html代码***************************/
	
	// 生成文章分类html代码
	public String generateAdminSortHtml(List <TSort> sorts, int sortID){
		String listHtml = "";
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "";
			if(sort.getSort_ID()==sortID){  // 当前选中的分类
				item = "<option selected='selected' value='"+sort.getSort_ID()+"' style='height:30px!important;line-height:30px!important; '> "+sort.getSort_Name()+"</option>";
			}else{
				item = "<option value='"+sort.getSort_ID()+"' style='height:30px!important;line-height:30px!important; '> "+sort.getSort_Name()+"</option>";
			}
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成父分类html代码
	public String generateAdminFSortHtml(int sortID){
		String listHtml = "";
		if(sortID==3){
			listHtml += "<option selected='selected' value='3' style='height:30px!important;line-height:30px!important; '> 图书分类</option>";
		}else{
			listHtml += "<option value='3' style='height:30px!important;line-height:30px!important; '> 图书分类</option>";
		}
		if(sortID==8){
			listHtml += "<option selected='selected' value='8' style='height:30px!important;line-height:30px!important; '> 笔记分类</option>";
		}else{
			listHtml += "<option value='8' style='height:30px!important;line-height:30px!important; '> 笔记分类</option>";
		}
		if(sortID==4){
			listHtml += "<option selected='selected' value='4' style='height:30px!important;line-height:30px!important; '> 标签分类</option>";
		}else{
			listHtml += "<option value='4' style='height:30px!important;line-height:30px!important; '> 标签分类</option>";
		}
			
		return listHtml;
	}
	
	// 生成标签分类html代码
	public String generateAdminTagsHtml(List <TSort> sorts){
		String listHtml = "";
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "";
			
			if(i==0){
				item = ""+sort.getSort_Name();
			}else{
				item = ";"+sort.getSort_Name();
			}
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成删除文章的文章html代码
	public String generateAdminArticleDelHtml(List <TArticle> articles){
		String listHtml = "";
		int size = articles.size();
		for(int i=0; i<size; i++){
			TArticle article = articles.get(i);
			String item = "";
			
			item += "<tr id='"+article.getArticle_ID()+"' class='noteItem'>";
			item += "	<td>";
			item += "		<div class='checker'>";
			item += "			<span>";
			item += "				<input class='checkboxes' type='checkbox' value='1'>";
			item += "			</span>";
			item += "		</div>";
			item += "	</td>";
			item += "	<td>"+article.getArticle_ID()+"</td>";
			item += "	<td>"+article.getArticle_Title()+"</td>";
			item += "	<td>"+article.getSort_Name()+"</td>";
			item += "	<td>"+article.getRecommend_Num()+"</td>";
			item += "	<td>"+article.getRead_Num()+"</td>";
			item += "	<td>"+article.getArticle_Date()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='oneDel("+article.getArticle_ID()+")' href='javascript:void(0)'>删除</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成修改文章的文章html代码
	public String generateAdminArticleUpdateHtml(List <TArticle> articles){
		String listHtml = "";
		int size = articles.size();
		for(int i=0; i<size; i++){
			TArticle article = articles.get(i);
			String item = "";
			
			item += "<tr id='"+article.getArticle_ID()+"' class='noteItem'>";
			item += "	<td>"+article.getArticle_ID()+"</td>";
			item += "	<td>"+article.getArticle_Title()+"</td>";
			item += "	<td>"+article.getSort_Name()+"</td>";
			item += "	<td>"+article.getRecommend_Num()+"</td>";
			item += "	<td>"+article.getRead_Num()+"</td>";
			item += "	<td>"+article.getArticle_Date()+"</td>";
			item += "	<td>";
			item += "		<a class='update' onclick='update("+article.getArticle_ID()+")' href='javascript:void(0)'>修改</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成删除图书的图书html代码
	public String generateAdminBookDelHtml(List <TBook> books){
		String listHtml = "";
		int size = books.size();
		for(int i=0; i<size; i++){
			TBook book = books.get(i);
			String item = "";
			
			item += "<tr id='"+book.getBook_ID()+"' class='noteItem'>";
			item += "	<td>";
			item += "		<div class='checker'>";
			item += "			<span>";
			item += "				<input class='checkboxes' type='checkbox' value='1'>";
			item += "			</span>";
			item += "		</div>";
			item += "	</td>";
			item += "	<td>"+book.getBook_ID()+"</td>";
			item += "	<td>"+book.getBook_Name()+"</td>";
			item += "	<td>"+book.getSort_Name()+"</td>";
			item += "	<td>"+book.getRecommend_Num()+"</td>";
			item += "	<td>"+book.getDownload_Num()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='oneDel("+book.getBook_ID()+")' href='javascript:void(0)'>删除</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成修改图书的图书html代码
	public String generateAdminBookUpdateHtml(List <TBook> books){
		String listHtml = "";
		int size = books.size();
		for(int i=0; i<size; i++){
			TBook book = books.get(i);
			String item = "";
			
			item += "<tr id='"+book.getBook_ID()+"' class='noteItem'>";
			item += "	<td>"+book.getBook_ID()+"</td>";
			item += "	<td>"+book.getBook_Name()+"</td>";
			item += "	<td>"+book.getSort_Name()+"</td>";
			item += "	<td>"+book.getRecommend_Num()+"</td>";
			item += "	<td>"+book.getDownload_Num()+"</td>";
			item += "	<td>";
			item += "		<a class='update' onclick='update("+book.getBook_ID()+")' href='javascript:void(0)'>修改</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成删除评论的评论html代码
	public String generateAdminCommentDelHtml(List <TComment> comments){
		String listHtml = "";
		int size = comments.size();
		for(int i=0; i<size; i++){
			TComment comment = comments.get(i);
			String content = comment.getComment_Content();
			if(content.length()>20){
				content = content.substring(0, 13)+"...";
			}
			String item = "";
			
			item += "<tr id='"+comment.getComment_ID()+"' class='noteItem'>";
			item += "	<td>";
			item += "		<div class='checker'>";
			item += "			<span>";
			item += "				<input class='checkboxes' type='checkbox' value='1'>";
			item += "			</span>";
			item += "		</div>";
			item += "	</td>";
			item += "	<td>"+comment.getComment_ID()+"</td>";
			item += "	<td>"+comment.getComment_Person_Name()+"</td>";
			item += "	<td title="+comment.getComment_Content()+">"+content+"</td>";
			item += "	<td>"+comment.getComment_ArticleTitle()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='oneDel("+comment.getComment_ID()+")' href='javascript:void(0)'>删除</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成修改评论的评论html代码
	public String generateAdminCommentUpdateHtml(List <TComment> comments){
		String listHtml = "";
		int size = comments.size();
		for(int i=0; i<size; i++){
			TComment comment = comments.get(i);
			String content = comment.getComment_Content();
			if(content.length()>20){
				content = content.substring(0, 16)+"...";
			}
			String item = "";
			
			item += "<tr id='"+comment.getComment_ID()+"' class='noteItem'>";
			item += "	<td>"+comment.getComment_ID()+"</td>";
			item += "	<td>"+comment.getComment_Person_Name()+"</td>";
			item += "	<td title="+comment.getComment_Content()+">"+content+"</td>";
			item += "	<td>"+comment.getComment_ArticleTitle()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='update("+comment.getComment_ID()+")' href='javascript:void(0)'>修改</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成删除链接的链接html代码
	public String generateAdminLinkDelHtml(List <TLink> links){
		String listHtml = "";
		int size = links.size();
		for(int i=0; i<size; i++){
			TLink link = links.get(i);
			String item = "";
			
			item += "<tr id='"+link.getLink_ID()+"' class='noteItem'>";
			item += "	<td>";
			item += "		<div class='checker'>";
			item += "			<span>";
			item += "				<input class='checkboxes' type='checkbox' value='1'>";
			item += "			</span>";
			item += "		</div>";
			item += "	</td>";
			item += "	<td>"+link.getLink_ID()+"</td>";
			item += "	<td>"+link.getLink_Name()+"</td>";
			item += "	<td>"+link.getLink_Url()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='oneDel("+link.getLink_ID()+")' href='javascript:void(0)'>删除</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成更新链接的链接html代码
	public String generateAdminLinkUpdateHtml(List <TLink> links){
		String listHtml = "";
		int size = links.size();
		for(int i=0; i<size; i++){
			TLink link = links.get(i);
			String item = "";
			
			item += "<tr id='"+link.getLink_ID()+"' class='noteItem'>";
			item += "	<td>"+link.getLink_ID()+"</td>";
			item += "	<td>"+link.getLink_Name()+"</td>";
			item += "	<td>"+link.getLink_Url()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='update("+link.getLink_ID()+")' href='javascript:void(0)'>修改</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成删除分类的分类html代码
	public String generateAdminSortDelHtml(List <TSort> sorts){
		String listHtml = "";
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "";
			
			item += "<tr id='"+sort.getSort_ID()+"' class='noteItem'>";
			item += "	<td>";
			item += "		<div class='checker'>";
			item += "			<span>";
			item += "				<input class='checkboxes' type='checkbox' value='1'>";
			item += "			</span>";
			item += "		</div>";
			item += "	</td>";
			item += "	<td>"+sort.getSort_ID()+"</td>";
			item += "	<td>"+sort.getSort_Name()+"</td>";
			item += "	<td>"+sort.getF_Sort()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='oneDel("+sort.getSort_ID()+")' href='javascript:void(0)'>删除</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成修改分类的分类html代码
	public String generateAdminSortUpdateHtml(List <TSort> sorts){
		String listHtml = "";
		int size = sorts.size();
		for(int i=0; i<size; i++){
			TSort sort = sorts.get(i);
			String item = "";
			
			item += "<tr id='"+sort.getSort_ID()+"' class='noteItem'>";
			item += "	<td>"+sort.getSort_ID()+"</td>";
			item += "	<td>"+sort.getSort_Name()+"</td>";
			item += "	<td>"+sort.getF_Sort()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='update("+sort.getSort_ID()+")' href='javascript:void(0)'>修改</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成删除用户的用户html代码
	public String generateAdminUserDelHtml(List <TUser> users){
		String listHtml = "";
		int size = users.size();
		for(int i=0; i<size; i++){
			TUser user = users.get(i);
			String item = "";
			
			item += "<tr id='"+user.getUser_ID()+"' class='noteItem'>";
			item += "	<td>";
			item += "		<div class='checker'>";
			item += "			<span>";
			item += "				<input class='checkboxes' type='checkbox' value='1'>";
			item += "			</span>";
			item += "		</div>";
			item += "	</td>";
			item += "	<td>"+user.getUser_ID()+"</td>";
			item += "	<td>"+user.getUser_Account()+"</td>";
			item += "	<td>"+user.getUser_Email()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='oneDel("+user.getUser_ID()+")' href='javascript:void(0)'>删除</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
	// 生成更新用户的用户html代码
	public String generateAdminUserUpdateHtml(List <TUser> users){
		String listHtml = "";
		int size = users.size();
		for(int i=0; i<size; i++){
			TUser user = users.get(i);
			String item = "";
			
			item += "<tr id='"+user.getUser_ID()+"' class='noteItem'>";
			item += "	<td>"+user.getUser_ID()+"</td>";
			item += "	<td>"+user.getUser_Account()+"</td>";
			item += "	<td>"+user.getUser_Email()+"</td>";
			item += "	<td>";
			item += "		<a class='delete' onclick='update("+user.getUser_ID()+")' href='javascript:void(0)'>修改</a>";
			item += "	</td>";
			item += "</tr>";
			
			listHtml += item;
		}
		return listHtml;
	}
	
}
