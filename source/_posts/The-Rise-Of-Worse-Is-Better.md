---
title: The Rise Of Worse Is Better
date: 2020-06-07 23:58:15
tags: OS
categories: reading
---

Richard P. Gabriel 的 "The Rise Of Worse Is Better" 是计算机科学界中的经典文章。

它是 "Lisp: Good News, Bad News, How to Win Big." 短文中的节录。

文章比较了软件设计中两种设计哲学：MIT/Stanford style 和 New Jersey style。
<!-- more -->
作者认为 MIT/Stanford style 的本质可以表达为 "the right thing"。

要达到 MIT/Stanford style 软件设计风格，设计者必须遵循4条准则：

1. 简单性 -- 软件实现和软件接口两者的设计都必须要简单，同时简单的接口比简单的实现更重要。
2. 正确性 -- 设计在可观察的各个方面都必须正确。设计不允许不正确。
3. 一致性 -- 设计必须具有一致性。为了避免不一致性，可以在设计的简单性和完整性上稍作取舍。一致性和正确性同样重要。
4. 完整性 -- 设计必须覆盖实际会遇到的各个重要场景。所有合理的可预料的情况都必须覆盖。不应该为了简单性而过多的放弃完整性。

> 1. **Simplicity** -- the design must be simple, both in implementation and interface. It is more important for the interface to be simple than the implementation.
> 2. **Correctness** -- the design must be correct in all observable aspects. Incorrectness is simply not allowed.
> 3. **Consistency** -- the design must not be inconsistent. A design is allowed to be slightly less simple and less complete to avoid inconsistency. Consistency is as important as correctness.
> 4. **Completeness** -- the design must cover as many important situations as is practical. All reasonably expected cases must be covered. Simplicity is not allowed to overly reduce completeness.

而 New Jersey style 的设计准则只有些许不同：

1. 简单性 -- 实现和接口的设计都必须简单，简单的实现比简单的接口更重要，简单性是最重要的准则。
2. 正确性 -- 简单性比正确行稍微更重要一些。
3. 一致性 -- 设计不能太过不一致。一些情况下，可以牺牲一致性来保证简单性。但更好的做法是丢弃一些应对不常用场景的设计部分。
4. 完整性 -- 完整性可以为了满足其他准则而牺牲。事实上，当危及到简单性，必须对完整性作出牺牲。当简单性得以保证，可以牺牲一致性来获得完整性。接口的一致性是比较无用处的。

> 1. **Simplicity** -- the design must be simple, both in implementation and interface. It is more important for the implementation to be simple than the interface. Simplicity is the most important consideration in a design.
> 2. **Correctness** -- the design must be correct in all observable aspects. It is slightly better to be simple than correct.
> 3. **Consistency** -- the design must not be overly inconsistent. Consistency can be sacrificed for simplicity in some cases, but it is better to drop those parts of the design that deal with less common circumstances than to introduce either implementational complexity or inconsistency.
> 4. **Completeness** -- the design must cover as many important situations as is practical. All reasonably expected cases should be covered. Completeness can be sacrificed in favor of any other quality. In fact, completeness must be sacrificed whenever implementation simplicity is jeopardized. Consistency can be sacrificed to achieve completeness if simplicity is retained; especially worthless is consistency of interface.

两种设计哲学主要区别于对 4 条准则的排序。MIT/Stanford style 认为设计的正确性和一致性同样是最重要的原则，它的价值排序是 (Correctness = Consistency > Simplicity > Completeness)。而 New Jersey Style 则认为设计的简单性是首要考虑的准则，它的价值排序是 (Simplicity > Correctness > Consistensy > Completeness)。两种设计哲学都同时认为完整性的价值的最低的。

作者认为软件设计不一定要像 MIT/Stanford style 一样过分追求正确性和完整性，更好的做法是先完成一半的工作，然后让社区开发者共同开发，合力追求正确性和完整性。

> The lesson to be learned from this is that it is often undesirable to go for the right thing first. It is better to get half of the right thing available so that it spreads like a virus. Once people are hooked on it, take the time to improve it to 90% of the right thing.

## Link

[The Rise Of Worse Is Better](http://dreamsongs.com/RiseOfWorseIsBetter.html)