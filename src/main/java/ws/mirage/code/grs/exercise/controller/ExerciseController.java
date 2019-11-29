package ws.mirage.code.grs.exercise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ws.mirage.code.grs.exercise.entity.Pp;
import ws.mirage.code.grs.exercise.entity.User;
import ws.mirage.code.grs.exercise.service.IDataService;
import ws.mirage.code.grs.exercise.util.ResponseMiniTable;
import ws.mirage.code.grs.exercise.util.ResponseUpdate;
import ws.mirage.code.grs.exercise.vo.PpVo;

/**
 * 地铁练习控制器，分发请求功能
 * @author 94080
 *
 */
@Controller
@RequestMapping("/exercise")
public class ExerciseController {
	
	//获得service层的对象，声明的是抽象类，实际得到的是实现类对象。笔记里有
	@Autowired
	private IDataService dataService;
	
	//地址请求my/showAll、在其他页面点击返回，返回`简略表`
	@RequestMapping("/showAll")
	public String show() {
	    System.err.println(5555555);
		//只返回页面，数据为页面内layui异步请求获得
		return "exercise/showAll";
	}
	
	//简略表页面内 layui数据表格请求，返回json数据
	@RequestMapping("/showAll/miniTable")
	@ResponseBody
	public ResponseMiniTable<List<PpVo>> table() { 
		//调用service层，返回PpVo类，springmvc自动找合适的转换器转成json
		List<PpVo> list = dataService.miniTable();
		System.err.println(list);
		//下边代码规范的话也应该在service层的，回头再改吧
		ResponseMiniTable<List<PpVo>> table = new ResponseMiniTable<List<PpVo>>();
		//table 组件默认规定的数据格式为  code:0 count:1000 msg:""
		table.setCode(0);
		table.setCount(1000);
		table.setMsg("");
		table.setData(list);
		System.err.println("table"+table);
		return table;
	}
	
	//点击`创建新工单`，显示新增页面
	@RequestMapping("/clickNew")
	public String ShowAll(ModelMap modelMap) {
		//调用service层，生成表单编码和来电时间
		dataService.generate(modelMap);
		//调用service层，查找下拉选内容
		dataService.showOption(modelMap);
		return "exercise/addnew";
	}
	
	//`新增`页面内点击`保存`，进行保存(副表)来电信息+(主表)表单详情
	@RequestMapping("/addnew")
	public String Addnew(User user,Pp pp) {
		System.err.println(user);
		System.err.println(pp);
		//调用service层
		dataService.addnew(user,pp);
		//重定向到简略表
		return "redirect:showAll";
	}
	
	
	//`查看详情`按钮，根据id查询两个表所有数据
	@RequestMapping("/particulars") 
	public String selectPtl(Integer pid,ModelMap modelMap) {
		System.err.println("查看的id为："+pid);//获取到id
		//调用service层，根据id进行查询
		dataService.selectPtl(pid, modelMap);
		//调用service层，查找下拉选内容
		dataService.showOption(modelMap);
		return "exercise/particulars";
	}
	
	//详情页的'修改并保存'按钮，进行修改操作
	@RequestMapping("/update")
	@ResponseBody
	public ResponseUpdate<Void> update(User user,Pp pp) {
		//调用service层，修改来电信息表，修改表单详情表
		dataService.update(user, pp);
		//利用ajax返回修改成功
		return new ResponseUpdate<Void>(1,"修改成功");
	}
	
	//简略表'删除'，根据表单编码删除。
	@RequestMapping("/delete")
	@ResponseBody
	public String delete(String formCode) {
		//System.err.println(formCode);
		//调用service层删除
		dataService.delete(formCode);
		return null;
	}
	
	//详情页'删除'，根据表单编码删除，但是要重定向到简略表页面
	@RequestMapping("/pDelete")
	public String pDelete(String formCode) {
		//System.err.println("测试一下详情页删除"+formCode);
		//调用service层删除
		dataService.delete(formCode);
		return "redirect:showAll";
	}

	

	
	//`离开手机号码框`事件请求，按照手机号码查询，有则返回数据，没有则不管
	
	
	
	
}

