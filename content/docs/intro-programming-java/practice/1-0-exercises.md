---
title: "1.0 Exercises — Introduction to Programming Concepts"
weight: 1
---

## Overview

Practice exercises for Topic 1.0: Introduction to Programming Concepts.

Topics covered: running code in your IDE, the IPO model, and structured programming logic.

Exercises are broken into short labs. Complete each lab before moving to the next.

---

## Lab 1 — Your First Run

**Goal:** Confirm your IDE is working and you can run a Java program.

Type the following program out manually — do not copy and paste.

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

1. Create a new Java project in your IDE.
2. Create a file named `HelloWorld.java` inside the `src` folder.
3. Type the code above exactly as written.
4. Run the program. Confirm the output panel shows: `Hello, World!`

**Reflect in your notes:**
- What happens if you misspell `println`?
- What happens if you remove the semicolon at the end of line 3?

---

## Lab 2 — Multiple Output Lines

**Goal:** Print more than one line of output.

Update your `HelloWorld` program to print your name, your course name, and today's date on separate lines.

**Expected output (example):**
```
Name: Jordan
Course: Intro to Programming
Date: 2026-06-26
```

**Hint:** You need one `System.out.println(...)` statement per line.

---

## Lab 3 — Identify IPO in Everyday Programs

**Goal:** Recognize the Input, Process, and Output stages in real programs.

For each program below, write the Input, Process, and Output in your notes before checking the answers.

| Program | Input | Process | Output |
|---|---|---|---|
| A calculator adding two numbers | ? | ? | ? |
| A weather app | ? | ? | ? |
| A login screen | ? | ? | ? |

<details>
<summary>Show Answers</summary>

| Program | Input | Process | Output |
|---|---|---|---|
| A calculator adding two numbers | Two numbers typed by the user | Add them together | The sum shown on screen |
| A weather app | Your location | Look up forecast data for that location | Temperature and conditions shown on screen |
| A login screen | Username and password | Check if they match a stored account | "Welcome" or "Incorrect password" |

</details>

---

## Lab 4 — Trace IPO in Code

**Goal:** Read a program and map it to the IPO model.

Read the following program carefully. It uses `Scanner` to collect input — don't worry about how that works yet, it's covered in Topic 3.0. Focus only on identifying what counts as input, process, and output.

```java
import java.util.Scanner;

public class AreaCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the length: ");
        double length = scanner.nextDouble();

        System.out.print("Enter the width: ");
        double width = scanner.nextDouble();

        double area = length * width;

        System.out.println("The area is: " + area);
    }
}
```

Answer in your notes:
1. What is the **Input**?
2. What is the **Process**?
3. What is the **Output**?
4. If the user enters `5` for length and `3` for width, what will the program print?

---

## Lab 5 — Write a Sequence

**Goal:** Write a program where steps run in order from top to bottom.

Write a Java program that calculates the total cost of a purchase with tax.

**Your program must:**
1. Declare a variable for the item price (use `49.99`).
2. Declare a variable for the tax rate (use `0.13` for 13%).
3. Calculate the tax amount.
4. Calculate the total (price + tax).
5. Print the price, tax amount, and total on separate lines.

**Expected output:**
```
Item price: $49.99
Tax (13%): $6.4987
Total: $56.4887
```

**Starter code:**
```java
public class PurchaseTotal {
    public static void main(String[] args) {
        double price = 49.99;
        double taxRate = 0.13;

        // your code here

    }
}
```

---

## Lab 6 — Trace a Sequence

**Goal:** Predict what a program does before running it.

Read this program and write your predicted output in your notes. Then run it to check.

```java
public class TraceMe {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        int c = a + b;
        int d = c * 2;

        System.out.println("a = " + a);
        System.out.println("b = " + b);
        System.out.println("c = " + c);
        System.out.println("d = " + d);
    }
}
```

Answer in your notes:
1. What is the value of `c`?
2. What is the value of `d`?
3. What order do the four lines print in?
4. Move `int d = c * 2;` to before `int c = a + b;`. What error do you get? Why?

---

## Lab 7 — Your First Program with User Input

**Goal:** Run a program that collects input from the user — with the Scanner setup already provided.

The following program asks the user for two numbers and prints their sum. The `Scanner` setup is done for you — your job is to add the calculation and the output.

```java
import java.util.Scanner;

public class AddNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the first number: ");
        double firstNumber = scanner.nextDouble();

        System.out.print("Enter the second number: ");
        double secondNumber = scanner.nextDouble();

        // your code here: calculate the sum and print it

    }
}
```

1. Type this program out in your IDE.
2. Add one line to calculate the sum.
3. Add one line to print it with a label, e.g. `Sum: 12.0`
4. Run it and test with a few different numbers.

---

## Lab 8 — Challenge: Bring It All Together

**Goal:** Use IPO, sequence logic, and IDE skills in one program — this time writing it from scratch.

Write a Java program that:
1. Asks the user to enter their name and a number.
2. Squares the number (`number * number`).
3. Prints: `Hello Jordan! The square of 7 is 49.`

This exercise uses:
- Running code in the IDE
- IPO (user input → square calculation → printed result)
- Sequence logic (steps run in a fixed order)

**Hint:** Use the same `Scanner` pattern from Lab 7 to collect input. You'll need `scanner.nextLine()` for the name and `scanner.nextDouble()` for the number.
