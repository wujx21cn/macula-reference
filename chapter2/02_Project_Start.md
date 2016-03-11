# 项目集成

## 登录集成

## 预验证集成
	/**
	 * 返回验证好的凭据，一般是用户名，通常是通过第三方认证系统来验证凭据
	 * @param request
	 * @return UserPrincipal
	 */
	public Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
		// 获取用户名和密码，向统一认证验证你的用户名和密码
		// 成功返回用户名，否则返回null;
	}
	
	/**
	 * 通常是密码
	 * @param request
	 * @return Credentials
	 */
	public Object getPreAuthenticatedCredentials(HttpServletRequest request) {
		return “N/A”;
	}







