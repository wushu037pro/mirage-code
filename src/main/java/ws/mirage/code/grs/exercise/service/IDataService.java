package ws.mirage.code.grs.exercise.service;

import java.util.List;

import org.springframework.ui.ModelMap;

import ws.mirage.code.grs.exercise.entity.Pp;
import ws.mirage.code.grs.exercise.entity.User;
import ws.mirage.code.grs.exercise.vo.PpVo;

/**
 * 来电信息的业务层接口
 * @author 94080
 *
 */
public interface IDataService {
	
	/**
	 * 新增来电信息and表单详情数据
	 * @param user 来电信息数据
	 * @param pp 表单详情数据
	 */
	void addnew(User user,Pp pp);
	
	/**
	 * 生成表单编码
	 * @param modelMap 转发对象
	 */
	void generate(ModelMap modelMap);
	
	/**
	 * 查询下拉选内容
	 * @param modelMap
	 */
	void showOption(ModelMap modelMap);
	
	/**
	 * 查询显示简略表数据
	 * @param modelMap
	 * @return 简略表数据
	 */
	List<PpVo> miniTable();
	
	/**
	 * 根据id查询所有详情数据
	 * @param pid
	 * @param modelMap
	 */
	void selectPtl(Integer pid,ModelMap modelMap);
	
	
	/**
	 * 根据手机号进行修改来电信息表，根据表单编码进行修改表单详情表
	 * @param user 来电信息表数据
	 * @param pp 表单详情表数据
	 */
	void update(User user,Pp pp);
	
	/**
	 * 根据表单编码删除数据
	 * @param formCode
	 */
	void delete(String formCode);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
