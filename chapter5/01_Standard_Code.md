# Java代码规范

说明：本规范分为不同的级别，默认级别为必须遵循级别，而(II)为建议级别，非强制执行。

## 18.1 格式与命名规范(Formating and Naming Conventions)

1. 最重要:不用死记硬背，直接使用Eclipse的自动格式化功能。
2. 换行:每行120字符以上--因为现在屏幕已大为宽广。
3. 括号:if,for,while语句全部使用括号包围。
4. 命名规则:
    
    * 不允许使用汉语拼音命名 避免使用下划线(静态变量除外)
    * 接口尽量采用"able", "ible", or "er"，如Runnable命名
    * 尽量不采用首字母为I或加上IF后缀的命名方式，如IBookDao,BookDaoIF。(II)

## 18.2 注释规范(Document Convertions)

1. 注释类型

    * JAVA DOC注释
    
    /\*\*\* .... **/
    
    * 失效代码注释
    
    由/\*\*... **/界定，标准的C-Style的注释。专用于注释已失效的代码。
    
    * 代码细节注释
    
    由//界定，专用于注释代码细节。

    注意：即使有多行注释也仍然使用//，以便与用/**/注释的失效代码分开。
    
2. 注释的格式
   
    * 注释中的第一个句子要以（英文）句号、问号或者感叹号结束。Javadoc生成工具会将注释中的第一个句子放在方法汇总表和索引中。
    * 为了在JavaDoc和IDE中能快速链接跳转到相关联的类与方法，尽量多的使用@see xxx.MyClass，@see xx.MyClass#find(String)。
    * Class必须以@author声明作者，体现代码责任，通过@since ${date}标记代码最初产生时间，通过@version \$\$Id: Standard-Code.xml 4930 2014-03-04 09:45:57Z wzp $$记录当前版本信息
    * 标识(java keyword, class/method/field/argument名，Constants)在注释中第一次出现时以 {@linkxxx.Myclass}注解以便JavaDoc与IDE中可以链接。(II)

3. 注释的内容



    
    
    