---
title: 07 - Add knowledge to your agent
description: Learn how to add custom knowledge to your Azure Logic Apps workflows and agents.
ms.service: azure-logic-apps
author: brbenn
ms.author: brbenn
ms.topic: tutorial
ms.date: 08/27/2025
---

This module explains how to add custom knowledge to your Azure Logic Apps workflows and agents using RAG ingestion and retrieval.

When finished with this module, you'll have gain the following knowledge:

- **RAG Architecture Understanding**: How to implement the two-phase RAG pattern in Logic Apps, including data ingestion/indexing and conversational retrieval/response generation
- **Enterprise Data Integration**: How to leverage Logic Apps' 1,400+ connectors to ingest and process knowledge from diverse sources including documents, databases, APIs, and enterprise systems
- **Azure AI Search Implementation**: How to use Azure AI Search for enterprise-grade semantic search, vector search, and hybrid search capabilities to enhance agent responses
- **Knowledge Base Creation**: How to transform unstructured documents into searchable, embedded knowledge bases that enable contextual and accurate agent responses
- **End-to-End RAG Workflows**: How to build complete RAG solutions that automatically update agent knowledge as data sources change, ensuring agents stay current and relevant

## The Power of RAG in AI Applications

Retrieval-Augmented Generation (RAG) represents a transformative approach to building intelligent conversational agents that can access and leverage external knowledge sources in real-time. By combining the generative capabilities of Large Language Models (LLMs) with dynamic information retrieval, RAG enables AI applications to provide accurate, contextual, and up-to-date responses that go far beyond the limitations of pre-trained model knowledge.

### RAG in Logic Apps: Bridging AI and Enterprise Data

Logic Apps provides multiple pathways to implement RAG patterns, from simple data composition to sophisticated AI Search integrations. This module explores various approaches to enriching your conversational agents with organizational knowledge, enabling them to become truly intelligent assistants that understand your business context.

## Implementation Approach

RAG implementation in Azure Logic Apps follows a two-phase architecture that transforms your enterprise data into intelligent, conversational experiences:

### Phase 1: Data Ingestion and Indexing
In this foundational phase, Logic Apps orchestrates the process of bringing your data into the AI ecosystem. Your documents, databases, and content sources are processed through Logic Apps workflows that:
- **Parse and extract** text content from various file formats (PDFs, Word docs, web pages, etc.)
- **Transform and chunk** the data into manageable segments for optimal retrieval
- **Generate embeddings** using AI models to create vector representations of your content
- **Index the embeddings** in specialized data stores like Azure AI Search, Azure Cosmos DB, or vector databases

### Phase 2: Conversational Retrieval and Response Generation
When users interact with your agent, Logic Apps handles the intelligent retrieval and response process:
- **Process user questions** by converting them into embedding vectors using the same AI models
- **Search the knowledge base** to find the most semantically similar content to the user's query
- **Retrieve relevant context** from the indexed data store based on similarity scores
- **Combine retrieved information** with the user's question and send to the LLM
- **Generate contextual responses** that are grounded in your organizational knowledge

This two-phase approach ensures that your conversational agents can access and reason about your specific data while maintaining the natural language capabilities of modern LLMs.

Azure Logic Apps provides a comprehensive suite of document processing and transformation actions that enable seamless data ingestion from diverse sources and document formats.

![Image showing AI Operations and Data Operations action groups.](../02_build_conversational_agents/media/07-add-knowledge-to-agent/action_list.png)

## Document Ingestion for Gen AI Applications

With over 1,400 enterprise connectors, Logic Apps provides unparalleled access to a wide range of systems, applications, and databases, making it easier than ever to create powerful generative AI applications. By leveraging connectors like Azure OpenAI and Azure AI Search, businesses can seamlessly implement the Retrieval-Augmented Generation (RAG) pattern, allowing the ingestion and retrieval of data from multiple sources with ease.

[Document Ingestion for Gen AI Applications using Logic Apps from 1000+ data sources!](https://techcommunity.microsoft.com/blog/integrationsonazureblog/document-ingestion-for-gen-ai-applications-using-logic-apps-from-1000-data-sourc/4250675)

## Advanced RAG using Azure AI Search

![Azure AI Search workflow](../02_build_conversational_agents/media/07-add-knowledge-to-agent/ai_search.png)

Azure AI Search provides enterprise-grade search capabilities that enable sophisticated RAG implementations by indexing and retrieving relevant content from large document collections. It supports semantic search, vector search, and hybrid search approaches, allowing your conversational agents to find the most contextually relevant information from unstructured documents, PDFs, web pages, and structured data sources. With built-in AI enrichment capabilities, Azure AI Search can extract entities, key phrases, and semantic meaning from documents during indexing, creating a rich knowledge base that enhances the quality and precision of your agent's responses.



[Automate RAG Indexing: Azure Logic Apps & AI Search for Source Document Processing](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/automate-rag-indexing-azure-logic-apps--ai-search-for-source-document-processing/4266083)
