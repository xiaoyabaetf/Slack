package com.citi.java891011;

public interface MyFun {
    default  String getName(){//默认方法
        return "haha";
    }

    public static void say(){
        System.out.println("static");
    }
}
