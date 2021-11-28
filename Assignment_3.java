package com.company;
import java.util.Scanner;

public class Assignment_3 {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);

        System.out.println("Enter a String :");
        String str= sc.nextLine();

        System.out.println("Enter a Character :");
        String ch=sc.next();
        
        int firstIndex= str.indexOf(ch);
        if (firstIndex<0) {
            System.out.println("character is not found");
        } else {
            for(int i=firstIndex+1;i<str.length();i++) {
                System.out.print(str.charAt(i));
            }
        }
    }
}
