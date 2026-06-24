# SD Notes

A companion notes site for students in the Software Development program. Written by a TA, for students — plain language, no assumed knowledge.

Built with [Hugo](https://gohugo.io/) and the [Hextra](https://github.com/imfing/hextra) theme.

---

## Courses

| Course | Folder |
|---|---|
| Intro to Programming (Java) | `content/docs/intro-programming-java/` |
| Intro to Web Development | `content/docs/intro-to-web-dev/` |
| IT Foundations | `content/docs/it-foundations/` |
| Problem Solving | `content/docs/problem-solving/` |

Each course folder has an `_index.md` that acts as the section landing page with a topic card grid. Individual topic pages live alongside it in the same folder.

---

## Local Development

**Prerequisites:** [Hugo](https://gohugo.io/getting-started/installing/), [Go](https://golang.org/doc/install), [Git](https://git-scm.com)

```shell
git clone https://github.com/JKells99/SDNOTESNEW.git
cd SDNOTESNEW
hugo mod tidy
hugo server --disableFastRender -p 1313
```

Visit `http://localhost:1313` to preview the site.

## Adding Content

### New topic page inside an existing course

Create a markdown file in the course folder:

```
content/docs/intro-programming-java/arrays.md
```

Add frontmatter at the top:

```yaml
---
title: Arrays
weight: 4
---
```

Then add a card for it in the course `_index.md`.

### New course

1. Create a folder under `content/docs/`
2. Add an `_index.md` with a `title` and `weight`
3. Add a card for the course in `content/docs/_index.md` and `content/_index.md`

## Update Theme

```shell
hugo mod get -u
hugo mod tidy
```
