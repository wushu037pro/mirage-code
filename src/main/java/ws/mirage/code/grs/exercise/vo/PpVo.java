package ws.mirage.code.grs.exercise.vo;

import java.io.Serializable;

/**
 * 简略表Vo类
 * @author 94080
 *
 */
public class PpVo implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Integer pid;
	private String phone;
	private String username;
	private String phoneTime;
	private String formCode;
	private String formSrc;
	private String nature;
	private String branch;
	
	@Override
	public String toString() {
		return "PpVo [pid=" + pid + ", phone=" + phone + ", username=" + username + ", phoneTime=" + phoneTime
				+ ", formCode=" + formCode + ", formSrc=" + formSrc + ", nature=" + nature + ", branch=" + branch + "]";
	}
	
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhoneTime() {
		return phoneTime;
	}
	public void setPhoneTime(String phoneTime) {
		this.phoneTime = phoneTime;
	}
	public String getFormCode() {
		return formCode;
	}
	public void setFormCode(String formCode) {
		this.formCode = formCode;
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
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((branch == null) ? 0 : branch.hashCode());
		result = prime * result + ((formCode == null) ? 0 : formCode.hashCode());
		result = prime * result + ((formSrc == null) ? 0 : formSrc.hashCode());
		result = prime * result + ((nature == null) ? 0 : nature.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		result = prime * result + ((phoneTime == null) ? 0 : phoneTime.hashCode());
		result = prime * result + ((pid == null) ? 0 : pid.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		PpVo other = (PpVo) obj;
		if (branch == null) {
			if (other.branch != null)
				return false;
		} else if (!branch.equals(other.branch))
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
		if (nature == null) {
			if (other.nature != null)
				return false;
		} else if (!nature.equals(other.nature))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		if (phoneTime == null) {
			if (other.phoneTime != null)
				return false;
		} else if (!phoneTime.equals(other.phoneTime))
			return false;
		if (pid == null) {
			if (other.pid != null)
				return false;
		} else if (!pid.equals(other.pid))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	
	
}
