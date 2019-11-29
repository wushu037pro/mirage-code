package ws.mirage.code.grs.exercise.entity;

import java.io.Serializable;

/**
 * 实体类-下拉选基础表
 * @author 94080
 *
 */
public class OpBasic implements Serializable{

	private static final long serialVersionUID = 1L;
	private String formSrc;
	private String nature;
	
	@Override
	public String toString() {
		return "OpBasic [formSrc=" + formSrc + ", nature=" + nature + "]";
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((formSrc == null) ? 0 : formSrc.hashCode());
		result = prime * result + ((nature == null) ? 0 : nature.hashCode());
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
		OpBasic other = (OpBasic) obj;
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
		return true;
	}
	
	
}
