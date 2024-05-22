package com.citi.java891011;


//public class TestSub extends SubClass implements  MyFun{ //类优先原则
//
//    public static void main(String[] args) {
//        TestSub testSub=new TestSub();
//         String str=testSub.getName();
//         System.out.println(str);
//    }
//}

public class TestSub  implements  MyFun, MyFun1{ //类优先原则

    public static void main(String[] args) {
        TestSub testSub=new TestSub();
        String str=testSub.getName();
        System.out.println(str);
        MyFun.say();
    }

    @Override
    public String getName() {
        return MyFun1.super.getName();
    }
}