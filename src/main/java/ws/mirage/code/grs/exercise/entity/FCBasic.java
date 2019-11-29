package ws.mirage.code.grs.exercise.entity;

import java.io.Serializable;

/**
 * 实体类-表单编码参考表
 * @author 94080
 *
 */
public class FCBasic implements Serializable{

	private static final long serialVersionUID = 1L;
	private String dateRe;
	private Integer codeRe;
	private String prefix;
	
	@Override
	public String toString() {
		return "FCBasic [dateRe=" + dateRe + ", codeRe=" + codeRe + ", prefix=" + prefix + "]";
	}
	public String getDateRe() {
		return dateRe;
	}
	public void setDateRe(String dateRe) {
		this.dateRe = dateRe;
	}
	public Integer getCodeRe() {
		return codeRe;
	}
	public void setCodeRe(Integer codeRe) {
		this.codeRe = codeRe;
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codeRe == null) ? 0 : codeRe.hashCode());
		result = prime * result + ((dateRe == null) ? 0 : dateRe.hashCode());
		result = prime * result + ((prefix == null) ? 0 : prefix.hashCode());
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
		FCBasic other = (FCBasic) obj;
		if (codeRe == null) {
			if (other.codeRe != null)
				return false;
		} else if (!codeRe.equals(other.codeRe))
			return false;
		if (dateRe == null) {
			if (other.dateRe != null)
				return false;
		} else if (!dateRe.equals(other.dateRe))
			return false;
		if (prefix == null) {
			if (other.prefix != null)
				return false;
		} else if (!prefix.equals(other.prefix))
			return false;
		return true;
	}
	
	
	
}
