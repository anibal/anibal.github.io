---
title: "Hallucination is the Fundamental Feature of LLMs"
description: "An LLM cannot not hallucinate because in essence that is how it works: hallucinating that next word (tokens), producing a plausible text (image, audio, etc.) that may have no grounding in reality."
date: 2025-10-20
lang: en
translationOf: la-alucinacion-es-el-feature-fundamental-de-los-llms
tags:
  - programming
  - positive-hallucinations
  - negative-hallucinations
  - hallucinations
  - software
  - llm
  - software-development
  - programming-assistants
---
> *Translated from the [Spanish original](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/) with AI assistance. The original was written entirely by hand, no AI involved.*

An LLM can**not** *not* hallucinate, because in essence that is how it works: *hallucinating* that next word (tokens), producing a *plausible* text (image, audio, etc.) *that may have no grounding in reality*. So when we use a *Programming Assistant* that integrates an LLM to help us build software — in particular to program, to generate code — there is **always** the possibility that the code is good for nothing, which is what we call *hallucinations*.

Hallucinations *tend* to work. Nowadays an LLM being the engine behind an IDE's predictive text is the norm, and in general this adds a lot of value for programmers; but on the other hand we know that even at this level of micro-assistance the models make mistakes.

So, considering this reality, we can say there are:

- **Positive Hallucinations:** When they *add* value. This goes beyond the code compiling, or being interpretable — that is not value in itself. A positive hallucination implies a positive *impact* on our work developing software and, eventually, on the lives of the people who use it.

- **Negative Hallucinations**: When they *subtract* value, taking our time, demanding our effort to correct them, or simply because, even if they compile, they neither improve the state of the code nor help move it forward. An example of this is an assistant doing an unrequested refactoring that leaves us exactly where we started.

Back when I used to code, many times I went through the experience of saying *"Hmmm, I bet I can do something like..."*, quickly trying it in a REPL, and getting "lucky" with the syntax being correct. Of course that "luck" was no such thing: I had simply internalized the patterns of the programming language, and that "hallucination" was so well aligned with them that it ended up being **positive**.

There are schools of thought proposing that we humans constantly hallucinate the world. Indeed, our mind operates within the organic limitations of the central nervous system, and we have to function with that limited model of the world, because it is impossible to process and represent **all** the information in the world with our limited brain, with our limited senses.

If you have ever asked yourself **"WHAT WORLD DOES THAT PERSON LIVE IN?!"**, the answer is simple, and it is the same for all of us: *in their own world*.

When the *intersection* between our model of the world, the world itself, and the world models of the people we interact with is wide, everything works fine; when that intersection is very small, we don't understand each other, and it can reach the extreme case where we need professional help because we end up in psychosis. If you want an easier way to see it, we could say that **creativity** is a form of positive hallucination in humans.

For practical purposes, LLMs "internalize", "generalize", **language patterns** — among them those of programming languages and the structures of software systems, which at the end of the day are described in different kinds of documents. This, together with other mechanisms, gives them the capacity to generate *plausible* answers when we ask them to write code.

If I were creating a new programming language and exploring new constructs for it, the ability to hallucinate a nonexistent syntax would also have a **positive** net balance. So we can conclude that *the value of hallucinations is contextual*, not absolute.

**Why this framing?** Because we are human, and it is very easy to fall into the mistake of attributing *cognition*, even consciousness and intentionality, to an entity that has the capacity to produce language.

This is **not useful**, because we automatically attribute a "fault" to an LLM, or to an assistant integrating one or more LLMs, when its output does not meet the expectations in our mind. And we never get around to understanding the fundamental principles that govern these technologies, nor to adjusting our practices around them.

This is the first article in a series focused on the fundamental principles and practices around software development assisted by Generative Artificial Intelligence.

In the second part of the series, [The Mathematics of AI-Assisted Code](/2025/10/28/the-mathematics-of-ai-assisted-code/), I explore more formally the impact of positive and negative hallucinations on the value of using Programming Assistants.

---
## Other articles in the series

2. [The Mathematics of AI-Assisted Code](/2025/10/28/the-mathematics-of-ai-assisted-code/)
3. [A Systems View of AI-Assisted Programming](/2025/11/03/a-systems-view-of-ai-assisted-programming/)
4. [Steering - Favoring Positive Hallucinations in Programming Assistants](/2025/11/06/steering-favoring-positive-hallucinations/)
5. [Backpressure - Rejecting Negative Hallucinations in Programming Assistants](/2025/11/26/backpressure-rejecting-negative-hallucinations/)
