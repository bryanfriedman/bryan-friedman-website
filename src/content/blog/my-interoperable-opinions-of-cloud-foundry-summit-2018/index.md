---
title: "My Interoperable Opinions of Cloud Foundry Summit 2018"
date: "2018-04-24"
tags: 
  - "Cloud"
  - "Cloud Foundry"
  - "Pivotal"
---

Last week I visited Boston for the first time and attended my very first Cloud Foundry Summit. I also took the opportunity while I was there to make my first visit to Fenway Park. It was a fabulous week of firsts for me.

As with any conference, one measure of excellence is the amount of quality examples of customer success stories. It's also nice to see compelling demos of new and interesting technology. CF Summit 2018 did not disappoint in either of these departments. In fact, my colleagues have already written quite eloquently on [these](http://baskettecase.blogspot.com/2018/04/cf-summit-2018.html) [topics](https://medium.com/@brianmmcclain/cf-summit-boston-day-2-wrap-up-a470aaf335e2). So I'll spend some time on something else that was a key theme of the conference.

## Interoperability FTW

Interoperability was an explicit thread through many of the keynotes and breakout sessions. [Cloud Foundry Foundation CTO Chip Childers even hinted at this trend back in January.](https://thenewstack.io/2018-year-kubernetes-interoperability/)

To be sure, Cloud Foundry tech has always championed interoperability. It's multi-cloud. It's polyglot. It's OCI-compliant. The [Open Service Broker API](https://www.openservicebrokerapi.org/) was even born of Cloud Foundry. (It's now [been adopted by the Kubernetes community](https://kubernetes.io/docs/concepts/service-catalog/).) It was fantastic to see these concepts expand even more this year.

There was the [introduction of Alibaba Cloud as a BOSH CPI](https://www.cloudfoundry.org/blog/cloud-foundry-now-available-asias-leading-cloud-provider-alibaba-cloud/). Some awesome advances in .NET support appeared (plus a [whole conference track](https://cfna18.sched.com/overview/type/Cloud+Native+.NET) to go along with it). Kubernetes was also mentioned quite a bit as the [Cloud Foundry Container Runtime](https://www.cloudfoundry.org/container-runtime/) continues to take hold.

{% tweet "https://twitter.com/ronak/status/986719499981291521" %}

Indeed, it's nice to see this interoperability movement flourish. Still, I couldn't help but think of how it relates to another critical part of Cloud Foundry's success.

## Opinions Are Like... Everybody's Got One

Yes, it embraces **interoperability**. Yet Cloud Foundry has always been billed as an **opinionated** platform. So it's important to point out that "interoperable" and "opinionated" are not mutually exclusive. But they are equally important characteristics for an effective platform. Interoperability without opinions runs the risk of becoming complicated or difficult to use. But of course, opinions without interoperability may prove irrelevant. After all, a good platform has to be able to handle many types of workloads. It should integrate with the services and technologies that you need to use.

![](images/the-dude.jpg)

So both are important. But in my previous life working in IT, I'll admit I wasn't in the opinionated camp. I didn't even understand it as a concept. I generally went for selecting software with the ultimate flexibility. What I didn't realize was how often this led to analysis paralysis and decreased productivity.

I remember one of the last projects I worked on. We were selecting a software product for financial planning and reporting. Ideally, we'd have found a solution that did 80% of what was required. We should have reevaluated the actual importance of the other 20% we thought we needed. Instead, we focused on that 20% until we settled on something that could handle it. Then implementation details, changing requirements, and complex technology got in the way anyway. As I recently heard one industry analyst say, "Choice is not a differentiator."

Unfortunately, I had not yet learned about the value that opinionated software can bring. It's about a simplified user experience and increased productivity. I like how [Duncan Winn](https://twitter.com/duncwinn) describes it in his book, _[Cloud Foundry: The Definitive Guide](http://shop.oreilly.com/product/0636920042501.do)_:"

> When you look at successful software, the greatest and most widely adopted technologies are incredibly opinionated. What this means is that they are built on, and adhere to, a set of well-defined principles employing best practices. They are proven to work in a practical way and reflect how things can and should be done when not constrained by the baggage of technical debt. Opinions produce contracts to ensure applications are constrained to do the right thing.
> 
> Platforms are opinionated because they make specific assumptions and optimizations to remove complexity and pain from the user. Opinionated platforms are designed to be consistent across environments, with every feature working as designed out of the box. For example, the Cloud Foundry platform provides the same user experience when deployed over different IaaS layers and the same developer experience regardless of the application language. Opinionated platforms such as Cloud Foundry can still be configurable and extended, but not to the extent that the nature of the platform changes...

That last part is key: _"...can still be configurable and extended..."_ Remember, interoperability still matters. It just can't happen at the expense of complexity. That's why something like the Open Service Broker API is so elegant and powerful.

There's an interesting nugget there at the beginning of Duncan's description too: _"...they are built on...well-defined principles..."_ It's not only how the software works but also what it's built on. The architecture is opinionated as well. A lot of times that means selecting a particular set of technologies or patterns and incorporating them together in a specific way. Basically: **curation**.

## An Ounce of Productivity is Worth a Pound of Curation

Okay, so this play on a [Benjamin Franklin quote](https://www.goodreads.com/quotes/247269-an-ounce-of-prevention-is-worth-a-pound-of-cure) isn't exactly a perfect analogy. But the point is, as I've recently heard a customer quoted: "Curation is how we get stuff done!"

In the consumer world, we enjoy the benefits of curation daily. We trust companies like Netflix to suggest movies and television we will like. We look to Amazon to tell us what we like to buy. Our Facebook and Twitter feeds are filtered for us. These are the modern giants of content curation. They use algorithms and AI to keep things relevant, but people still drive the behavior. Plus, think about traditional television or radio news, or even used bookstore or boutique owners. We embrace curation in our daily lives.

In the business and IT world, however, it seems like curation is often avoided. Remember the 20%? Sometimes the customer knows better and doesn't buy into an opinionated architecture. They insist on defining it themselves. It's true that curation may not be for everyone. Under the right circumstances, though, it can help save a lot of time and headaches. Determine where you are on the curation scale and pick the right solution. If you trust the curator, they can help.

At CF Summit, I attended many talks about Kubernetes and its role within the Cloud Foundry ecosystem. As [Onsi Fakhouri spoke about at SpringOne Platform](https://www.youtube.com/watch?v=_uB5bBsMZIk) late last year, it's an and conversation, not or. It's not about Kubernetes vs. Cloud Foundry, but rather how can they interoperate? Or, more specifically (and more opinionated), how should they interoperate?

{% tweet "https://twitter.com/cloudfoundry/status/986960472380530688" %}

This was a popular topic at CF Summit this year. Right now, Cloud Foundry has a few ways it interoperates with Kubernetes. Most prominently it's a separate container runtime (as opposed to the application runtime). Some things fit better on the container runtime (like stateful workloads, ISV container images). Some are made for the application runtime (12-factor apps, microservices, etc.). The opinion right now is that it all depends on the use case.

Other examples and conversations about Kubernetes interoperability showed up at the conference too. There were products that include CF running on top of K8s and demos showing K8s running within CF. As a first-time attendee, it was amazing to see the open discussion and sharing of ideas. That's the beauty of open source software and its community. It can evolve to incorporate (read: "curate") other growing technologies and find the right (read: "opinionated") way to put it all together. (For Cloud Foundry, it doesn't just mean Kubernetes either. Look at how the code base has begun [incorporating Envoy](https://content.pivotal.io/blog/pivotal-cloud-foundry-2-1-adds-cloud-native-net-envoy-native-service-discovery-to-boost-your-transformation) for another example.) It will all come together in the way that makes the most sense for the user experience. In the end, that's all that should matter.

## It's All About the Outcomes

Technology is a great enabler. We can't do technology for technology's sake. Containers are cool. Machine Learning is fun. Yes, there are some amazing pieces of tech out there. Except it's not about the tech itself, but rather what it enables for its users. It's the user experience, the productivity gains, the value, that matters.

Ultimately, technology should be about doing things better, faster, more reliably. That's the level that all software curation conversations should arrive at: customer outcomes. Whatever the future of Cloud Foundry and Kubernetes brings, we can't forget the fundamental goal: **build software better.**
