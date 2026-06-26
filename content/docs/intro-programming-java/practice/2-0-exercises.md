---
title: "2.0 Problems — Java Environment and Syntax"
weight: 2
---

Scenario-based problems covering Java class structure, syntax rules, and naming conventions. Every program you write should compile and run without errors, use correct PascalCase class names, and use descriptive camelCase variable names.

---

## Problem 1 — Student Profile

A school needs a simple program to display a student's profile. The profile includes the student's full name, their student ID number, their program of study, and their current GPA.

Write a program that stores this information in appropriately named variables and prints each field on its own line with a label.

---

## Problem 2 — Product Label

A small business needs to print a basic label for a product. The label should display the product name, the price, and the quantity currently in stock.

Write a program that stores this information and prints a clean, labelled summary to the console.

---

## Problem 3 — Broken Code

The following programs each contain exactly one error. For each program, read the code, identify the error, fix it, and write a one-sentence explanation of what was wrong.

**Program A:**
```java
public class Welcome {
    public static void main(String[] args) {
        System.out.println("Welcome to Java")
    }
}
```

**Program B:**
```java
public class welcome {
    public static void main(String[] args) {
        System.out.println("Welcome to Java");
    }
}
```

**Program C:**
```java
public class Welcome {
    public static void main(String[] args) {
        System.out.Println("Welcome to Java");
    }
}
```

**Program D:**
```java
public class Welcome {
    public static void main(String[] args) {
        System.out.println("Welcome to Java");
}
```

---

## Problem 4 — Name the Variables

A developer has written a program using poor variable names. Rewrite the program using names that clearly describe what each variable holds, following Java naming conventions.

```java
public class BadNames {
    public static void main(String[] args) {
        String a = "Jordan";
        int b = 21;
        String c = "Software Development";
        double d = 3.85;

        System.out.println("Name: " + a);
        System.out.println("Age: " + b);
        System.out.println("Program: " + c);
        System.out.println("GPA: " + d);
    }
}
```

---

## Problem 5 — Event Poster

A venue needs to print a formatted event poster to the console for an upcoming show. The poster should display the event name, the date, the venue, the doors open time, and the ticket price — laid out neatly with consistent spacing and a border made of dashes or equals signs.

Write a program that stores all event details in variables and prints the poster. Focus on clean formatting and correct naming conventions.

---

## Problem 6 — Temperature Converter

A weather application needs to convert a temperature from Celsius to Fahrenheit. The formula is: `F = (C × 9/5) + 32`.

Write a program that stores a Celsius temperature as a variable, converts it, and prints both the original and converted values with labels. Use variable names that make the unit of measurement clear.
