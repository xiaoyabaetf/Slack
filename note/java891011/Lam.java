package com.citi.java891011;

import org.testng.annotations.Test;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.BiFunction;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.LongStream;
import java.util.stream.Stream;

// https://blog.csdn.net/qq_21040559/article/details/123465033
// 冒号的用法
public class Lam {
    //lesson 6 方法引用和构造器

    List<Employee> employees=Arrays.asList(
            new Employee("AA",12,100L,Status.BUSY,11.11),
            new Employee("AA2",123,1000L,Status.VOCATION,22.22),
            new Employee("AA3",1234,10000L,Status.FREE,33.33),
            new Employee("AA4",12345,100000L,Status.BUSY,44.44)
    );

    //类和静态方法
    // https://blog.csdn.net/weixin_44241240/article/details/118109348
    public void test3(){
        Comparator<Integer> com=(x,y)->Integer.compare(x,y);
        Comparator<Integer> com1=Integer::compare;
    }

    //类和实例方法
    public void test4(){
      BiPredicate<String,String> bp=(x, y)->x.equals(y);
      BiPredicate<String,String> bp1=String::equals;
    }

    //构造器引用（无参）
    @Test
    public void test5(){
        Supplier<Employee> sup=()->new Employee();
        Supplier<Employee> sup1=Employee::new;
        Employee emp=sup.get();
        Employee emp1=sup1.get();

    }

    //构造器引用（有参）
    @Test
    public void test6(){
        Function<String,Employee> fun=(x)->new Employee(x);
        Function<String,Employee> fun1=Employee::new;
        Employee emp= fun.apply("101");
        System.out.println(emp);

        BiFunction<String,Integer,Employee> fun2=Employee::new;
        Employee emp2= fun2.apply("102",1);
        System.out.println(emp2);

    }

    //数组的引用
    @Test
    public void test7(){
        Function<Integer,String[]> fun=(x)->new String[x];
        Function<Integer,String[]> fun1=String[]::new;
        String[] str= fun.apply(10);
        String[] str1= fun.apply(10);
        System.out.println(str.length);
        System.out.println(str1.length);
    }

    //lesson 7 创建stream
    @Test
    public void test8(){
        //通过Collection 的stream（）或者parllelStream
        List<String> list= new ArrayList<>();
        Stream<String> stream=list.stream();

        //通过Arrarys中的静态方法stream()获取数组流
        Employee[] emps=new Employee[10];
        Stream<Employee> stream1= Arrays.stream(emps);

        //通过stream类的静态方法of()
        Stream<String> stream3=Stream.of("aa","bb","cc");

        //创建无限流
        //迭代
        Stream<Integer>  stream4= Stream.iterate(0,(x)->x+2);
        stream4.limit(10).forEach(System.out::println);

        //随机数生成流
        Stream.generate(()->Math.random())
                .limit(5)
                .forEach(System.out::println);
    }

    //lesson 8 stream筛选和切片
    @Test
    public void test9(){
        //中间操作，不会执行任何操作
            Stream<Employee> stream=employees.stream()
                    .filter((e)->{
                        System.out.println("中间操作");
                        return e.getAge()>100;
                    })
                    .skip(2)
                    .distinct();//去重 ，通过生成元素的hascode和 equals去除重复元素
            //惰性求值
            stream.forEach(System.out::println);
    }

    //外部迭代
    @Test
    public void test10(){
        Iterator<Employee> it=employees.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }

    //lesson 9 映射

    @Test
    public void test11(){
        List<String> list = Arrays.asList("aa","bb","cc");
        list.stream()
                .map(str->str.toUpperCase())
                .forEach(System.out::println);

        employees.stream()
                .map(Employee::getName)
                .forEach(System.out::println);

       Stream<Stream<Character>> stream= list.stream()
                .map(Lam::filterCharacter);
        stream.forEach((sm)->{
            sm.forEach(System.out::println);
        });


    }

    public static Stream<Character> filterCharacter(String str){
        List<Character> list=new ArrayList<>();
        for(Character ch:str.toCharArray()){
            list.add(ch);
        }
        return list.stream();
    }

    @Test
    public void test12(){
        List<String> list = Arrays.asList("aa","bb","cc");
        List list2=new ArrayList();
        list2.add(11);
        list2.add(22);
        list2.addAll(list);
        System.out.println(list2);
    }

    //lesson 10排序

    @Test
    public void test13(){
        List<String> list = Arrays.asList("aa","bb","cc");
        List list2=new ArrayList();
        list.stream()
                .sorted()
                .forEach(System.out::println);
        employees.stream()
                .sorted((e1,e2)->{
                    if(e1.getAge().equals(e2.getAge())){
                        return e1.getName().compareTo(e2.getName());
                    }else{
                        return -e1.getAge().compareTo(e2.getAge());
                    }
                }).forEach(System.out::println);
    }

    //lesson 11查找与匹配

    @Test
    public void test14(){
        //检查是否匹配所有元素 必须全部都满足才会返回true
       boolean b1= employees.stream()
                .allMatch((e)->e.getStatus().equals(Status.BUSY));
       System.out.println(b1);

       //检查是否至少匹配一个元素 只要有一个条件满足即返回true
       boolean b2= employees.stream()
                .anyMatch((e)->e.getStatus().equals(Status.BUSY));
        System.out.println(b2);

        //检查是否没有匹配所有元素 全都不满足才会返回true
        boolean b3= employees.stream()
                .noneMatch((e)->e.getStatus().equals(Status.BUSY));
        System.out.println(b3);

        Long count=employees.stream()
                .count();
        System.out.println(count);

        Optional<Employee> op2= employees.stream()
                .max((e1,e2)->Double.compare(e1.getInav(),e2.getInav()));
        System.out.println(op2.get());

        Optional<Double> op3= employees.stream()
                .map(Employee::getInav)
                .min(Double::compare);
        System.out.println(op3.get());

        Optional<Double> op4= employees.stream()
                .map(Employee::getInav)
                .min((e1,e2)->Double.compare(e1,e2));
        System.out.println(op4.get());

    }

    //lesson 12 规约与收集
    @Test
    public void test15(){
      List<String> list= employees.stream()
               .map(Employee::getName)
               .collect(Collectors.toList());
       list.forEach(System.out::println);

        Set<String> set= employees.stream()
                .map(Employee::getName)
                .collect(Collectors.toSet());
        set.forEach(System.out::println);

        HashSet<String> hs= employees.stream()
                .map(Employee::getName)
                .collect(Collectors.toCollection(HashSet::new));
        hs.forEach(System.out::println);

        //求流总数
      Long count = employees.stream()
                .collect(Collectors.counting());
        System.out.println(count);

        //求平均值
       Double avg= employees.stream()
                .collect(Collectors.averagingDouble(Employee::getInav));
        System.out.println(avg);

        //总和
        Double sum= employees.stream()
                .collect(Collectors.summingDouble(Employee::getInav));
        System.out.println(sum);

        //最大值
        Optional<Employee> max= employees.stream()
                        .collect(Collectors.maxBy((e1,e2)->Double.compare(e1.getInav(), e2.getInav())));
        System.out.println(max.get());

        //最小值
       Optional<Double> min= employees.stream()
                .map(Employee::getInav)
                .collect(Collectors.minBy(Double::compare));
        System.out.println(min.get());

        //分组
       Map<Enum,List<Employee>> map = employees.stream()
                .collect(Collectors.groupingBy(Employee::getStatus));
        System.out.println(map);

        //多级分组
      Map<Enum,Map<String,List<Employee>>>  map1=employees.stream()
                .collect(Collectors.groupingBy(Employee::getStatus,Collectors.groupingBy((e)->{
                    if(e.getAge()<30){
                        return "青年";
                    }else if(e.getAge()<100){
                        return "老年";
                    }else{
                        return "几千年";
                    }
                })));
        System.out.println(map1);

        //分区 根据true or false
        Map<Boolean, List<Employee>> map3 = employees.stream()
                    .collect(Collectors.partitioningBy((e)->e.getSalary()>800));
        System.out.println(map3);

    }

    //join
    @Test
    public void test16(){
           String str= employees.stream()
                    .map(Employee::getName)
                    .collect(Collectors.joining("+"));
           System.out.println(str);

    }

    @Test //集中求和 平均值 最大值
    public void test17(){
        DoubleSummaryStatistics dss= employees.stream()
                .collect(Collectors.summarizingDouble(Employee::getInav));

        System.out.println(dss.getSum());
        System.out.println(dss.getAverage());
        System.out.println(dss.getMax());


    }

    @Test
    public void test18(){
        List<Integer> list=Arrays.asList(1,2,3,4);
        Integer sum= list.stream()
                .reduce(0,(x,y)->x+y);
        System.out.println(sum);

        Optional<Double> OP= employees.stream()
                .map(Employee::getInav)
                .reduce(Double::sum);
        System.out.println(OP.get());

        Optional<Integer> count= employees.stream()
                .map(e->1)
                .reduce(Integer::sum);
        System.out.println(count.get());

    }

    @Test //并行流和串行流
    public void test19(){
       Instant start= Instant.now();
        LongStream.rangeClosed(0,100000L)
                .parallel()
                .reduce(0,Long::sum);

        Instant end=Instant.now();
        System.out.println("消费时间"+ Duration.between(start,end).toMillis());

    }

    //lesson 15 Optional容器类
    //null表示一个值不存在 optianal可以更好的表达这个概念，并且可以避免空指针异常
    @Test
    public void test20(){
            //of不能构建null
        Optional<Employee> op=Optional.of(new Employee());
        System.out.println(op.get());

        //构建一个空的optional
        Optional<Employee> op1=Optional.empty();

        Optional<Employee> op2= Optional.ofNullable(new Employee());
        if(op2.isPresent()){//如果有值
            System.out.println(op2.get());
        }

        Employee emp= op2.orElse(new Employee());//如果为null用默认值
        Employee emp1 = op2.orElseGet(()-> new Employee());//功能同上

        Optional<Employee> op3= Optional.ofNullable(new Employee("zhangsan",22));
        Optional<String> str= op3.map(e->e.getName());
        System.out.println(str.get());

        Optional<String> str1= op3.flatMap(e-> Optional.of(e.getName()));
        System.out.println(str1.get());

    }

    //lesson 16 接口中的默认方法与静态方法
    @Test
    public void test21(){
        //见另外的文件

    }

    //lesson 17传统时间格式化的线程安全问题
    //老时间（date，canlender,simpledateformate）
    @Test
    public void test22() throws ExecutionException, InterruptedException {
       // SimpleDateFormat sdf=new SimpleDateFormat("yyMMdd");

        ExecutorService pool= Executors.newFixedThreadPool(10);

        Callable<Date> task=new Callable<Date>() {
            @Override
            public Date call() throws Exception {
              //  return sdf.parse("20161218");//线程不安全的写法
                return DateFormatThreadLocal.convert("20161218");//线程安全写法
            }
        };
        List<Future<Date>> results=new ArrayList<>();
        for(int i=0;i<10;i++){
            results.add(pool.submit(task));//启动10个线程
        }
        for(Future<Date> future: results){
            System.out.println(future.get());
        }
        pool.shutdown();
    }

    @Test//新的时间线程安全的写法
    public void test23() throws ExecutionException, InterruptedException {
        // SimpleDateFormat sdf=new SimpleDateFormat("yyMMdd");

        DateTimeFormatter dtf=DateTimeFormatter.ofPattern("yyyyMMdd");
        ExecutorService pool= Executors.newFixedThreadPool(10);

        Callable<LocalDate> task=new Callable<LocalDate>() {
            @Override
            public LocalDate call() throws Exception {
                //  return sdf.parse("20161218");//线程不安全的写法
                return LocalDate.parse("20161218",dtf);//线程安全写法
            }
        };
        List<Future<LocalDate>> results=new ArrayList<>();
        for(int i=0;i<10;i++){
            results.add(pool.submit(task));//启动10个线程
        }
        for(Future<LocalDate> future: results){
            System.out.println(future.get());
        }
        pool.shutdown();
    }

    @Test// lesson18 新的时间Api1
    public void test24() {
        //当前时间
        LocalDateTime ldt=LocalDateTime.now();//年月日时分秒
        System.out.println(ldt);

        LocalDateTime ldt2=LocalDateTime.of(2015,1,13,22,33);
        System.out.println(ldt2);

        LocalDateTime ldt3=ldt.plusYears(2);
        LocalDateTime ldt4=ldt.minusYears(2);

        System.out.println(ldt.getYear());
        System.out.println(ldt.getMonthValue());
        System.out.println("===============");
        //时间戳

        Instant ins1=Instant.now();//utc时间
        System.out.println(ins1);

        OffsetDateTime odt= ins1.atOffset(ZoneOffset.ofHours(8));
        System.out.println(odt);
        System.out.println(ins1.toEpochMilli());//instance转毫秒
        Instant ins2=Instant.ofEpochSecond(60);
        System.out.println(ins2);
        System.out.println("===============");
        //计算两个时间间隔
        Instant instant3=Instant.now();
        try{
            Thread.sleep(1000);
        }catch(Exception e){

        }
        Instant instant4=Instant.now();
        Duration duration=Duration.between(instant3,instant4);
        System.out.println(duration.toMillis());

        LocalTime localTime1=LocalTime.now();//时分秒
        System.out.println(localTime1);
        try{
            Thread.sleep(1000);
        }catch(Exception e){

        }
        LocalTime localTime2=LocalTime.now();
        Duration duration2=Duration.between(localTime1,localTime2);
        System.out.println(duration2.toMillis());
        System.out.println("===============");

        //计算两个日期间隔
        LocalDate ld1=LocalDate.of(2015,1,4);
        LocalDate ld2=LocalDate.now();
        Period period=Period.between(ld1,ld2);
        System.out.println(period.getYears());
    }

    @Test// lesson19 时间矫正器
    public void test25() {
       LocalDateTime ldt=LocalDateTime.now();
        System.out.println(ldt);
       LocalDateTime ild2=ldt.withDayOfMonth(10);//矫正器
       System.out.println(ild2);
        System.out.println("===============");
       LocalDateTime ild3= ldt.with(TemporalAdjusters.next(DayOfWeek.SUNDAY));//矫正器
       System.out.println(ild3);
        System.out.println("===============");

        LocalDateTime ild5 = ldt.with((i)->{//矫正器
          LocalDateTime ild4=(LocalDateTime) i;
          System.out.println(ild4);
           DayOfWeek dow= ild4.getDayOfWeek();
          if(dow.equals(DayOfWeek.FRIDAY)){
              return ild4.plusDays(3);
          }else{
              return ild4.plusDays(1);
          }
       });
      // System.out.println(dow);

    }
    @Test// lesson20 时间格式化与时区处理
    public void test26() {

            DateTimeFormatter dtf=DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime ldt=LocalDateTime.now();
            String strDate=ldt.format(dtf);
            System.out.println("515" +"   " +strDate);
            System.out.println("=================");

            DateTimeFormatter dtf2=DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String  strDate2=dtf2.format(ldt);
            System.out.println("520"+ "   " +strDate2);
            System.out.println("=================");

            LocalDateTime aa= ldt.parse(strDate2,dtf2);
            System.out.println("524"+ "   " +aa);
            System.out.println("=================");

            //ZonedDate ZonedTime  ZonedDateTime
//            Set<String> str=ZoneId.getAvailableZoneIds();
//            str.forEach(System.out::println);

            LocalDateTime aa1= LocalDateTime.now(ZoneId.of("Asia/Gaza"));
            System.out.println(aa1);


        }

}
