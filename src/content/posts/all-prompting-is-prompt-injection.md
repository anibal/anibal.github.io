---
title: "All Prompting is Prompt Injection"
description: "There is no such thing as “Prompt Injection” as an attack mechanism, nor as a vulnerability."
date: 2025-11-13
lang: en
translationOf: todo-prompting-es-prompt-injection
tags:
  - prompting
  - prompt-injection
  - llms
  - tokens
  - security
  - attack-vector
---
> *Translated from the [Spanish original](/2025/11/13/todo-prompting-es-prompt-injection/) with AI assistance. The original was written entirely by hand, no AI involved.*

There is no such thing as "Prompt Injection" as an attack mechanism, nor as a vulnerability. It does not exist because every prompt is "injected" into the "flat" context of an LLM, a token space where *by design* every token has the same "privileges" as any other token, and tokens do not distinguish between instructions and data.

Your instructions to the LLM **are data**, the data your users enter and that you pass to the LLM **are instructions**.

This post is a condensed version of the one by [Garrett Galloway](https://www.linkedin.com/posts/garrettgalloway_repeat-after-me-i-do-not-trust-the-ai-share-7394415231411593216-ZbKk?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAABYcI8BB_U41_Zfnth-a-K6afvWfwlghiM&utm_campaign=share_via), which I loved when I read it — and if your first instinct is to argue back with OWASP LLM01:2025, then I failed to get the point across.
