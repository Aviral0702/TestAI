import Link from "next/link"
import { ArrowRight, Check, Github, Linkedin, Twitter, Sparkles, Zap, Box, Cloud, Settings, Shield } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Navbar from "@/components/NavBar"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <Navbar/>
      <main className="relative">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6 md: py-12">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none xl:text-8xl/none">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
                    Revolutionize
                  </span>
                  <br />
                  Your Testing Workflow
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                  Generate, store, and execute API test cases effortlessly using AI. Save time and improve code quality.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-lg border-primary text-primary hover:bg-primary/10"
                >
                  See How It Works
                </Button>
              </div>
              <div className="w-full max-w-sm rounded-full border border-border/40 bg-black/30 px-4 py-2 text-center text-sm text-muted-foreground backdrop-blur">
                <p>Trusted by thousands of developers worldwide ⭐️</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40 bg-black/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight xl:text-6xl/tight">
                  Why Automate Your Testing?
                </h2>
                <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl lg:text-2xl">
                  Streamline your testing process with our powerful AI-driven solution.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "AI-Generated Tests",
                  description: "Instantly generate robust API test cases with our advanced AI technology.",
                },
                {
                  icon: Box,
                  title: "Seamless Storage",
                  description: "Save and manage your tests effortlessly in one centralized location.",
                },
                {
                  icon: Cloud,
                  title: "Automated Execution",
                  description: "Run tests directly in your CI/CD pipeline with zero configuration.",
                },
                {
                  icon: Settings,
                  title: "Customizable Test Cases",
                  description: "Modify AI-generated tests to perfectly fit your specific needs.",
                },
                {
                  icon: Shield,
                  title: "Framework Integration",
                  description: "Supports Jest, Supertest, and all popular testing frameworks.",
                },
                {
                  icon: Sparkles,
                  title: "Real-time Analytics",
                  description: "Get detailed insights into your test coverage and performance.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border border-border/40 bg-black/40 p-2 transition-all hover:border-primary/40 hover:bg-black/60"
                >
                  <div className="flex h-full flex-col justify-between rounded-md p-6">
                    <feature.icon className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                  Three Simple Steps to AI-Driven Testing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Get started with AI-powered testing in minutes.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Enter API Details",
                  description: "Provide your API URL, method, and payload information.",
                },
                {
                  step: "02",
                  title: "AI Generation",
                  description: "Our AI generates five edge-case test scenarios automatically.",
                },
                {
                  step: "03",
                  title: "Execute & Store",
                  description: "Store, edit, and execute tests with a single click.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border border-border/40 bg-black/40 transition-all hover:border-primary/40 hover:bg-black/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative p-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground text-4xl font-bold">
                      {step.step}
                    </span>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40 bg-black/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Trusted by developers and teams worldwide.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2">
              {[
                {
                  quote: "This tool saved us 10+ hours per sprint! The AI-generated test cases are incredibly useful.",
                  author: "John D.",
                  role: "Lead Engineer",
                  company: "Tech Corp",
                },
                {
                  quote:
                    "The best testing automation tool we've used. It's like having an extra QA engineer on the team.",
                  author: "Sarah M.",
                  role: "CTO",
                  company: "StartupX",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border border-border/40 bg-black/40 p-6 transition-all hover:border-primary/40 hover:bg-black/60"
                >
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10" />
                      <div>
                        <h4 className="font-semibold">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">Start for free, upgrade as you grow.</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
              {[
                {
                  title: "Free",
                  price: "$0",
                  description: "Perfect for getting started",
                  features: ["100 AI-generated tests/month", "Basic test storage", "Community support"],
                },
                {
                  title: "Pro",
                  price: "$49",
                  description: "Best for growing teams",
                  features: ["Unlimited tests", "Priority execution", "CI/CD integration", "Email support"],
                },
                {
                  title: "Enterprise",
                  price: "Custom",
                  description: "For large organizations",
                  features: ["Custom solutions", "Team collaboration", "Dedicated support", "SLA guarantee"],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-lg border bg-black/40 transition-all hover:border-primary/40 hover:bg-black/60",
                    index === 1 ? "border-primary" : "border-border/40",
                  )}
                >
                  {index === 1 && (
                    <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-2xl">{plan.title}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                    </div>
                    <ul className="mt-4 space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "mt-6 w-full",
                        index === 1
                          ? "bg-primary hover:bg-primary/90"
                          : "border-primary text-primary hover:bg-primary/10",
                      )}
                      variant={index === 1 ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40 bg-black/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                  Got Questions? We've Got Answers.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Find answers to commonly asked questions about our service.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How do AI-generated tests work?",
                    answer:
                      "Our AI analyzes your API endpoints and generates comprehensive test cases covering various scenarios, edge cases, and potential issues.",
                  },
                  {
                    question: "Can I modify the test cases?",
                    answer:
                      "Yes, all AI-generated tests are fully customizable. You can edit, add, or remove test cases to match your specific requirements.",
                  },
                  {
                    question: "Which frameworks does this support?",
                    answer:
                      "We support all major testing frameworks including Jest, Supertest, Mocha, and more. Our tests can be exported in multiple formats.",
                  },
                  {
                    question: "Do you offer a free plan?",
                    answer:
                      "Yes, we offer a free plan that includes 100 AI-generated tests per month, perfect for individual developers or small projects.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-border/40 px-6 hover:bg-black/40"
                  >
                    <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-border/40 bg-black/30 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Sparkles className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 TestAI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

