# Module 05 - Evaluator-Optimizer Pattern

> **Pattern Complexity**: High  
> **Prerequisites**: Complete the sequential orchestration module

## Introduction

The evaluator-optimizer pattern implements iterative improvement workflows where one agent generates responses while another provides evaluation and feedback in a loop. This pattern mimics human iterative refinement processes and is particularly effective when clear evaluation criteria exist.

## When to Use This Pattern

Use evaluator-optimizer when:
- You have clear evaluation criteria for output quality
- Iterative refinement provides measurable value
- LLM responses can be demonstrably improved with feedback
- Quality is more important than speed
- The evaluator can provide meaningful, actionable feedback

## Pattern Components

### Generator Agent
- Creates initial responses or solutions
- Incorporates feedback from evaluator
- Iterates based on evaluation results

### Evaluator Agent
- Assesses generator output against criteria
- Provides specific, actionable feedback
- Determines when quality standards are met

### Orchestration Logic
- Manages iteration loops
- Applies termination conditions
- Handles convergence and timeout scenarios

## Common Examples

- **Literary Translation**: Translate → Evaluate nuances → Refine → Re-evaluate
- **Complex Research**: Search → Analyze → Evaluate completeness → Additional searches
- **Content Creation**: Draft → Critique → Revise → Final review
- **Code Generation**: Generate → Review → Optimize → Validate

## Pattern Benefits

- **Quality Improvement**: Iterative refinement leads to better results
- **Objective Evaluation**: Structured assessment of outputs
- **Learning Loop**: Generator improves based on consistent feedback
- **Quality Control**: Built-in quality assurance mechanism

## Logic Apps Implementation

In this module, you'll learn to:
1. Design generator-evaluator agent pairs
2. Implement feedback loops and iteration logic
3. Define termination conditions and quality gates
4. Handle convergence and timeout scenarios
5. Monitor and optimize iteration performance

## Lab Exercises

### Exercise 1: Basic Evaluator-Optimizer
Build a document quality improvement system.

### Exercise 2: Multi-Criteria Evaluation
Implement complex evaluation with multiple quality metrics.

### Exercise 3: Adaptive Termination
Create intelligent stopping conditions based on improvement rates.

### Exercise 4: Performance Monitoring
Track iteration effectiveness and optimize the feedback loop.

## Key Concepts

- **Feedback Loops**: Structured improvement cycles
- **Evaluation Criteria**: Clear quality standards and metrics
- **Termination Conditions**: When to stop iterating
- **Convergence Detection**: Identifying when no further improvement is possible
