---
title: "Life Finds a Way with OpenRewrite Part 2: Code Evolution"
date: "2025-10-06"
tags: 
  "Career"
---

When I [last left off](/blog/life-finds-a-way-with-openrewrite), I’d done the unthinkable. I resurrected my college senior project from 2003—[the Help Desk Scheduler](https://github.com/bryanfriedman/help-desk-scheduler). It was running again as a Java 8 web app on Tomcat 4 with Struts 1.0 and MySQL. To continue my _Jurassic Park_ metaphor, it was the software equivalent of a creature that shouldn’t exist anymore, but somehow came back to life. 

And also because, [now that I’m at Moderne](/blog/career-refactoring/), I spend my days thinking about automated code transformation with OpenRewrite. (I'm super fun at parties.) So of course I wanted to see if this ancient app could evolve enough to survive in 2025. I don't need to go full _Jurassic World_ reboot yet, but what if we can tweak things just enough to get to _The Lost World_ at least?

## From Batch Files to Build Tools

In college, my “build system” was literally a batch file that ran `javac` and copied the results into Tomcat's `webapp` folder. To modernize anything, I first needed a real foundation. It was time to pick: Gradle or Maven?

I chose Gradle, mainly because I was less familiar with it and wanted to learn, but also because it seems to be a common choice among devs I respect. So, to get things working, I had to:

- Restructure the directories to use `src/main/java` and `src/main/webapp`
- Set up a `build.gradle.kts` file (I went with Kotlin over Groovy because I'm a follower)
- Declare dependencies for the old Servlet API and Struts 1.0 (which required a local JAR since the old version didn't seem to exist on any repository anywhere)
- Specify Java 8 and configure the `war` plugin
- Update my Docker Compose setup to build and deploy a WAR instead
- Add the OpenRewrite Gradle plugin since there would be recipes in my future

For the first time in two decades, HDS had an actual build pipeline. Now OpenRewrite could start working its magic.

## Automation: Nature’s Next Step

With Gradle in place, I was ready to run some recipes. I wanted to take this from barely runnable on Java 8 to something that could at least sort of live in the modern Java world. I started with [`UpgradeToJava21`](https://docs.openrewrite.org/recipes/java/migrate/upgradetojava21), which handled compiler targets and cleaned up a few deprecated APIs.

Next came [`JakartaEE11`](https://docs.openrewrite.org/recipes/java/migrate/jakarta/jakartaee11), which migrated `javax.* `packages to `jakarta.*`. What could possibly go wrong at this point? 

Everything. The changes were clean, but it turns out that Struts 1.0 simply wasn’t built for a Jakarta world, and the build logs made that abundantly clear. Huh. What to do?

## Finding a Path Forward

First, I'd need a newer version of Tomcat. I got that up and running manually and figured I could automate it later. (Which I did...[see below](#jsps%2C-xml%2C-and-other-endangered-species).)

Then, I considered trying an upgrade to Struts 2, but that honestly looked almost as hard as a full-scale rewrite. Same for moving off of Tomcat altogether to a Spring application. I hope to get there eventually, but this first step was just about some incremental change. I wanted to run Java 21 without too much manual effort, if possible. Could I automate everything with OpenRewrite and make it all work?

Rather than give up, I went hunting for a compatible solution and I stumbled upon [Struts1 Reloaded](https://github.com/weblegacy/struts1), a modernized fork that aims "to bring Struts 1 to a current technology." This looked like the best route, at least for now. The latest version (1.5.0-RC2) supports more recent Jakarta namespaces. Sweet! 

Using OpenRewrite [dependency recipes](https://docs.openrewrite.org/recipes/java/dependencies), I [swapped out the old framework for the new libraries](https://github.com/bryanfriedman/help-desk-scheduler/blob/main/recipes/src/main/resources/META-INF/rewrite/handle-dependencies.yml). That meant replacing the old Servlet API with the new ones, retiring the old `com.sun.mail` packages in favor of new ones from Eclipse, and replacing the local Struts JAR with all new references to the Struts1 Reloaded libraries.

Still had a bunch of build errors, but far fewer. Getting closer. 

## A Little Genetic Engineering

The errors were mostly from type and method name changes from moving to Struts 1.5. Thankfully, those trusty old OpenRewrite standards  [`ChangeType`](https://docs.openrewrite.org/recipes/java/changetype) and [`ChangeMethodName`](https://docs.openrewrite.org/recipes/java/changemethodname) came to the rescue for that. `Action perform()` is now `Action execute()`? No problem. Oh, `ActionError` is gone in favor of `ActionMessage`? Easy. But `ActionMessages empty()` needs to be `ActionMessages isEmpty()`? Done. Thanks OpenRewrite!

```
type: specs.openrewrite.org/v1beta/recipe
name: com.bryanfriedman.hds.MigrateStruts
displayName: Struts 1.1 to 1.5 API adjustments
description: ActionError→ActionMessage, perform→execute, messages.empty()→isEmpty
recipeList:
  - org.openrewrite.java.ChangeMethodName:
      methodPattern: org.apache.struts.action.Action perform(..)
      newMethodName: execute
      matchOverrides: true
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: org.apache.struts.action.ActionError
      newFullyQualifiedTypeName: org.apache.struts.action.ActionMessage
  - org.openrewrite.java.ChangeMethodName:
      methodPattern: org.apache.struts.action.ActionMessages empty()
      newMethodName: isEmpty
      matchOverrides: true
```

But now, things got a little more complicated. There were two changes that I needed to make and I couldn't find any existing recipes to do the trick. But hey, I said I wanted to learn how to write some custom recipes. This was my chance. So I wrote two imperative recipes to handle these cases:

1.	**DataSource access.** The old Struts `ActionServlet findDataSource()` helper no longer worked. They needed to be converted to use standard JNDI lookups. 
2. **Method signature.** The new `Action execute()` method in Struts 1.5 added a `throws Exception` declaration, meaning any overriding methods needed to also.

I had a little bit of help from Claude Code to write these recipes. (I'd had [some experience doing that at work](https://www.moderne.ai/blog/writing-openrewrite-recipes-with-ai).) But still, writing these custom solutions gave me such an appreciation for how elegant and extendable OpenRewrite really is when you need that level of precision. And the test framework is so easy to use, you can [see exactly what needed changing](https://github.com/bryanfriedman/help-desk-scheduler/blob/main/recipes/src/test/java/com/bryanfriedman/rewrite/AddThrowsExceptionToActionTest.java#L44) in [both cases](https://github.com/bryanfriedman/help-desk-scheduler/blob/main/recipes/src/test/java/com/bryanfriedman/rewrite/struts/FindDataSourceToJndiTest.java#L55).

One more little [`ChangeType` tweak to broaden some exception handling](https://github.com/bryanfriedman/help-desk-scheduler/blob/main/recipes/src/main/resources/META-INF/rewrite/broaden-exception.yml), and the build finally worked. Too bad the run didn't...

## JSPs, XML, and Other Endangered Species

Now the app was failing to render, so I knew it was time to look to the JSPs. In fact, the Struts 1 Template tags had been retired in favor of Struts Tiles. That meant a whole host of changes to the JSP files would be required.

Although OpenRewrite doesn’t parse JSPs, I was still able to automate into my recipe by using the text-based [`FindAndReplace`](https://docs.openrewrite.org/recipes/text/findandreplace) recipe to [do some regex magic](https://github.com/bryanfriedman/help-desk-scheduler/blob/main/recipes/src/main/resources/META-INF/rewrite/jsp-tiles-migration.yml).

And finally, for the XML config files (`web.xml`, `struts-config.xml`, and Tomcat 11's `server.xml`), I used some [XML recipes](https://docs.openrewrite.org/recipes/xml) to [make the necessary changes](https://github.com/bryanfriedman/help-desk-scheduler/blob/main/recipes/src/main/resources/META-INF/rewrite/update-struts-config.yml), and some `Create*File` recipes to drop in the new ones.

## It's Alive... Again

After all the dust settled, the project now:

- Builds cleanly with Gradle
- Includes a build step within Docker Compose
- Runs on Java 21 / Tomcat 11
- Uses Struts 1.5 (Reloaded)

Is it modern? Not really. But it does compile cleanly, deploy reproducibly, and doesn’t require completely ancient toolchains to run. I'm quite proud that (after manually setting up Gradle) I completely automated all of the changes using only OpenRewrite. It was all refactored through deterministic, repeatable automation. No frog DNA required.

## Evolution, Meet Ambition (and Chaos Theory)

There’s a point in every old-code resurrection where you remember Dr. Ian Malcolm again. Just because you can modernize something, doesn’t mean you should.

That said, though, I’m probably not done experimenting. Some next steps I’m considering:

- Swap MySQL for Postgres. (Probably only config changes?)
- Skip right over Struts 2 and try a Spring Boot migration, just to see how far automation can carry it.
- Move off of JSPs to...something else?

Each attempt is both an exercise and a curiosity test: how much of this can be done through recipes rather than rewriting by hand?

Part 1 was the resurrection; this sequel is the evolution. Give it a few more transformations and I'll have my own cinematic universe.