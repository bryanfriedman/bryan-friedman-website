---
title: Every AI App Is Becoming Every Other AI App
date: 2026-09-13T07:30:00.000-07:00
---
I hadn't used it in a bit, but I randomly opened ChatGPT on my Mac the other day, and for a second, I thought I was in Claude.

The whole UI was different from how I remembered it, and it was styled much more like Claude's interface. They both always had the sidebar and the chat window, but now it seemed like ChatGPT even switched to using a similar font and color palette. I did a double take and realized that it was indeed ChatGPT. 

When I started at Moderne, I was [copy-pasting things in and out of ChatGPT](https://www.bryanfriedman.com/blog/between-two-summits-one-year-in/#the-ai-of-it-all) all day. Then as I used Claude more and more at work, I switched to using it at home too. So I only open ChatGPT once in a while, but while I was gone it apparently redecorated to look like the place I moved to.

## Good Artists Copy

If you're of a certain age, this feels familiar. Remember Mac vs. Windows? I was a little bit too young to follow it while it was going on, but that's okay because it was made into one of my favorite TV movies of all time: *Pirates of Silicon Valley.* The movie dramatizes how Apple built its graphical interface after a famous visit to Xerox PARC. As Noah Wyle's Steve Jobs puts it in the film, "Good artists copy, great artists steal."

But then of course, Microsoft built Windows after Bill Gates visited Apple, and that quote about artists came back to bite Steve Jobs. This leads to probably my favorite scene in the film: when Steve accuses Bill Gates of ripping off the Mac, and Bill Gates said it was more like they both had a rich neighbor named Xerox, and Steve says that Apple has better stuff, and Bill Gates says "You don't get it Steve. That doesn't *matter!*" (I don't know if it quite went down [exactly like this in real life](https://www.folklore.org/A_Rich_Neighbor_Named_Xerox.html), but the Anthony Michael Hall and Noah Wyle version is *my* reality anyway.)

![](images/pirates.jpg)

Feels like OpenAI and Anthropic are following a similar pattern, "stealing" from each other back and forth. Claude shipped [Artifacts](https://www.anthropic.com/news/claude-3-5-sonnet), so ChatGPT shipped [Canvas](https://openai.com/index/introducing-canvas/). ChatGPT shipped [Deep Research](https://openai.com/index/introducing-deep-research/), then Claude shipped [Research](https://www.anthropic.com/news/research). [Claude Code](https://www.anthropic.com/news/claude-3-7-sonnet) came out, and then [Codex](https://openai.com/index/introducing-codex/). Concepts within the apps like projects, memory, voice, connectors, computer control...take your pick of features, and you're bound to see the other one either has it or is about to. When OpenAI rolled out its new desktop "superapp" this summer, [PCWorld's headline](https://www.pcworld.com/article/3188176/the-new-chatgpt-superapp-takes-aim-at-claude-desktop.html) put it bluntly: "The new ChatGPT superapp takes aim at Claude Desktop." (ChatGPT even started naming their models using a theme, like Anthropic does, instead of the confusing names they had before.)

And of course there's more than just two players in the market. Microsoft has Copilot, Google has Gemini, and in the software coding space it gets even more crowded with the coding version of each of those plus Cursor, Windsurf, Amp, the list goes on. 

Of course I understand this is how business works. Apple's rivalry didn't stop with Microsoft, as years later it had Samsung in its sights from the iPhone vs Android fight. The cloud providers all do it too, with each of them having equivalent versions of products they've copied over the years. It's not even limited to software or technology, either. Long before any of this, there was Nike vs. Adidas, Ford and Ferrari, and the ever present question: Coke or Pepsi? So it's nothing new, but it's noteworthy because of the moment we're in. (More on that later.)

But for all the sameness on the surface, like any tech, underneath the hood, no one can agree on much. For instance, there are so many places to put instruction files to tell an agent how to behave in your project: Claude Code reads `CLAUDE.md`, but GitHub Copilot reads `.github/copilot-instructions.md`,  and Google even has `GEMINI.md`. Cursor has its own rules folder too. So of course the problem got solved in the [most xkcd way](https://xkcd.com/927/) possible: the `AGENTS.md` standard.

## So Which One Should You Use? (Yes.)

This is not a comparison piece, so I'm not going to get into details, but the answer to a question like that is usually: "it depends." For me, the landscape looks something like this:

* **Claude.** At this point it's my default. I use it almost exclusively at work to write, code, and answer dumb questions. At home, it's helped me build complex spreadsheets, plan house projects, design web sites, and...answer dumb questions.
* **ChatGPT/Codex.** The original. It got me started both at home and at work. Even when I started using Claude at work, I stuck with ChatGPT at home, thinking it would be a good split. I even used Codex for coding projects at home. Now I've migrated to using Claude most of the time, even at home. I've kept ChatGPT around mostly for historical purposes. It was sort my pseudo-doctor/therapist well before Claude came around, so I still use it for that sometimes, since it "knows me."
* **GitHub Copilot.** This is the other go-to option at work for me, and I like using it for coding work sometimes, if I've maxed out my Claude usage, or if it's annoying me. It can use both OpenAI and Anthropic models, or switch between them, and it will sometimes even decide for you, depending on the task. It's also got great integration with tools I already use. 
* **Gemini.** I experimented with [Antigravity](https://antigravity.google) for a bit, and occasionally reach for Gemini within Google Docs or something. But I really haven't used Gemini much at work. I try to "search" (or ask those dumb questions) with AI, but I still end up Googling some things (old habits die hard), so I'll often end up using the AI Overview feature of Google and finding myself almost unwittingly inside of Gemini.

So how does anyone decide? There are benchmarks and leaderboards, but mostly people try things. Some swear by one model for writing and another for images. Plenty just use whatever their company pays for, or whatever shows up at the top of Google. Whether it's the *best* one barely comes into it. In *Pirates*, Jobs yells at Gates that Apple has better stuff, and Gates doesn't even argue: "You don't get it, Steve. That doesn't matter."

So really there are two markets: consumer AI that you choose, and business AI that gets chosen for you by an admin, a procurement process, and a policy doc. I'm learning both at once, and I've ended up building a wall between them.

\[SCREENSHOT: LinkedIn Severance post]

Looking at that list above, though, it's less *Severance* and more an entire office floor of departments that don't talk to each other.

## The Model Is Only Half of It

At work, I've gone well past chatting into agents that call tools, read files, and make decisions along the way. That's where the differences stop being cosmetic.

Most AI conversations focus on the model, but the model is only one layer. The other is the **harness**: the agent wrapped around the model that decides what context it sees, which tools it has, how it plans, and when it's done. Put the same model in two different harnesses and you get two different coworkers. Update either one and you might get a third.

That's where a lot of the variability lives. Remember all those instruction files? We write them carefully, spelling out which tool to use for which job. Sometimes the agent follows them perfectly. Sometimes it reads them, nods, and does something else. (I have a teenager. I know this feeling.) Then a new version drops, and a workflow that was reliable last month starts taking scenic detours.

None of that makes agents less useful. It just means "we use AI" is closer to "we hired a bunch of contractors who each interpret instructions a little differently." It's also given me a new appreciation for tools that do exactly the same thing every time you run them. (I work at a company that builds those, so grain of salt.)

## Who's Paying for All These Tokens?

The economics are upside down right now, too.

Most of us pay for AI like a gym membership: flat monthly fee, all you can eat, within limits. That means the heaviest users get the best deal, which is not usually how this works. So "within limits" keeps getting redefined. Five-hour windows, weekly caps, pricier plans with more headroom. Underneath it all is a slow slide toward paying per token. GitHub moved Copilot to [usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing) in June with a refreshingly blunt explanation: a quick chat question and a multi-hour autonomous coding session could cost the same amount.

Meanwhile, the price of a token keeps falling. But agents chew through tokens in a way a chat window never did, so the bill doesn't necessarily shrink. Cheaper gas, bigger truck.

Does it settle into something sane, or does it just keep getting cheaper while we keep using more? (Probably both?)

## Paper First

At back-to-school night this year, one of my daughter's high school teachers told us that in-class writing in his room happens on paper. No laptops.

In 2026, that sounds almost radical. But he isn't anti-AI. He thinks there's a place for these tools and that his students will use them. He just doesn't think kids at this age are ready to use them responsibly yet, and more importantly, they need to build the underlying skill first. You can't tell whether AI wrote something good if you've never learned what good looks like.

That applies to the rest of us too.

It's the same conversation engineering teams are having about junior and senior developers. A senior engineer can look at what an agent produced and spot the problem fast, because they've made that mistake before. A junior engineer might not see it at all. I notice this in my own work. When an agent's draft of a doc is off, I can tell right away. When it writes Java, I'm a lot less sure. (My hands-on coding is what I'd generously call surface level.)

## Haven't We Been Here Before?

I get why this feels existential for a lot of people. Bill Gates (the real one, not Anthony Michael Hall) just published [a long essay](https://www.gatesnotes.com/work/make-ai-work-for-everyone/reader/a-turbulent-ai-era-and-critical-choices-to-make) saying he's "very concerned": about entry-level jobs disappearing, software engineering included, about what AI does to kids' development, and about how few people outside the industry are paying attention. The guy who told Steve it didn't matter thinks *this* matters a lot.

He also argues it's different from past technology shifts, because it substitutes for human thinking itself and it's happening over a decade instead of generations. So he'd probably say my go-to comparison undersells it. Maybe. But he also says being pessimistic isn't helpful, and either way it's not optional.

It's not a perfect analogy, but it reminds me of the internet showing up. Email changed how we worked, the web changed what a business was, then mobile changed it all again. We even fumbled the pricing the same way: dial-up billed by the hour until AOL went unlimited, and unlimited data plans that carriers took away and then brought back. Nobody got to opt out. Everyone had to figure it out and catch up, and the people who did best learned the new thing without forgetting the old one.

And remember Mac vs. Windows? That fight didn't really end with a winner. It mostly ended because the browser became the thing that mattered. Now people use a Mac at home, Windows at work, and a phone from whoever, and nobody asks whether you're a Mac person or a PC person anymore. (Except Mac people. We still bring it up.)

I suspect the AI version goes the same way. The apps will keep looking more alike, the features will keep leapfrogging, and which logo you click will matter less than whether you recognize good output when you see it.

So which one should you use? Probably all of them, for a while.

Just learn to write on paper first.
