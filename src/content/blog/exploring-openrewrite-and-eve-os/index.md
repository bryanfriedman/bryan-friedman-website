---
title: "Automated Refactoring Meets Edge Deployment: An Exploration of OpenRewrite and EVE-OS"
date: "2025-04-19"
tags:
  - "Cloud"
  - "Open Source"
  - "Spring"
---

I know from my experience working for and with enterprise companies that keeping dozens or hundreds (or thousands!) of apps up to date is complicated. Much of my career in tech has been spent in and around the cloud-based platform and modern application development spaces in an attempt to help solve this problem for customers. But I also spent time as a product manager working directly with developers, so I’ve seen how even with automated CI/CD pipelines, modern app architectures, and robust app platforms, it ultimately comes down to effectively managing a code base and often tackling mountains of tech debt along the way. I remember having to spend precious sprint cycles on cleaning up and refactoring whole swaths of code instead of focusing on delivering features for end users.

I’ve also seen over the past many years how even the most successful moves to cloud can still lead to a lot of challenges when it comes to data migration. Plus, with the explosion of Internet-of-Things (IoT) devices, it’s getting more and more difficult to ship data off to the cloud for processing. It’s been fun to watch the trend towards edge computing to combat these obstacles, but of course, that brings its own set of challenges from a scaled management perspective. I remember working on this almost ten years ago with automated bare metal hardware deployments, but now there is even more to consider!

These are hardly solved problems, but thankfully, a few of my former colleagues have ended up at companies where they are addressing them with some very innovative solutions. In my career, I’ve been extremely lucky to meet and work with some truly smart people, and one of the perks of knowing so many sharp folks in tech is that just by following their career paths, I can keep up to date with a lot of industry trends and get exposed to technologies that are new to me. This is how I became aware of two open-source projects that I’ve recently been exploring...

## OpenRewrite

[OpenRewrite](https://github.com/openrewrite/) is an open-source tool and framework for automated code refactoring that’s designed to help developers modernize, standardize, and secure their codebases. With all the tech debt out there among enterprise teams managing large Java projects in particular, OpenRewrite was born to work with Java, with seamless integration into build tools like Gradle and Maven. But it’s now being expanded to support other languages as well.

Using built-in, community, or custom recipes, OpenRewrite makes it easy to apply any changes across an entire codebase. This includes migrating or upgrading frameworks, applying security fixes, and imposing standards of style and consistency. The OpenRewrite project is maintained by [Moderne](https://www.moderne.ai), who also offers a commercial platform version that enables automated refactoring more efficiently and at scale.

## EVE (Edge Virtualization Engine)

[EVE](https://github.com/lf-edge/eve/) is a secure, open-source, immutable, lightweight, Linux-based operating system designed for edge deployments. It’s purpose-built to run on distributed edge compute and to provide a consistent system that works with a centralized controller to provide orchestration services and a standard API to help manage a fleet of nodes. Think about having to manage hundreds (or more!) of small-form-factor devices like Raspberry Pis, or NUCs that are running in all sorts of places across different sites.

With EVE-OS, devices can be pre-configured and shipped to remote locations to limit the need for on-site IT support. And with its Zero Trust security model, it protects against any bad actors who may easily gain access to these edge nodes that often live outside of the protection of a formal data center. Because it is hardware agnostic and supports VMs, containers, Kubernetes clusters, and virtual network functions, it also has the ability to run applications in a variety of formats. EVE-OS is developed by [ZEDEDA](https://zededa.com) specifically for edge computing environments and aims to solve some of these unique challenges around running services and applications on the edge. They also offer a commercial solution for more scalable orchestration, monitoring, and security.

## Let’s Build Something!

There isn’t _exactly_ an obvious intersection of interest here, but bumping into these projects independently, right around the same time, got me thinking about how I _could_ experiment with both of them and build something that balances practical OpenRewrite usage with something deployable via EVE-OS. This is what I came up with:

1. Write a very simple but somehow outdated Spring Boot REST app
2. Use OpenRewrite to refactor and “modernize” it
3. Containerize the resulting modern app
4. Deploy it to an EVE-OS “edge node” [locally]

Of course, this only scratches the surface of the potential that these technologies have, but it turned out to be a pretty fun exercise for getting started by just dipping my toe a bit into each of these areas. In case you’re interested in getting your feet wet too, I’ve summarized the steps I took below, including a link to the code I used.

### Refactoring a Simple Legacy Spring Application

As a developer, my Java knowledge is admittedly relatively surface level, but I do know enough to write a working REST controller. Here’s my simple class that just calls a basic endpoint and spits back out its JSON result:

```java
package com.example;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;

@RestController
public class HelloController {

    @RequestMapping(value = "/", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
    public String hello() {
        System.out.println("Calling external service...");
        RestTemplate client = new RestTemplate();
        String response = client.getForObject("https://httpbin.org/get", String.class);
        return response;
    }
}
```

My Spring skills are pretty outdated, so I would say a refactor is most certainly in order. Accordingly, I figured I’d use OpenRewrite to accomplish three primary things when updating this code:

- Use the newer dedicated `@GetMapping` as an alternative for `@RequestMapping`
- Use the SLF4J Logger instead of the elementary `System.out.println`
- Upgrade from Spring Boot 2.x to 3.x
  - I didn’t show my `pom.xml` file here, but I used version 2.3 and will upgrade to 3.2

There are definitely other things I could choose to update. For example, I didn’t opt to write test cases in a test class, but if I had I could also have migrated from JUnit 4 to 5. I also saw some articles that suggested updating `RestTemplate` to `RestClient` or even the asynchronous `WebClient`. I didn’t find any recipes for this, though I could maybe tackle [writing a custom one](https://docs.openrewrite.org/authoring-recipes), but I left that out of scope for now. I’m satisfied with this limited example.

Since I first learned to build Spring apps with Maven, that’s what I opted to use here (but there is support for Gradle as well). The basic Maven plugin command to run for OpenRewrite is `mvn rewrite:run`, but that requires defining configuration and parameters in `pom.xml`. I wanted to keep everything dynamic and on the command line, so I passed everything in using the `-D` flag to define the properties:

```sh
$ mvn -U org.openrewrite.maven:rewrite-maven-plugin:run \
      -Drewrite.exportDatatables=true \
      -Drewrite.recipeArtifactCoordinates=org.openrewrite.recipe:rewrite-spring:RELEASE \
      -Drewrite.activeRecipes=\
        org.openrewrite.java.spring.boot3.UpgradeSpringBoot_3_2,\
        org.openrewrite.java.spring.NoRequestMappingAnnotation,\
        com.example.ReplaceSystemOutWithLogger
```

You can see the three active recipes that I passed in to perform the tasks I outlined above. The first two are recipes straight from the [OpenRewrite catalog](https://docs.openrewrite.org/recipes). The last one is too, sort of, but in order to pass it the necessary configuration options, I created a `rewrite.yml` file in the root of the project:

```yaml
type: specs.openrewrite.org/v1beta/recipe
name: com.example.ReplaceSystemOutWithLogger
recipeList:
  - org.openrewrite.java.logging.SystemOutToLogging:
      addLogger: "True"
      loggingFramework: SLF4J
      level: info
```

This specifies what logging framework and log level to use. The active recipe references whatever name is used here, hence `com.example.ReplaceSystemOutWithLogger`.

And that’s it. Running the `mvn` command above does the magic, fixing the `pom.xml` file to reference Spring Boot 3.2 and updating the controller code as follows:

```java
package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

@RestController
public class HelloController {
    private static final Logger logger = LoggerFactory.getLogger(HelloController.class);

    @GetMapping(value = "/", produces=MediaType.APPLICATION_JSON_VALUE)
    public String hello() {
        logger.info("Calling external service...");
        RestTemplate client = new RestTemplate();
        String response = client.getForObject("https://httpbin.org/get", String.class);
        return response;
    }
}
```

Notice `@GetMapping` has replaced `@RequestMapping` and the `System.out.println` has been moved to use a logger instead. The code still builds and runs fine, but now it’s up-to-date!

**Here’s the repository with the full set of code: [https://github.com/bryanfriedman/legacy-spring-app](https://github.com/bryanfriedman/legacy-spring-app).** It has the original code in `main` and the updated code on the `refactor` branch so you can use `git diff main..refactor` or your favorite diff tool to compare.

### Deploying the Refactored App to an EVE “Edge Node”

Now that we have a running, refactored app, let’s deploy it to “the edge.” But first, we need an EVE node. The easiest way to setup a virtual EVE node locally, it turns out, is to use a tool called [Eden](https://github.com/lf-edge/eden) (clever) as a management harness for setting up and testing EVE. Eden will also help us create an open-source reference implementation of an [LF-Edge API-compliant controller](https://github.com/lf-edge/eve-api/blob/main/README.md) called [Adam](https://github.com/lf-edge/adam) (also clever) which we will need to control the EVE node via its API. Eden is neat because it lets you deploy/delete/manage nodes running EVE, the Adam controller, and all the required virtual network orchestration between nodes. It also lets you execute tasks on the nodes via the controller.

To accomplish this setup, I mostly followed an [EVE Tutorial that I found](https://github.com/shantanoo-desai/EVE-OS-tutorials/blob/master/00-Eve-Eden-Local-QEMU.md) which was extremely helpful. It outlines the process of building and running Eden and establishing the EVE node and Adam controller. However, this tutorial was written for Linux, so I ran into a few snags that didn't work in my MacOS environment. As such, I ended up forking `eden` and tweaking a few minor things just to get it to work on my machine. This mostly involved getting the right `qemu` commands to make the environment run. You can see the specifics here in the [forked repo](https://github.com/bryanfriedman/eden.git). And of course, while the tutorial describes how to run a default `nginx` deployment to test things out, I obviously deployed this Spring app instead. I also discovered that I needed to specifically configure the port forwarding for the deployed pod in question in order to reach the app for testing.

Here are the slightly modified steps that I took:

**Prerequisites**

I installed all the following prerequisites if they weren't already installed, using `brew` where possible, or otherwise downloading and installing: `make`, `qemu`, `go`, `docker`, `jq`, `git`.

**Prepare and Onboard EVE**

1. Start required `qemu` containers:

```sh
$ docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
```

2. Build Eden ( used my fork as indicated above):

```sh
$ git clone https://github.com/bryanfriedman/eden.git && cd eden/
$ make clean
$ make build-tests
```

3. Setup Eden configuration and prepare port 8080 for our app:

```sh
$ ./eden config add default
$ ./eden config set default --key eve.hostfwd --value '{"8080":"8080"}'
$ ./eden setup
```

4. Activate Eden:

```sh
$ tcsh
$ source ~/.eden/activate.cs
```

5. Check status, then onboard EVE:

```sh
$ ./eden status
$ ./eden eve onboard
$ ./eden status
```

**Deploy the app to EVE**

1. Deploy the Spring app from Docker Hub:

```sh
$ ./eden pod deploy --name=eve_spring docker://bryanfriedman/legacy-spring-app -p 8080:80
```

2. Wait for the pod to come up:

```sh
$ watch ./eden pod ps
```

3. Make sure it works:

```sh
$ curl http://localhost:8080
```

## Conclusion

After all this work, I’m not exactly an expert in automated refactoring or edge computing all of the sudden, but I do have a much better understanding of the technologies behind these concepts. While they might not seem particularly related, I can definitely see how a company might be interested in both of these paradigms as they look to modernize their apps at scale and potentially look at migrating them to run at the edge. With just these rudimentary examples, you can start to see the potential of the power they can provide at scale.
