package ws.mirage.code.grs.exercise.service.impl;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import ws.mirage.code.grs.exercise.entity.FCBasic;
import ws.mirage.code.grs.exercise.entity.OpBasic;
import ws.mirage.code.grs.exercise.entity.Pp;
import ws.mirage.code.grs.exercise.entity.User;
import ws.mirage.code.grs.exercise.mapper.DataMapper;
import ws.mirage.code.grs.exercise.service.IDataService;
import ws.mirage.code.grs.exercise.vo.PpUserVo;
import ws.mirage.code.grs.exercise.vo.PpVo;


/**
 * 来电信息的业务层实现类
 * @author 94080
 *
 */
@Service
public class DataServiceImpl implements IDataService{

	@Autowired
	DataMapper dataMapper;

	//保存新建页数据，进行数据处理后保存到数据库
	@Override
	public void addnew(User user, Pp pp) {
		//将（字符串）数组转化为字符串
		String[] arr = pp.getBranchPage();
		String str = Arrays.toString(arr);
		pp.setBranch(str);
		//调用Mapper将user保存到持久层
		Integer rows1 = dataMapper.addnewUser(user);
		//设置外键，从数据库中读取uid，然后存入
		pp.setUid(dataMapper.getUid());
		System.err.println("外键uid为："+dataMapper.getUid());
		//调用Mapper将pp连带外键存入
		Integer rows2 = dataMapper.addnewPp(pp);
		System.err.println("插入来电信息表生效行数"+rows1);
		System.err.println("插入表单详情表生效行数"+rows2);
	}
	
	//生成表单编码,并回存基础表数据
	//生成来电时间
	@Override
	public void generate(ModelMap modelMap) {
		//查询表单编码基础表的相关信息
		FCBasic fcBasic = dataMapper.fcBasic();
		
		//1.获取编码前缀
		String str1 = fcBasic.getPrefix();
		//2.获取编码日期，并和今天做对比
		String str2 = fcBasic.getDateRe();	//数据库中的参考日期
		Date now = new Date();
		SimpleDateFormat sdf
			= new SimpleDateFormat("yyyyMMdd");
		String nowDate = sdf.format(now);	//今天的日期
		//3.获取并回存编码序号
		int str3 = fcBasic.getCodeRe();
		//根据日期判断处理序号
		if(str2.equals(nowDate)) {
			//日期一样，则编码序号＋1回存
			dataMapper.upCodeRe(str3+1);
		}else {
			//日期不一样，则编码序号归2回存(因为现在还要用个1，所以相当于是回存1+1)
			dataMapper.upCodeRe(2);
			//新日期回存
			dataMapper.upDateRe(nowDate);
			//使用新序号和新日期
			str3 = 1;
			str2 = nowDate;
		}
		//4.处理编码序号，左侧补0
		String str4 = null;
		if(str3<10000){
			str4 = String.format("%04d", str3);
		}
		//拼接成表单编码，绑定到modelMap
		String str = str1+str2+str4;
		modelMap.addAttribute("formCode", str);
		
		//生成来电时间,并绑定
		SimpleDateFormat sdf2 
					= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String phoneTime = sdf2.format(now);
		modelMap.addAttribute("phoneTime", phoneTime);
	}
	
	//查询下拉选内容
	@Override
	public void showOption(ModelMap modelMap) {
		//调用Mapper进行持久层查询
		List<OpBasic> options = dataMapper.opBasic();
		//将数据绑定到modelMap
		modelMap.addAttribute("options",options);
	}

	//查询简略表显示内容
	@Override
	public List<PpVo> miniTable() {
		//调用Mapper进行持久层查询
		List<PpVo> list = dataMapper.miniTable();
		return list;
		
	}
	
	//根据id查询所有详情数据
	@Override
	public void selectPtl(Integer pid, ModelMap modelMap) {
		//调用Mapper进行持久层查询
		PpUserVo pu = dataMapper.selectPtl(pid);
		//将查询出的数据绑定到ModelMap
		modelMap.addAttribute("pu", pu);
	}

	//进行修改操作
	@Override
	public void update(User user, Pp pp) {
		//将（字符串）数组转化为字符串
		String[] arr = pp.getBranchPage();
		String str = Arrays.toString(arr);
		pp.setBranch(str);
			//根据表单编码查询uid，并设置到user中
			String formCode = pp.getFormCode();
			Integer uid = dataMapper.selectUid(formCode);
			user.setUid(uid);
		//来电信息表的修改，依据是表单详情表的表单编码所在数据的外键--uid
		Integer row1 = dataMapper.upUser(user);
		//表单详情表的修改，依据是pp.formCode
		Integer row2 = dataMapper.upPp(pp);
		System.out.println("修改来电信息表"+row1);
		System.out.println("修改表单详情表"+row2);
	}
	
	//删除数据
	@Override
	public void delete(String formCode) {
		//删除来电信息
		Integer row1 = dataMapper.deleteUser(formCode);
		//删除表单详情
		Integer row2 = dataMapper.deletePp(formCode);
	}

	
	
	

	
}
