package ws.mirage.code.grs.exercise.entity;

import java.io.Serializable;
import java.util.Arrays;

/**
 * 实体类-表单信息表
 * @author 94080
 *
 */
public class Pp implements Serializable{

	private static final long serialVersionUID = 1L;
	
			private String formSrc;
			private String nature;
			private String content;
			private String title;
			private String area;
			private String event;
			private Integer time;
			private String[] branchPage;//接收复选框参数
			private String branch;	//复选框转换成字符串存入数据库
			private String detail;
			private Integer mode;
			private String answer;
			private String formCode;
			private Integer uid;
			
			@Override
			public String toString() {
				return "Pp [formSrc=" + formSrc + ", nature=" + nature + ", content=" + content + ", title=" + title
						+ ", area=" + area + ", event=" + event + ", time=" + time + ", branchPage="
						+ Arrays.toString(branchPage) + ", branch=" + branch + ", detail=" + detail + ", mode=" + mode
						+ ", answer=" + answer + ", formCode=" + formCode + ", uid=" + uid + "]";
			}
			
			public String getFormSrc() {
				return formSrc;
			}
			public void setFormSrc(String formSrc) {
				this.formSrc = formSrc;
			}
			public String getNature() {
				return nature;
			}
			public void setNature(String nature) {
				this.nature = nature;
			}
			public String getContent() {
				return content;
			}
			public void setContent(String content) {
				this.content = content;
			}
			public String getTitle() {
				return title;
			}
			public void setTitle(String title) {
				this.title = title;
			}
			public String getArea() {
				return area;
			}
			public void setArea(String area) {
				this.area = area;
			}
			public String getEvent() {
				return event;
			}
			public void setEvent(String event) {
				this.event = event;
			}
			public Integer getTime() {
				return time;
			}
			public void setTime(Integer time) {
				this.time = time;
			}
			public String[] getBranchPage() {
				return branchPage;
			}
			public void setBranchPage(String[] branchPage) {
				this.branchPage = branchPage;
			}
			public String getBranch() {
				return branch;
			}
			public void setBranch(String branch) {
				this.branch = branch;
			}
			public String getDetail() {
				return detail;
			}
			public void setDetail(String detail) {
				this.detail = detail;
			}
			public Integer getMode() {
				return mode;
			}
			public void setMode(Integer mode) {
				this.mode = mode;
			}
			public String getAnswer() {
				return answer;
			}
			public void setAnswer(String answer) {
				this.answer = answer;
			}
			public String getFormCode() {
				return formCode;
			}
			public void setFormCode(String formCode) {
				this.formCode = formCode;
			}
			public Integer getUid() {
				return uid;
			}
			public void setUid(Integer uid) {
				this.uid = uid;
			}
			@Override
			public int hashCode() {
				final int prime = 31;
				int result = 1;
				result = prime * result + ((answer == null) ? 0 : answer.hashCode());
				result = prime * result + ((area == null) ? 0 : area.hashCode());
				result = prime * result + ((branch == null) ? 0 : branch.hashCode());
				result = prime * result + Arrays.hashCode(branchPage);
				result = prime * result + ((content == null) ? 0 : content.hashCode());
				result = prime * result + ((detail == null) ? 0 : detail.hashCode());
				result = prime * result + ((event == null) ? 0 : event.hashCode());
				result = prime * result + ((formCode == null) ? 0 : formCode.hashCode());
				result = prime * result + ((formSrc == null) ? 0 : formSrc.hashCode());
				result = prime * result + ((mode == null) ? 0 : mode.hashCode());
				result = prime * result + ((nature == null) ? 0 : nature.hashCode());
				result = prime * result + ((time == null) ? 0 : time.hashCode());
				result = prime * result + ((title == null) ? 0 : title.hashCode());
				result = prime * result + ((uid == null) ? 0 : uid.hashCode());
				return result;
			}
			@Override
			public boolean equals(Object obj) {
				if (this == obj)
					return true;
				if (obj == null)
					return false;
				if (getClass() != obj.getClass())
					return false;
				Pp other = (Pp) obj;
				if (answer == null) {
					if (other.answer != null)
						return false;
				} else if (!answer.equals(other.answer))
					return false;
				if (area == null) {
					if (other.area != null)
						return false;
				} else if (!area.equals(other.area))
					return false;
				if (branch == null) {
					if (other.branch != null)
						return false;
				} else if (!branch.equals(other.branch))
					return false;
				if (!Arrays.equals(branchPage, other.branchPage))
					return false;
				if (content == null) {
					if (other.content != null)
						return false;
				} else if (!content.equals(other.content))
					return false;
				if (detail == null) {
					if (other.detail != null)
						return false;
				} else if (!detail.equals(other.detail))
					return false;
				if (event == null) {
					if (other.event != null)
						return false;
				} else if (!event.equals(other.event))
					return false;
				if (formCode == null) {
					if (other.formCode != null)
						return false;
				} else if (!formCode.equals(other.formCode))
					return false;
				if (formSrc == null) {
					if (other.formSrc != null)
						return false;
				} else if (!formSrc.equals(other.formSrc))
					return false;
				if (mode == null) {
					if (other.mode != null)
						return false;
				} else if (!mode.equals(other.mode))
					return false;
				if (nature == null) {
					if (other.nature != null)
						return false;
				} else if (!nature.equals(other.nature))
					return false;
				if (time == null) {
					if (other.time != null)
						return false;
				} else if (!time.equals(other.time))
					return false;
				if (title == null) {
					if (other.title != null)
						return false;
				} else if (!title.equals(other.title))
					return false;
				if (uid == null) {
					if (other.uid != null)
						return false;
				} else if (!uid.equals(other.uid))
					return false;
				return true;
			}
	
			
		
	

}
