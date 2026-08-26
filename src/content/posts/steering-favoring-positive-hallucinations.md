---
title: "Steering - Favoring Positive Hallucinations in Programming Assistants"
description: "This fourth installment of the “Fundamental Principles for Using Programming Assistants” series focuses on “steering”, the term I will use here to refer to the practices that let a Programming Assistant consistently favor the production of positive hallucinations — hallucinations that deliver value to developers and to the users of our application."
date: 2025-11-06
lang: en
translationOf: steering-favoreciendo-las-alucinaciones-positivas
tags:
  - programming-assistants
  - context
  - code
  - vibe-coding
  - positive-hallucinations
  - systems
---
> *Translated from the [Spanish original](/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas/) with AI assistance. The original was written entirely by hand, no AI involved.*

This fourth installment of the "Fundamental Principles for Using Programming Assistants" series focuses on "steering", the term I will use here to refer to the practices that let a [Programming Assistant](/2025/11/03/a-systems-view-of-ai-assisted-programming/) consistently favor the production of [positive hallucinations](/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/) — hallucinations that deliver value to developers and to the users of our application.

In essence, *steering* consists of creating and maintaining the *bare minimum* environment of *aligned* *instructions* and *examples* (patterns) that get integrated into the context at the *right moment* and *tilt* the model toward generating "good software".

Here we need to widen our view of the system to now cover not just the assistant but also the existing code and tooling, because this steering operates along two dimensions that are complementary and aligned:
- Our own software and tooling, which is our object of interest, and...
- All the assistant-specific information meant to better align it with our code and development environment — the best-known and simplest example being the `AGENTS.md` or `CLAUDE.md` files

And the most brutal reality of software development is that **the bulk of all code is inherited, and one way or another we have to live with the decisions of the past, whether they were ours or not** — and we have to understand and adjust those past decisions to work with assistants.

On the other hand, we should be clear that we are adding a new dimension to this "inheritance", and that with files like `AGENTS.md` we are barely seeing the tip of the iceberg
## What You Inherit, You Didn't Steal

If our code already follows good practices consistently, then when the Assistant loads that code into the context, it will serve as a reference pattern for the model.

This steering can happen "naturally", because the Assistant is always going to "read" and load existing code into context, but it is even better if we encourage it by explicitly asking it to look for examples in the code and to analyze them before planning or moving forward with a task.

As a policy it is useful to favor changes to the code that not only have an *immediate* positive impact, but that also serve as positive feedback to the system and help favor our needs down the road.
## The Downward Spiral of Vibe Coding

Needless to say, if our code does not follow good practices, is inconsistent, or carries technical debt that is not explicit (not documented) and not dealt with, its mere presence in the context is a powerful driver for continuing down a spiral of declining quality with every generation.

And this is the explanation for why, as "vibecoded" projects grow, they tend to collapse under the compound effect of all the bad practices, contradictory practices, and errors that keep piling up incrementally, reaching a point where no matter how much code gets added, it is impossible to reconcile all that bad inheritance into something coherent and functional.

**Clarification**: When Karpathy coined the term "Vibe Coding" he was referring to disposable, proof-of-concept (PoC) type software that lets you explore an idea and is not expected to see continued use or development over time.
## Meanwhile, on the Assistant's Side

Steering is distributed across a multitude of artifacts — text files — that are specific to the assistants. In the list below some are specific to Claude Code, which is the system I have the most experience with, but many are on other companies' roadmaps or can be emulated in different ways, in particular *sub-agents* and *skills*:

| Artifact        | Definition and associated problems                                                                                                                                                                                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`         | Models are trained, reinforced, distilled, fine-tuned, etc., and among their capabilities as *generalists* is developing software in its different dimensions; **but this whole process is still limited, subject to biases, and carries a cutoff date for its knowledge of languages, libraries, and frameworks**.                                            |
| `AGENTS.md`     | `CLAUDE.md` or `WHATEVER.md` remain the standard for giving assistants specific instructions pointing in what we believe is the best way to develop software; **but it is a single file, it tends to become monolithic, and it is not contextual to different types of tasks.**                                                                                |
| `dir/AGENTS.md` | Offered a first approximation to *contextualizing* the instructions for the assistant based on the directory hierarchy; **the problem is that the file organization does not necessarily match the different tasks, and the "reading" of these files by the assistants, in my experience, is not an exact science.**                                           |
| `/commands`     | These are prompts stored because they are frequently used, which we invoke explicitly through a `/command-name` shortcut; they save us from repeating examples and instructions and can be task-oriented; **however, we are the ones who have to run them, so we take on the burden of contextualizing their use.**                                            |
| `SKILL.md`      | As far as I know these are unique to Claude Code, and they give the assistant access to a structured system of knowledge under the principle of *"progressive disclosure"*, aka different levels of depth; **it sounds nice, it is powerful, and it is very far from trivial to create and maintain**.                                                          |
| `sub-agents`    | Again a feature unique to Claude Code, I believe; it lets *the agent on the main thread* **delegate** *specific tasks* to different sub-agents with their own isolated contexts; **it enables autonomous execution and "protects" the main context, but it adds the complexity of *orchestration* on top of the effort of defining the agents and maintaining them.** |

This gives us a much more granular view of the on-demand context system an assistant relies on, and it reveals a new level of complexity in our goal of *generating* quality software in a way that is repeatable and improvable over time.

Software development involves a diversity of tasks at different moments and in different contexts — architecture, design, QA, etc.; "programming" is an oversimplification of what software development means. And all the artifacts mentioned above respond to different strategies for building an approximation to this complex process of transforming an idea into something that delivers value to users.
## The New Task These Systems Demand

So our job is not only to determine the best combination of instructions and examples ("texts"), distributed across the different artifacts, that feed the **context** so the inference process tends to generate **positive hallucinations** — we also face the challenge of maintaining this sub-system in parallel, keeping it aligned with the code and making it ever more efficient.

The first part is obvious, the second not so much. Here is a simple example: we *significantly* upgrade a dependency in our project, and if we do not update the supporting artifacts for the Assistant, then the generated code — the hallucinations — will suffer a bias toward the version of the library we had in the past, introducing errors ([negative hallucinations](/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/)).

## Let's Revisit the Value of Hallucinations

Let's build a new version of the "formula" for the value of interactions with the assistant that we introduced in [The Mathematics of AI-Assisted Code](/2025/10/28/the-mathematics-of-ai-assisted-code/), where `v( i(ap,e,p) )` represents:

- The value (*v*) that we get from...
- An interaction (*i*)...
- With a programming assistant (*ap*)...
- In our environment (*e*)...
- Through a prompt (*p*)

 And it equals:
 
  - The value (*v*)...
  - Of the state of the environment (*e*)...
  - Plus the value of the sum of the value of all the positive hallucinations  v(∑a₊)...
  - Minus the sum of the value of all the negative hallucinations `v(∑a₋)`
  - Minus the **cost** (*k*) of detecting and rejecting the negative hallucinations `k(∑a₋)`

That is:

```
v(i(ap,e,p)) = v(e) + v(∑a₊) - v(∑a₋) - k(∑a₋)
```

**But** we have already discovered that steering *is not free*, that it means maintaining a new sub-system. If we introduce `k(∑a₊)` as the cost of promoting positive hallucinations (what we call *steering*), our formula transforms into:

```
v(i(ap,e,p)) = v(e) + v(∑a₊) - k(∑a₊) - v(∑a₋) - k(∑a₋)
```

Where ` - k(∑a₊)` represents the cost of the steering that promotes those positive hallucinations, which we have just come to understand carries a non-trivial cost. Again, this is not meant to be a real mathematical formulation but a mechanism that helps us systematize our approach to these tools.

## In Conclusion

There is no **single** solution to this; as in every aspect of life there is always a *tradeoff*, and at one extreme sits the person who completely ignores the artifacts and, prompt by prompt, reviews the result and accepts or rejects the hallucinations with whatever the Assistant offers by default; and at the other extreme sits the person who dedicates themselves to composing the different artifacts to maximize the autonomy and efficiency of the system.

In my case, since after a great many years focused on management I am still very far from being a programmer, I am betting on the second, which is considerably more complex, has a much longer feedback loop, and whose ROI remains to be seen.

In the fifth installment we will focus on understanding what it means to detect and reject negative hallucinations (`k(∑a₋)`), what I call **backpressure**.

---
## Other articles in the series

1. [Hallucination is the Fundamental Feature of LLMs](/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/)
2. [The Mathematics of AI-Assisted Code](/2025/10/28/the-mathematics-of-ai-assisted-code/)
3. [A Systems View of AI-Assisted Programming](/2025/11/03/a-systems-view-of-ai-assisted-programming/)
5. [Backpressure - Rejecting Negative Hallucinations in Programming Assistants](/2025/11/26/backpressure-rejecting-negative-hallucinations/)
