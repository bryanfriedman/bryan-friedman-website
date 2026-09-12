---
title: Every AI App Is Becoming Every Other AI App
date: 2026-09-13T07:30:00.000-07:00
---
I hadn't used it in a bit, but I randomly opened ChatGPT on my Mac the other day, and for a second, I thought I was in Claude.

The whole UI was different from how I remembered it, and it was styled much more like Claude's interface. They both always had the sidebar and the chat window, but now it seemed like ChatGPT even switched to using a similar font and color palette. I did a double take and realized that it was indeed ChatGPT. 

When I started at Moderne, I was [copy-pasting things in and out of ChatGPT](https://www.bryanfriedman.com/blog/between-two-summits-one-year-in/#the-ai-of-it-all) all day. Then as I used Claude more and more at work, I switched to using it at home too. So I only open ChatGPT once in a while, but while I was gone it apparently redecorated to look like the place I moved to.

## Good Artists Copy

If you're of a certain age, this feels familiar. Remember Mac vs. Windows? I was a little bit too young to follow it while it was going on, but that's okay because it was made into one of my favorite TV movies of all time: *Pirates of Silicon Valley.* The movie dramatizes how Apple built its graphical interface after a famous visit to Xerox PARC. As Noah Wyle's Steve Jobs puts it in the film, "Good artists copy, great artists steal."

But then of course, Microsoft built Windows after Bill Gates visited Apple, and that quote about artists came back to bite Steve Jobs, leading to probably my favorite scene in the film: when Steve accuses Bill Gates of ripping off the Mac and Gates said it was more like they both had a rich neighbor named Xerox, and when he broke in to steal the TV, he found Jobs had already taken it. (Or at least Anthony Michael Hall said it to Noah Wyle, in *Pirates of Silicon Valley*.) (Or at least that's how it goes in *my* reality: the movie.) 

AI assistants are running the same play, just faster. Claude shipped Artifacts; ChatGPT shipped Canvas. ChatGPT shipped Deep Research; Claude shipped Research. Claude Code, meet Codex. Projects, memory, voice, connectors, desktop apps that drive your computer. Pick a feature, and the other one either has it or is about to. When OpenAI rolled out its new desktop "superapp" this summer, [PCWorld's headline](https://www.pcworld.com/article/3188176/the-new-chatgpt-superapp-takes-aim-at-claude-desktop.html) just said the quiet part out loud: it takes aim at Claude Desktop.

(The rich neighbor this time? The transformer paper that kicked all of this off came out of Google. Who is, naturally, also in the fight.)

None of this is a knock. Copying is how software gets better. And for all the sameness on the surface, underneath they still can't agree on much. Take the instruction files you write to tell an agent how to behave in your project. Claude reads `CLAUDE.md`. Copilot reads `.github/copilot-instructions.md`. Gemini wants `GEMINI.md`. Cursor has its own rules folder. Then `AGENTS.md` showed up to be the one file everyone could share, which went about how [xkcd said it would](https://xkcd.com/927/). Now we have skill files, too.

## So Which One Do I Use? Yes.

Here's my actual usage, as best I can reconstruct it:

* **Claude**

   for most things at work, and most things at home.
* **GitHub Copilot**

   at work. A lot.
* **ChatGPT**

   occasionally, mostly out of habit.
* **Codex**

   for coding projects at home, until I moved those to Claude too.
* **Gemini**

   whenever I Google something and the AI Overview answers before I can click a link. I didn't pick Gemini. Gemini picked me.

That's not brand loyalty. That's a junk drawer.

It gets weirder. Copilot lets you choose models from Anthropic, OpenAI, and Google, so my "Microsoft" AI is often Claude or GPT underneath. Or I can let [Copilot's Auto mode](https://docs.github.com/copilot/concepts/auto-model-selection) choose for me, based on what's available and how complicated it thinks my task is.

So how does anyone decide? There are benchmarks and leaderboards, but mostly people try things. Some swear by one model for writing and another for images. Plenty just use whatever their company pays for, or whatever shows up at the top of Google. Whether it's the *best* one barely comes into it. In *Pirates*, Jobs yells at Gates that Apple has better stuff, and Gates doesn't even argue: "You don't get it, Steve. That doesn't matter."

So really there are two markets: consumer AI that you choose, and business AI that gets chosen for you by an admin, a procurement process, and a policy doc. I'm learning both at once, and I've ended up building a wall between them.

\[SCREENSHOT: LinkedIn Severance post]

Looking at that list above, though, it's less *Severance* and more an entire office floor of departments that don't talk to each other.

## The Model Is Only Half of It

At work, I've gone well past chatting into agents that call tools, read files, and make decisions along the way. That's where the differences stop being cosmetic.

Most AI conversations focus on the model, but the model is only one layer. The other is the **harness**: the agent wrapped around the model that decides what context it sees, which tools it has, how it plans, and when it's done. Put the same model in two different harnesses and you get two different coworkers. Update either one and you might get a third.

That's where a lot of the variability lives. Remember all those instruction files? We write them carefully, spelling out which tool to use for which job. Sometimes the agent follows them perfectly. Sometimes it reads them, nods, and does something else. (I have a teenager. I know this feeling.) Then a new version drops, and a workflow that was reliable last month starts taking scenic detours.

None of that makes agents less useful. It just means "we use AI" is closer to "we hired a bunch of contractors who each interpret instructions a little differently." It's also given me a new appreciation for tools that do exactly the same thing every time you run them. (I work at a company that [builds those](https://docs.openrewrite.org/), so grain of salt.)

## Who's Paying for All These Tokens?

The economics are upside down right now, too.

Most of us pay for AI like a gym membership: flat monthly fee, all you can eat, within limits. That means the heaviest users get the best deal, which is not usually how this works. So "within limits" keeps getting redefined. Five-hour windows, weekly caps, pricier plans with more headroom. Underneath it all is a slow slide toward paying per token. GitHub moved Copilot to [usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) in June with a refreshingly blunt explanation: a quick chat question and a multi-hour autonomous coding session could cost the same amount.

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
