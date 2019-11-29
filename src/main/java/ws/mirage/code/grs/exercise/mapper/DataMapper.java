package ws.mirage.code.grs.exercise.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ws.mirage.code.grs.exercise.entity.FCBasic;
import ws.mirage.code.grs.exercise.entity.OpBasic;
import ws.mirage.code.grs.exercise.entity.Pp;
import ws.mirage.code.grs.exercise.entity.User;
import ws.mirage.code.grs.exercise.vo.PpUserVo;
import ws.mirage.code.grs.exercise.vo.PpVo;

/**
 * 处理`来电信息`and`表单详情`数据的持久层接口
 *  不用添加@Mapper注解
 * @author 94080
 *
 */
@Mapper
public interface DataMapper {
	/**
	 * 增加来电信息
	 * @param myUser 来电信息数据
	 * @return 受影响的行数
	 */
	Integer addnewUser(User user);

	/**
	 * 增加表单详情
	 * @param pp 表单详情数据
	 * @return 受影响的行数
	 */
	Integer addnewPp(Pp pp);

	/**
	 * 查询表单编码参考表
	 * @return 表单编码表的实体类对象
	 */
	FCBasic fcBasic();

	/**
	 * 更新表单编码序号参考值
	 * @param codeRe +1后的序号
	 * @return 受影响的行数
	 */
	Integer upCodeRe(Integer codeRe);

	/**
	 * 更新表单编码日期参考值
	 * @param dateRe
	 * @return
	 */
	Integer upDateRe(String dateRe);

	/**
	 * 查询下拉选基础表
	 * @return
	 */
	List<OpBasic> opBasic();

	/**
	 * 为了获取外键，获取uid
	 * @return
	 */
	Integer getUid();

	/**
	 * 查询少量关联数据，用于显示简略表
	 * @return
	 */
	List<PpVo> miniTable();

	/**
	 * 根据id查询两个表的详细数据
	 * @return
	 */
	PpUserVo selectPtl(Integer pid);
	
	/**
	 * 进行来电信息表的修改，依据是user.phone
	 * @param user 来电信息表数据
	 */
	Integer upUser(User user);

	/**
	 * 进行表单详情表的修改，依据是pp.formCode
	 * @param pp 表单详情表数据
	 */
	Integer upPp(Pp pp);
	
	/**
	 * 根据表单编码查询外键uid
	 * @param formCode
	 * @return
	 */
	Integer selectUid(String formCode);
	
	/**
	 * 删除来电信息数据
	 * @param formCode 表单编码
	 * @return 有效行数
	 */
	Integer deleteUser(String formCode);

	/**
	 * 删除表单详情数据
	 * @param formCode 表单编码
	 * @return 有效行数
	 */
	Integer deletePp(String formCode);

	





}

