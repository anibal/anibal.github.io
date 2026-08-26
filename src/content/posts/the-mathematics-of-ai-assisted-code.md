---
title: "The Mathematics of AI-Assisted Code"
description: "From our first article in the series, Hallucination is the Fundamental Feature of LLMs, we have that LLM hallucinations can be positive or negative depending on whether they add or subtract value from our work, from “our code”."
date: 2025-10-28
lang: en
translationOf: las-matematicas-del-codigo-asistido-por-ia
tags:
  - llm
  - programming-assistants
  - mathematics
  - negative-hallucinations
  - positive-hallucinations
  - context
  - prompting
  - value
---
> *Translated from the [Spanish original](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia/) with AI assistance. The original was written entirely by hand, no AI involved.*

From our first article in the series, [Hallucination is the Fundamental Feature of LLMs](/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/), we have that LLM hallucinations can be positive or negative depending on whether they add or subtract *value* from our work, from *"our code"*.

Now let's take a step back to approach a bit more formally what it means to use an LLM — in particular a **Programming Assistant** like Claude Code, Cursor, Gemini CLI, Windsurf, etc. — in our work, with:

```
f(model,context,prompt) = context'
```

Where:

- **f**: Represents an interaction with the Programming Assistant
- **model** (m): In *simplified* form, this is a model like Claude Sonnet 4.5, Gemini Pro 2.5, ChatGPT 5, etc., but it is usually a more complex *system* like Warp, GitHub Copilot, or Claude Code.
- **context** (c): Includes the existing code, the documentation, *possibly the available tools* — **not** the *context window*, which is irrelevant to this discussion.
- **prompt** (p): The instruction we give the Assistant, which usually implies modifying the code in some way, but can also be making a commit, installing a package, etc. It excludes asking a question that is only answered in the Assistant's UI.
- **context'** (c'): The new context, modified as a result of using the Assistant: the modified code, a commit, updated documentation, a deployment, etc.

With this base in place, and again in simplified form, we can say that a sequence of interactions is represented like this:

```
f(m,c,p₁) = c'
f(m,c',p₂) = c''
f(m,c'',p₃) = c'''
...
```

Where the context keeps mutating as we feed the Assistant different prompts for the model, and it "cranks out code" and/or executes other actions. This sequence could represent what we know as a session.

On the other hand, we can say that *context'* equals the initial *context* plus the hallucinations the Assistant applied to it, positive (*a₊*) or negative (*a₋*). Whether these hallucinations add or remove LOCs is irrelevant at this point. So:

```
c' = c + ∑ a₊ + ∑ a₋
```

Therefore, with a simple substitution:

```
f(m,c,p) = c + ∑ a₊ + ∑ a₋
```

And now we can start connecting with the subject of *value* (*v*). Since positive hallucinations add value while negative ones subtract it, let's make this explicit with the "*-*" symbol:

```
v(f(m,c,p)) = v(c) + v(∑ a₊) - v(∑ a₋)
```

Obviously, if the negative hallucinations outnumber the positive ones, then we invested a ton of our time, token generation, GPU usage, and electricity for little or nothing.

**BUT**, the "formula" above is incomplete, because determining whether a hallucination is positive or negative has a non-trivial cost. What's more, discarding, rejecting, correcting the negative hallucinations adds to the cost of detecting them, hence:

```
v(f(m,c,p)) = v(c) + v(∑ a₊) - v(∑ a₋) - k(∑ a₋)
```

Where *k(∑ a₋)* is the cost of detecting and removing the negative hallucinations, because we only want to keep the positive ones. Because in the end we want to get as close as possible to:

```
f(m,c,p) = c + ∑ a₊
```

Which, given that [Hallucination is the Fundamental Feature of LLMs](/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/), is non-trivial and will always carry an associated cost.

Obviously I don't pretend this is a real mathematical model, but rather an artifact that helps us understand the *system* we are operating in this quest for a systematic and methodical approach, one that *tends* to produce quality code in a repeatable way.

More on this "system" and how we can operate it in the next post of the series, [A Systems View of AI-Assisted Programming](/2025/11/03/a-systems-view-of-ai-assisted-programming/).

---
## Other articles in the series

1. [Hallucination is the Fundamental Feature of LLMs](/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/)
3. [A Systems View of AI-Assisted Programming](/2025/11/03/a-systems-view-of-ai-assisted-programming/)
4. [Steering - Favoring Positive Hallucinations in Programming Assistants](/2025/11/06/steering-favoring-positive-hallucinations/)
5. [Backpressure - Rejecting Negative Hallucinations in Programming Assistants](/2025/11/26/backpressure-rejecting-negative-hallucinations/)
