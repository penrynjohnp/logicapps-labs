# Module 04 - Routing Pattern

> **Pattern Complexity**: Low-Medium  
> **Prerequisites**: Complete the prompt chaining module

## Introduction

The routing pattern classifies an input and directs it to a specialized followup task. This pattern enables separation of concerns and allows for specialized prompts optimized for specific input types, preventing optimization conflicts.

## When to Use This Pattern

Use routing when:
- You have distinct categories of inputs requiring different handling
- Classification can be handled accurately (by LLM or traditional algorithms)
- Specialized handling improves performance over a general approach
- You want to optimize different workflows independently

## Pattern Benefits

- **Separation of Concerns**: Different input types handled by specialized agents
- **Optimization**: Each route can be tuned for its specific input category
- **Scalability**: Easy to add new categories and routes
- **Performance**: Specialized agents perform better than general-purpose ones

## Common Examples

- **Customer Service**: General → Billing, Technical → Support, Refunds → Processing
- **Content Processing**: Urgent → Priority queue, Routine → Standard processing
- **Model Selection**: Simple → Lightweight model, Complex → Advanced model
- **Document Processing**: Invoice → Accounting, Contract → Legal, Report → Analysis

## Logic Apps Implementation

In this module, you'll learn to:
1. Design effective classification strategies
2. Implement routing logic in Logic Apps
3. Build specialized agents for different routes
4. Handle edge cases and fallbacks
5. Monitor routing effectiveness

## Lab Exercises

### Exercise 1: Basic Classification Router
Build a customer service query router.

### Exercise 2: Multi-Level Routing
Implement hierarchical routing with sub-categories.

### Exercise 3: Confidence-Based Routing
Add confidence thresholds and fallback handling.

### Exercise 4: Performance Monitoring
Track routing accuracy and optimize classification.
