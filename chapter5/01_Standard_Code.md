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

    * 可精简的注释内容
    
    注释中的每一个单词都要有其不可缺少的意义，注释里不写"@param name -名字"这样的废话。

    如果该注释是废话，连同标签删掉它，而不是自动生成一堆空的标签，如空的@param name，空的@return
    
    * 推荐的注释内容
    
    对于调用复杂的API尽量提供代码示例。(II)

    对于已知的Bug需要声明，//TODO 或 //FIXME 声明:未做/有Bug的代码。(II)
    
    Null规约:  如果方法允许Null作为参数，或者允许返回值为Null，必须在JavaDoc中说明。否则方法的调用者不允许使用Null作为参数，并认为返回值是Null Safe(不会返回NULL)。

## 18.3 编程规范(Programming Conventions)    

1. 基本规范

    * 当API会面对不可知的调用者时，方法需要对输入参数进行校验，如不符合则抛出IllegalArgumentException，建议使用Spring的Assert系列函数。
    * 因为System.out.println()，e.printStackTrace()仅把信息显示在控制台，因此不允许使用，必须使用logger打印并记录信息。
    * 
    
    