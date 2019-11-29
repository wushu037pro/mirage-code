package ws.mirage.code.grs.exercise.entity;

import java.io.Serializable;

/**
 * 实体类-来电信息表
 * @author 94080
 *
 */
public class User implements Serializable{

	private static final long serialVersionUID = 1L;
		
		private Integer uid;
		private String phone;
		private String phoneHome;
		private String phoneTime;
		private String username;
		private String phone2;
		private Integer isSecrecy;
		private String home;
		
		@Override
		public String toString() {
			return "User [uid=" + uid + ", phone=" + phone + ", phoneHome=" + phoneHome + ", phoneTime=" + phoneTime
					+ ", username=" + username + ", phone2=" + phone2 + ", isSecrecy=" + isSecrecy + ", home=" + home
					+ "]";
		}
		
		public Integer getUid() {
			return uid;
		}
		public void setUid(Integer uid) {
			this.uid = uid;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getPhoneHome() {
			return phoneHome;
		}
		public void setPhoneHome(String phoneHome) {
			this.phoneHome = phoneHome;
		}
		public String getPhoneTime() {
			return phoneTime;
		}
		public void setPhoneTime(String phoneTime) {
			this.phoneTime = phoneTime;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPhone2() {
			return phone2;
		}
		public void setPhone2(String phone2) {
			this.phone2 = phone2;
		}
		public Integer getIsSecrecy() {
			return isSecrecy;
		}
		public void setIsSecrecy(Integer isSecrecy) {
			this.isSecrecy = isSecrecy;
		}
		public String getHome() {
			return home;
		}
		public void setHome(String home) {
			this.home = home;
		}
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((home == null) ? 0 : home.hashCode());
			result = prime * result + ((isSecrecy == null) ? 0 : isSecrecy.hashCode());
			result = prime * result + ((phone == null) ? 0 : phone.hashCode());
			result = prime * result + ((phone2 == null) ? 0 : phone2.hashCode());
			result = prime * result + ((phoneHome == null) ? 0 : phoneHome.hashCode());
			result = prime * result + ((phoneTime == null) ? 0 : phoneTime.hashCode());
			result = prime * result + ((uid == null) ? 0 : uid.hashCode());
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
			User other = (User) obj;
			if (home == null) {
				if (other.home != null)
					return false;
			} else if (!home.equals(other.home))
				return false;
			if (isSecrecy == null) {
				if (other.isSecrecy != null)
					return false;
			} else if (!isSecrecy.equals(other.isSecrecy))
				return false;
			if (phone == null) {
				if (other.phone != null)
					return false;
			} else if (!phone.equals(other.phone))
				return false;
			if (phone2 == null) {
				if (other.phone2 != null)
					return false;
			} else if (!phone2.equals(other.phone2))
				return false;
			if (phoneHome == null) {
				if (other.phoneHome != null)
					return false;
			} else if (!phoneHome.equals(other.phoneHome))
				return false;
			if (phoneTime == null) {
				if (other.phoneTime != null)
					return false;
			} else if (!phoneTime.equals(other.phoneTime))
				return false;
			if (uid == null) {
				if (other.uid != null)
					return false;
			} else if (!uid.equals(other.uid))
				return false;
			if (username == null) {
				if (other.username != null)
					return false;
			} else if (!username.equals(other.username))
				return false;
			return true;
		}
		
	
		
}
