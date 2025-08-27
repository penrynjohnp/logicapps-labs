---
title: Build your first conversational agent in Azure Logic Apps (Module 01)
description: Learn how to create a conversational agent in Azure Logic Apps with AI reasoning and add your first agent tool.
ms.service: logic-apps
ms.topic: tutorial
ms.date: 08/19/2025
author: absaafan
ms.author: absaafan
---

# Module 01 - Create your first conversational agent in Azure Logic Apps

In this module, you will learn how to create your first conversational agent in Logic Apps. We will create a workflow with the new 'Agent' kind and then connect the AI model and add a tool that the agent can use. The example we will be using in this module is a "Tour Guide" agent for the MET museum.

By the end, you will:

- Have a conversational agent that you can interact with in the Azure Portal
- Understand key concepts concerning conversational agents in Azure Logic Apps
- The basics of tool execution and agent reasoning
- The basics of A2A agent protocol

We will keep the agent and tool simple to illustrate the concepts without getting overly complex. In later modules, we will build on top of these concepts to add more complex tool and agent logic.

The agent workflow we are creating itself is an A2A agent. In module 10, we will go into more details about this concept and configuration options.

---

## Prerequisites 

- An Azure subscription with permissions to create logic apps.
- [An Azure Logic App standard SKU workflow application](https://learn.microsoft.com/en-us/azure/logic-apps/create-single-tenant-workflows-azure-portal).
- [A deployed Azure OpenAI model](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)

---

## Part 1: Creating your new conversational agent

### Step 1 - Create your new conversational agent workflow
- Open your logic app (Standard) and navigate to the 'workflows' blade.
- Click on the "+ Add" action and select "Add".
- The "Create workflow" experience will come up on the right side of your screen.
- Enter the workflow name. In our case, we will call this workflow "TourGuide".
- Select "Conversational Agents".
- Click on the "Create" button.

The workflow will be created and you will be redirected to this new workflow and we can start building it out.

### Step 2 - Configure your agent loop connection
- Click on the "Default Agent" agent loop action. This will bring up connection configuration.
- Select "Add new" to add a new connection.
- In this module, we will create a connection to your existing Azure OpenAI resource.
- Select "Subscription" and select your subscription from the dropdown.
- Selecting your subscription will load the Azure OpenAI resources you have in that subscription. Select the resource you want to use.
    - Note that this resource should have a deployed GPT model. In this module, we will be using "GPT-5".
- Click on the "Create new" button.

Your agent connection is now ready to be used and we can configure the agent inputs.

### Step 3 - Configure your agent loop inputs
- First let's rename this agent loop action. Click on the name at the top and rename. For this lesson we will call it "TourGuideAgent".
- Click on the "Deployment Model Name" dropdown and select your deployment model to use for this agent loop.
    - You can also create a new model by clicking the "Create New" link under the dropdown and select your model and name. This will create a new model on the Azure OpenAI resource you are connected to.
- Now enter the "System Instructions" for this agent. In this module, we are building a simple agent that acts as a tour guide for the MET and uses the museum's public API to share facts about artifacts in the museum. This will be the system prompt we will use: 

```
You are an agent that provides fun facts about items at the MET. You will act as a tour guide answering questions that the user has.

You will greet the user with a friendly and warm tone. 
You will ask the user to give you a number or the option for you to generate a random number between 1 and 900000 for them. 

Once you have an object number, you will use the "Get MET object" tool and provide the random number you chose. The tool will return to you the item information about this object. 

Present the item information to the user as a tour guide and then ask if they would like more details or start the process again with another item.
```

Your agent loop is now ready but we need to add the tool that the agent can use to get the museum object.

### Step 4 - Adding a tool to your agent loop
- Click on the "Add an action" button inside the agent loop. This will open a panel on the side that lets you select the action you want to add.
- Find the "HTTP" connector and add the "HTTP" action. This will add the action in a new tool in the agent loop.
- We need to configure the tool so we will first rename it and add a description so that we help the agent in knowing when and how to use it. We will name the tool "Get MET object" and set the description to "This tool is used to get object info on an object in the met.". 
- We also want to add an agent parameter so that the agent can pass the object number it got from the user or generated into the tool. Click on "Create Parameter" and name your parameter "objectNumber" with a "String" type and description "The object number to be passed into the MET API".
- Now we want to configure the action in the tool. Rename the HTTP action, we will name it "GetMetObjectApi".
- Fill in the URI to point to the API "https://collectionapi.metmuseum.org/public/collection/v1/objects/".
- With your cursor at the end of the URI, add the agent parameter by clicking on the agent parameter logo and selecting the "objectNumber" parameter.
- Save the workflow by clicking on the "Save" button at the top. 

Now your workflow is ready and we can test it by using the chat blade to interact directly with it.

### Step 5 - Chatting with your agent

- Click on the "Chat" button on the left side of the screen.
- This will load a chat interface, we can directly interact with the agent here. Each chat session is one run of the workflow and is independent of other sessions. Let's start by saying hello.
- The agent should greet you and give you options of what you can do. In this case, I already know which object I want to get information about so I will pass that number in by saying, "I want more information about object 436535".
- The agent will response with information about the object I chose and some highlights about it.


### Note about system prompts and tool descriptions

It is important to be descriptive in your system prompt and tool names and descriptions. These are passed into the AI model and impact the reasoning and decision making like when and how to call the tools you have in the workflow. Based on the model you selected, you can find general guidance. In our example, we used GPT-5 so we can use Azure Open AI's [GPT-5 prompting guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide).

### Summary

In this module, we created our first conversational agent in Azure Logic Apps. We added a system prompt to guide the underlying AI model in its reasoning. We also added a tool that the agent can use when appropriate to fetch information. These are the basic building blocks of creating an agent and can be coupled with all the powerful features that Azure Logic Apps has to offer to build robust and reliable agents.