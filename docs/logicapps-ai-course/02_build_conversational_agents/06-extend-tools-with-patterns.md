# Module 06 - Extend your tool functionality with patterns

This module describes several common tool patterns:
- Mocking tool output
- Adding multiple actions per tool
- Transforming tool output
- Complex control flow in tools via nested workflows
- Parallel tool execution
- Human-in-the-loop

## Mocking tool output

When developing your agent, it can be helpful to iterate on high-level agent design (model selection, system prompt, tool metadata) without real tool execution. For example, you may want to defer connector configuration or avoid side effects.

To accomplish this, you can mock tool output in two ways:
- Use a Compose action
- Use static results

### Mocking using Compose action

1. When implementing the tool, instead of configuring your intended connector, select "Compose" action. This is a built-in action in Logic Apps that allows you to compose static or dynamic values into a final result.
2. Replace the Compose action Inputs with the value you would like the tool to return.
3. When executing the tool, the Compose action will return your provided value as-is.

See the [`EchoTool` example](./04-add-parameters-to-tools.md) in module four.

### Mocking using static results

Consult [this documentation](https://learn.microsoft.com/en-us/azure/logic-apps/testing-framework/test-logic-apps-mock-data-static-results?tabs=standard) to set up static results on the action whose execution you would like to mock.

## Adding multiple actions per tool branch

So far, all our examples have had one Logic App action per agent tool branch. You also have the option to add multiple linear actions. To do this, simply select the "Add" button within a tool to set up multiple actions.

When a tool completes execution, the results must be sent back to the LLM for interpretation. In Logic Apps, the result of the **final** action in your tool branch becomes the tool output.

## Transforming tool output

The final action in your tool branch may return an intermediate payload that you want to transform further before sending back to LLM for interpretation.

This capability has several use cases:
- Reduce overall token count by only sending minimal information to LLM
- Improve agent quality by filtering out unnecessary information from the tool output
- By default, the last action output becomes the tool output. If you have a chain of several actions, you can construct a custom tool output payload that combines properties from multiple action outputs. 

This can again be accomplished with the Compose action.

## Complex control flow in tools via nested workflows

By default, a tool branch can contain linear actions. If you want more complex control flow in your tool, you can implement the tool as a separate deterministic Logic Apps workflow. You can then invoke the nested workflow in your tool. This allows complex control flow and also further decouples the tool implementation from the agent design. For example, if you take this approach, you can test the nested workflow independently from its agent usage.

## Parallel tool execution

Many LLM providers have support for parallel tool execution. For example, a weather agent asked for data about both Seattle and Paris can invoke the tool twice in parallel with different inputs. This is supported by default in Logic Apps agents - the monitoring view will allow you to trace the execution of each tool.

## Human-in-the-loop

Many agents require human intervention - for example, certain actions should wait for review and approval. One way to accomplish this is to first identify an appropriate webhook action that defers completion until some condition is met. Some services have existing actions that support this pattern. For example, Teams has the ["Post adaptive card and wait for a response" action](https://learn.microsoft.com/en-us/connectors/teams/?tabs=text1%2Cdotnet#post-adaptive-card-and-wait-for-a-response) and Outlook has the ["Send approval email" action](https://learn.microsoft.com/en-us/connectors/office365/#send-approval-email). You can [extend this pattern into any service](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-create-api-app#perform-long-running-tasks-with-the-webhook-action-pattern) by using the webhook action.

We assume this webhook action will be leveraged to notify and wait for approval. Once the action is identified, there are two ways to integrate this into the agent:
1. We can create a distinct approval tool consisting solely of the webhook action. This approach has the following characteristics:
- [benefit] Generic approval tool that can be reused for multiple target actions
- [tradeoff] The LLM is 'in charge' - e.g. its completion results are what dictate approval invocation, approval response interpretation, and target action invocation. This depends on the system prompt, tool metadata, and user messages. It is possible the approval could be "skipped" since the LLM behavior is probabilistic.
2. For certain target actions where approval **must occur deterministically** prior to invocation, we can implement the tool as a nested workflow where the approval/webhook action runs first. Then the response from the webhook action is imperatively parsed. The target action is then invoked if and only if the webhook results indicate success.
  - [benefit] The target action will **never** run without corresponding webhook action results.
  - [benefit] While the LLM completion results control when the overall tool runs, the corresponding approval flow is fully deterministic without LLM involvement.
  - [tradeoff] This requires a separate nested workflow.
