---
title: "2.0 Exercises — Java Environment and Syntax"
weight: 2
---

## Overview

Practice exercises for Topic 2.0: Java Environment and Syntax.

Topics covered: JVM/JRE/JDK, writing and running Java programs, syntax rules, and naming conventions.

Exercises are broken into short labs. Complete each lab before moving to the next.

---

## Lab 1 — JDK, JRE, and JVM

**Goal:** Understand the three layers of the Java environment and what each one does.

Answer the following in your notes:

1. What does **JDK** stand for, and what is it used for?
2. What does **JRE** stand for, and what is it used for?
3. What does **JVM** stand for, and what is it used for?
4. When you click "Run" in IntelliJ, which of the three is responsible for actually executing your program?
5. If you only wanted to *run* a Java program (not write or compile one), which would you need installed?

**Matching exercise — draw a line connecting each term to its role:**

| Term | Role |
|---|---|
| JDK | The full toolkit — includes the compiler and everything developers need to write Java |
| JRE | Contains the JVM plus the standard libraries Java programs need to run |
| JVM | Runs compiled Java bytecode on your machine |

---

## Lab 2 — The Compile and Run Process

**Goal:** Understand what happens between writing code and seeing output.

Java programs go through two steps before you see any output:

1. **Compile** — the Java compiler (`javac`) converts your `.java` source file into a `.class` bytecode file.
2. **Run** — the JVM reads the `.class` file and executes it.

Answer in your notes:
1. What file extension does your source code have?
2. What file extension does the compiled bytecode have?
3. What tool converts `.java` to `.class`?
4. What runs the `.class` file?
5. Why does Java use this two-step process instead of running source code directly?

**Optional — try it in the terminal:**

If you have Java installed, open a terminal and try compiling and running manually:

```bash
javac HelloWorld.java
java HelloWorld
```

Note what files appear in your folder after running `javac`.

---

## Lab 3 — Anatomy of a Java Program

**Goal:** Identify and name the parts of a basic Java program.

Label each numbered line in your notes using the terms from the word bank.

```java
public class Greeting {                          // 1
    public static void main(String[] args) {     // 2
        System.out.println("Good morning!");     // 3
    }                                            // 4
}                                                // 5
```

**Word bank:** class declaration, closing brace, main method signature, print statement, opening brace (already shown inline)

Answer these questions too:
1. What must the filename be for this program to compile?
2. What would happen if you changed `Greeting` to `greeting` (lowercase)?
3. What does `public` mean in line 1?

---

## Lab 4 — Fix the Syntax Errors

**Goal:** Read compiler errors and understand what they mean.

The following programs each contain one syntax error. For each one:
- Read the code and find the error before running it.
- Write what you think the error is in your notes.
- Fix it and confirm the program compiles and runs.

**Program A:**
```java
public class ProgramA {
    public static void main(String[] args) {
        System.out.println("Hello")
    }
}
```

**Program B:**
```java
public class ProgramB {
    public static void main(String[] args) {
        System.out.Println("Hello");
    }
}
```

**Program C:**
```java
Public class ProgramC {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

**Program D:**
```java
public class ProgramD {
    public static void main(String[] args) {
        System.out.println("Hello");
}
```

For each program, write in your notes:
- What was wrong?
- What error message did the IDE show (or what did you predict)?

---

## Lab 5 — Naming Conventions

**Goal:** Apply Java naming conventions correctly.

Java has standard conventions for naming things. Fix the names below so they follow proper Java style.

| Item | Bad Name | Corrected Name |
|---|---|---|
| A class | `my_calculator` | ? |
| A variable | `TotalPrice` | ? |
| A variable | `number_of_students` | ? |
| A class | `printreceipt` | ? |
| A variable | `X` | ? |

**Rules to apply:**
- **Classes** use `PascalCase` — every word starts with a capital letter. Example: `MyCalculator`
- **Variables** use `camelCase` — first word lowercase, each following word capitalized. Example: `totalPrice`
- Variable names should be descriptive — single letters like `x` are only acceptable as loop counters.

---

## Lab 6 — Write a Program with Correct Conventions

**Goal:** Write a program that follows all Java syntax rules and naming conventions.

Write a Java program that stores three pieces of information about a student and prints them.

**Requirements:**
- Class name: `StudentInfo`
- Use three variables: one for the student's name, one for their age, one for their grade (as a decimal, e.g. `87.5`)
- Variable names must follow camelCase
- Print each value on its own line with a label

**Expected output (example):**
```
Name: Alex
Age: 19
Grade: 87.5
```

---

## Lab 7 — Comments and Readability

**Goal:** Learn when and how to write useful comments.

A good comment explains the **why** — a decision, a constraint, or something that isn't obvious from reading the code. It does not repeat what the code already says.

**Not useful:**
```java
// Stores the student's full name
String studentName = "Alex";
```
The variable name already tells you that. The comment adds nothing.

**Useful:**
```java
// Grade is stored as a percentage out of 100, not a letter grade
double studentGrade = 87.5;
```
That's something the variable name alone doesn't tell you.

---

Take the program you wrote in Lab 6 and make these two additions:

1. Add a block comment at the top of the file with your name, the date, and a one-sentence description of what the program does.
2. Find one thing in your program that isn't obvious from the variable names alone and add a single-line comment explaining it. If everything is already clear, add a comment explaining why you chose `double` for the grade instead of `int`.

**Block comment format:**
```java
/*
 * Author: Jordan
 * Date: 2026-06-26
 * Description: Prints basic student info to the console
 */
```

---

## Lab 8 — Challenge: Your First Full Program

**Goal:** Put everything from Topic 2.0 together in one program.

Write a Java program called `TripCostEstimator` that:
1. Stores a destination name (as a `String`)
2. Stores a distance in kilometres (as a `double`)
3. Stores a fuel cost per kilometre (as a `double`)
4. Calculates the total trip cost
5. Prints a summary with all four values labelled

**Requirements checklist:**
- [ ] Filename matches the class name exactly
- [ ] Class name uses PascalCase
- [ ] All variable names use camelCase and are descriptive
- [ ] Program compiles and runs without errors
- [ ] Output clearly labels each value

**Example output:**
```
Destination: Ottawa
Distance: 450.0 km
Cost per km: $0.15
Total trip cost: $67.5
```
