# Handoff Pattern (Module 07)

In this module, you learn how to implement the handoff pattern in Azure Logic Apps. This pattern enables seamless transitions between agents with different specializations while maintaining conversation continuity and context, allowing for escalation and expert routing.

When you finish this module, you'll achieve the goals and complete the tasks in the following list:

• Understand when and why to use handoffs
• Build agent workflows with handoff capabilities
• Implement context preservation across agent transitions
• Create escalation paths to human agents
• Handle handoff failures and recovery mechanisms
• Monitor multi-agent handoff workflows

## What is the Handoff Pattern?

The handoff pattern enables seamless transitions between agents with different specializations while maintaining conversation continuity and context. As described by Microsoft AutoGen, this pattern allows agents to "delegate tasks to other agents using special tool calls" while preserving the entire conversation context.

### Key Benefits

- **Specialization**: Each agent focuses on its area of expertise
- **Context Preservation**: Complete conversation history is maintained across handoffs
- **Natural Escalation**: Mimics human customer service escalation patterns
- **Fault Isolation**: Issues in one agent don't affect others
- **Dynamic Routing**: Agents can decide when and where to transfer based on conversation flow

### When to Use This Pattern

Use handoff when:
- You need to transfer control between specialized agents during a conversation
- Context and conversation state must be preserved across transitions
- Different stages of a process require different expertise
- Human-like escalation patterns are beneficial
- Agents need to make dynamic decisions about transferring tasks

## Example Scenario

We'll build a **customer service handoff system** that manages the complete customer journey from initial triage through specialized support to human escalation. This example is based on the Microsoft AutoGen handoff pattern but adapted for Logic Apps.

**Input**: Customer service request
**Handoff Flow**:
1. **Triage Agent**: Initial classification and routing decisions
2. **Refund Agent**: Handles refund requests and processing
3. **Sales Agent**: Manages sales inquiries and product recommendations
4. **Human Agent**: Escalation point for complex issues

**Output**: Specialized response with complete conversation context maintained

## Prerequisites

• An Azure account and subscription. If you don't have a subscription, [sign up for a free Azure account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
• A Standard logic app resource with agent capabilities enabled.
• Completion of previous modules in the conversational agents series.

If you don't have this setup, see [Module 1 - Create your first conversational agent](../02_build_conversational_agents/01-create-first-conversational-agent.md).

## Part 1 - Build Specialized Agent Workflows with Handoff Tools

In this section, you'll create four agent workflows that can seamlessly hand off conversations to each other while preserving complete context.

### Step 1 - Create the Customer Service Workflow with Handoff Agents

[PLACEHOLDER: Add steps for creating the main customer service workflow]

1. Create a new workflow in your Logic Apps resource:
   - **Workflow Name**: `customer-service-agent`
   - **Workflow Type**: Conversational Agent

2. Configure the Main Triage Agent:
   - **Name**: Customer Service Agent
   - **System Instructions**: 
     ```
     You are a customer service agent for ACME Inc. Start by introducing yourself and understanding the customer's request. Based on their needs, you can hand off to specialized agents within this conversation.
     
     Your role is to:
     1. Greet customers professionally
     2. Understand their request or issue
     3. Hand off to appropriate specialists when needed
     4. Always maintain friendly, professional tone
     
     You can hand off to specialized agents for complex issues that require focused expertise.
     ```

### Step 2 - Add Specialized Agent Actions with Handoff Descriptions

[PLACEHOLDER: Add steps for adding agent actions to the workflow]

1. **Add Refund Specialist Agent Action**:
   - In your workflow, add a new **Agent** action
   - **Agent Name**: Refund Specialist
   - **Handoff Description**: 
     ```
     Hand off to the refund specialist for refunds, returns, exchanges, and billing issues. This agent specializes in understanding refund policies, processing returns, and resolving billing disputes with empathy and efficiency.
     ```
   - **System Instructions**: 
     ```
     You are a refund specialist for ACME Inc. Handle refund requests, returns, and billing issues with empathy and efficiency.
     
     Your process:
     1. Understand the customer's refund reason
     2. Propose appropriate solutions (exchanges, fixes, refunds)
     3. If refund is needed, look up item details and execute refund
     4. Always be understanding and helpful with refund requests
     
     You can hand back to the main agent if the request is outside your refund expertise.
     ```

2. **Add Sales Specialist Agent Action**:
   - Add another **Agent** action to your workflow
   - **Agent Name**: Sales Specialist  
   - **Handoff Description**:
     ```
     Hand off to the sales specialist for product inquiries, purchase assistance, and sales consultations. This agent excels at understanding customer needs, recommending products, and facilitating purchases.
     ```
   - **System Instructions**: 
     ```
     You are a sales specialist for ACME Inc. Help customers with product inquiries and sales.
     
     Your sales process:
     1. Understand customer needs and problems
     2. Recommend appropriate ACME products
     3. Discuss features and benefits
     4. Handle pricing and facilitate orders when ready
     5. Hand back to main agent for non-sales issues
     
     Be enthusiastic but not pushy. Focus on solving customer problems.
     ```

3. **Add Human Escalation Agent Action**:
   - Add a third **Agent** action for escalations
   - **Agent Name**: Human Manager
   - **Handoff Description**:
     ```
     Escalate to a human manager for complex issues requiring human judgment, policy exceptions, or situations where the customer specifically requests human assistance.
     ```
   - **System Instructions**: 
     ```
     You are a human customer service manager for ACME Inc. Handle escalated issues that require human judgment and authority.
     
     Your responsibilities:
     1. Review the conversation context carefully
     2. Provide thoughtful, empathetic responses
     3. Make decisions within company policy
     4. Resolve complex issues with authority
     5. Represent the highest level of customer service
     
     You have the authority to make exceptions and provide solutions that other agents cannot.
     ```

### Step 3 - Configure Agent-Specific Tools

Based on the [Microsoft AutoGen handoff pattern](https://microsoft.github.io/autogen/dev/user-guide/core-user-guide/design-patterns/handoffs.html), each agent should have its own specialized tools. In Logic Apps, you add tools to specific agent actions, not to the main workflow.

1. **Add Tools to Refund Specialist Agent**:
   - In the Refund Specialist agent action, add the following tools:
   
   **Tool Name**: `look_up_item`
   - **Tool Description**: `Use to find item ID. Search query can be a description or keywords.`
   - **Action**: Add a **Compose** action that returns a mock item ID
   - **Configuration**: 
     ```json
     {
       "item_id": "item_132612938",
       "status": "found"
     }
     ```

   **Tool Name**: `execute_refund`
   - **Tool Description**: `Execute refund for validated items after confirming eligibility`
   - **Action**: Add a **Compose** action that processes the refund
   - **Configuration**:
     ```json
     {
       "refund_status": "success",
       "refund_amount": "@{parameters('refund_amount')}",
       "confirmation": "Refund processed successfully"
     }
     ```

2. **Add Tools to Sales Specialist Agent**:
   - In the Sales Specialist agent action, add the following tools:

   **Tool Name**: `search_products`
   - **Tool Description**: `Search product catalog based on customer needs and preferences`
   - **Action**: Add a **Compose** action that returns product search results
   - **Configuration**:
     ```json
     {
       "products": [
         {
           "id": "prod_001",
           "name": "ACME Roadrunner Trap",
           "price": 299.99,
           "description": "Premium roadrunner catching device"
         }
       ]
     }
     ```

   **Tool Name**: `execute_order`
   - **Tool Description**: `Execute customer orders with product details, pricing, and shipping. Price should be in USD.`
   - **Action**: Add a **Compose** action that processes orders
   - **Configuration**:
     ```json
     {
       "order_status": "success",
       "order_id": "@{guid()}",
       "total": "@{parameters('price')}",
       "product": "@{parameters('product')}"
     }
     ```

3. **Add Tools to Human Manager Agent**:
   - In the Human Manager agent action, add the following tools:

   **Tool Name**: `create_escalation_ticket`
   - **Tool Description**: `Create internal escalation ticket for complex issues requiring follow-up`
   - **Action**: Add a **Compose** action that creates escalation tickets
   - **Configuration**:
     ```json
     {
       "ticket_id": "@{guid()}",
       "priority": "high",
       "status": "created",
       "assigned_to": "customer_success_team"
     }
     ```

4. **Important Notes on Tool Assignment**:
   - **Agent-Specific Tools**: Each agent only has access to tools assigned to their specific agent action
   - **No Tool Sharing**: The Refund Specialist cannot use sales tools, and the Sales Specialist cannot use refund tools
   - **Focused Functionality**: This separation ensures each agent focuses on their specialized domain
   - **Tool Descriptions**: Clear descriptions help the agent understand when to use each tool

### Step 4 - Test the Handoff System

[PLACEHOLDER: Add steps for testing the complete handoff system within single workflow]

1. **Test with a refund scenario**:
   - Start a conversation with your `customer-service-handoff` workflow
   - Input: "Hi, I want to return a pair of shoes I bought. They're too small."
   - Expected behavior:
     - Main agent greets customer and understands the refund request
     - System automatically hands off to Refund Specialist agent
     - Refund Specialist processes the return using available tools
     - Complete conversation context is maintained throughout

2. **Test with a sales scenario**:
   - Input: "I'm looking for a new laptop for work. Can you help me find something?"
   - Expected behavior:
     - Main agent identifies this as a sales inquiry
     - System hands off to Sales Specialist agent
     - Sales Specialist uses product search tools and helps with purchase
     - Conversation flows seamlessly within the same workflow

3. **Test escalation scenario**:
   - Input: "I've had multiple issues with your service and want to speak to a manager immediately."
   - Expected behavior:
     - Main agent recognizes need for human escalation
     - System hands off to Human Manager agent
     - Manager handles with appropriate authority and empathy
     - Can create escalation tickets if needed

4. **Verify Agent-Specific Tool Usage**:
   - During testing, observe that each agent only uses their assigned tools:
   - **Refund Specialist**: Only uses `look_up_item` and `execute_refund`
   - **Sales Specialist**: Only uses `search_products` and `execute_order`
   - **Human Manager**: Only uses `create_escalation_ticket`
   - This tool isolation is similar to the AutoGen pattern where each agent has distinct capabilities

## Part 2 - Understanding the AutoGen Handoff Pattern

### Key Concepts from Microsoft AutoGen

The [Microsoft AutoGen handoff pattern](https://microsoft.github.io/autogen/dev/user-guide/core-user-guide/design-patterns/handoffs.html) demonstrates important concepts that we adapt for Logic Apps:

1. **Agent Specialization**: Each agent has specific tools and capabilities
   - **Triage Agent**: Has only delegate tools (handoff tools) - no regular tools
   - **Sales Agent**: Has `execute_order` tool + `transfer_back_to_triage` delegate tool
   - **Issues/Repairs Agent**: Has `execute_refund` and `look_up_item` tools + `transfer_back_to_triage`
   - **Human Agent**: Has no tools (represents human input)

2. **Tool Separation**: AutoGen distinguishes between:
   - **Regular Tools**: Execute business logic (search, refund, order)
   - **Delegate Tools**: Transfer control to other agents (handoff functions)

3. **Logic Apps Adaptation**: In our Logic Apps implementation:
   - **Agent Actions**: Replace separate AutoGen agents
   - **Handoff Descriptions**: Replace AutoGen delegate tools
   - **Agent Tools**: Replace AutoGen regular tools
   - **Single Workflow**: Replaces AutoGen's distributed agent runtime

### Tool Assignment Best Practices

Based on the AutoGen pattern, follow these principles when assigning tools to agents:

1. **Domain-Specific Tools**: Each agent should only have tools relevant to their domain
   - Refund agents: Item lookup, refund processing, return validation
   - Sales agents: Product search, order processing, pricing tools
   - Human agents: Escalation tickets, policy override tools

2. **No Cross-Domain Tools**: Agents shouldn't have access to tools outside their expertise
   - Sales agents can't process refunds
   - Refund agents can't execute sales orders
   - This prevents confusion and maintains clear boundaries

3. **Tool Description Clarity**: Write precise tool descriptions
   - Include what the tool does
   - Specify input parameters required
   - Add usage guidelines (like "Price should be in USD")

## Part 2 - Advanced Handoff Features

In this section, you'll enhance the handoff system with advanced features like conditional handoffs, handoff history tracking, and dynamic agent selection.

### Step 1 - Configure Conditional Handoffs

[PLACEHOLDER: Add steps for setting up conditional handoff logic]

1. **Add conditional handoff descriptions**:
   - Update agent handoff descriptions to include specific conditions
   - Example for Refund Specialist:
     ```
     Hand off to refund specialist when customer mentions: returns, refunds, exchanges, wrong item, defective product, billing disputes, or charge issues. This agent has access to order history and refund processing tools.
     ```

2. **Configure handoff priority**:
   - Set agent priority for overlapping scenarios
   - Human Manager should have highest priority for escalation keywords
   - Sales and Refund specialists can handle specific domains

### Step 2 - Implement Handoff History Tracking

[PLACEHOLDER: Add steps for tracking handoff patterns]

1. **Add conversation metadata tracking**:
   - Track which agents have been active in the conversation
   - Monitor handoff frequency and success rates
   - Store handoff reasoning for analysis

### Step 3 - Test Advanced Handoff Scenarios

[PLACEHOLDER: Add steps for testing complex handoff scenarios]

1. **Multi-handoff conversation**:
   - Test scenario requiring multiple agent handoffs
   - Example: Sales inquiry → Refund question → Manager escalation
   - Verify context preservation across all handoffs

## Part 3 - Monitor Handoff Performance

### Step 1 - Monitor Agent Performance

[PLACEHOLDER: Add steps for monitoring individual agent performance within handoffs]

1. **Track handoff success rates**:
   - Monitor how often handoffs result in successful resolution
   - Identify agents that frequently hand back to main agent
   - Analyze conversation completion rates

### Step 2 - Analyze Handoff Patterns

[PLACEHOLDER: Add steps for analyzing handoff behavior patterns]

1. **Review handoff decision making**:
   - Analyze when and why agents choose to hand off
   - Identify common handoff triggers and conditions
   - Optimize handoff descriptions based on usage patterns

### Step 3 - Optimize Agent Specialization

[PLACEHOLDER: Add steps for optimizing agent roles and capabilities]

1. **Refine agent boundaries**:
   - Clarify when each specialist agent should handle requests
   - Update handoff descriptions for better routing accuracy
   - Balance agent workload and specialization
## Best Practices for Handoff Patterns

- **Clear Handoff Descriptions**: Write detailed handoff descriptions that specify exactly when and why to hand off to each specialist agent
- **Seamless Context Flow**: Conversation context is automatically maintained within the single workflow - no manual context passing required
- **Appropriate Specialization**: Design agent roles with clear boundaries and specific expertise areas
- **Natural Handoff Triggers**: Use natural language cues and customer intent to trigger appropriate handoffs
- **Human Escalation Path**: Always include a human manager agent for complex issues and customer satisfaction
- **Avoid Handoff Loops**: Ensure agents have clear exit strategies and don't repeatedly hand off the same conversation
- **Monitor Performance**: Track handoff success rates and customer satisfaction across different agent handoffs
## Troubleshooting Common Issues

| Problem | Solution |
|---------|----------|
| Agents don't hand off appropriately | Refine handoff descriptions with more specific triggers and conditions |
| Handoff loops between agents | Add clear exit strategies and prevent agents from repeatedly handing off same requests |
| Customers confused by agent switches | Ensure smooth transitions with agents introducing their specialization |
| Tools not available to specialist agents | Verify each agent action has access to appropriate tools for their specialty |
| Poor handoff decisions | Monitor and analyze handoff patterns, update agent instructions based on performance |
[PLACEHOLDER: Add steps for testing complex handoff scenarios]

1. **Multi-handoff conversation**:
   - Test scenario requiring multiple agent handoffs
   - Example: Sales inquiry → Refund question → Manager escalation
   - Verify context preservation across all handoffs

[PLACEHOLDER: Add steps for analyzing transitions]

### Step 3 - Optimize handoff logic

[PLACEHOLDER: Add steps for optimizing handoffs]

## Best Practices for Handoff Patterns

- **Context Preservation**: Always pass complete conversation history in handoffs
- **Clear Handoff Triggers**: Define specific conditions for when to transfer
- **Smooth Transitions**: Ensure receiving agents understand their role immediately
- **Fallback Mechanisms**: Provide ways to return to previous agents when needed
- **Human Escalation**: Always include a path to human agents for complex issues
- **Monitor Handoff Success**: Track successful transitions and customer satisfaction

## Troubleshooting Common Issues

| Problem | Solution |
|---------|----------|
| Context lost during handoff | Ensure complete conversation history is passed in request body |
| Agents don't understand handoff reason | Improve handoff tool descriptions and system instructions |
| Infinite handoff loops | Add logic to prevent agents from transferring back repeatedly |
| Failed handoff calls | Implement error handling and fallback to previous agent |

## Clean up resources

When you're done with this module, make sure to delete any resources you no longer need to avoid continued charges.

## Next steps

• [Module 08 - Evaluator-Optimizer Pattern](./08-evaluator-optimizer-pattern.md) - Learn quality assurance workflows
• [Module 09 - Orchestrator-Workers Pattern](./09-orchestrator-workers-pattern.md) - Implement coordinated multi-agent systems

---

**Pattern Complexity**: Medium-High  
**Prerequisites**: Conversational agent basics, Logic Apps fundamentals, Routing pattern
