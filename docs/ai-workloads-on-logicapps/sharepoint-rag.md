---
sidebar_position: 3
title: Sharepoint RAG with LogicApps
sidebar_label: "Sharepoint RAG with LogicApps"
description: "Enabling SharePoint RAG with LogicApps Workflows"
image: https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00Mzg2MjM1LXFicEdhSA?revision=5&image-dimensions=2000x2000&constrain-image=true
keywords: [rag, ai search, logic apps, azure, indexing, azure search]
authors:
 - "Mahesh"
contacts:
 - "MaheshMSFT"
---

 **Authors:**
[Mahesh - Microsoft](https://techcommunity.microsoft.com/users/maheshmsft/1354594)

## High-level architecture
![Sharepoint RAG demo architecture](https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00Mzg2MjM1LXFicEdhSA?revision=5&image-dimensions=2000x2000&constrain-image=true)

## Introduction

SharePoint Online is quite popular for storing organizational documents. Many organizations use it due to its robust features for document management, collaboration, and integration with other Microsoft 365 services. SharePoint Online provides a secure, centralized location for storing documents, making it easier for everyone from organization to access and collaborate on files from the device of their choice. Retrieve-Augment-Generate (RAG) is a process used to infuse the large language model with organizational knowledge without explicitly fine tuning it which is a laborious process. RAG enhances the capabilities of language models by integrating them with external data sources, such as SharePoint documents. In this approach, documents stored in SharePoint are first converted into smaller text chunks and vector embeddings of the chunks, then saved into index store such as Azure AI Search. Embeddings are numerical representations capturing the semantic properties of the text. When a user submits a text query, the system retrieves relevant document chunks from the index based on best matching text and text embeddings. These retrieved document chunks are then used to augment the query, providing additional context and information to the large language model. Finally, the augmented query is processed by the language model to generate a more accurate and contextually relevant response. Azure AI Search provides a built-in connector for SharePoint Online, enabling document ingestion via a pull approach, currently in public preview. _This blog post outlines a LogicApps workflow-based method to export documents, along with associated ACLs and metadata, from SharePoint to Azure Storage. Once in Azure Storage, these documents can be indexed using the Azure AI Search indexer._

At a high level, two workflow groups (**historic** and **ongoing**) are created, but only one should be active at a time. The historic flow manages the export of all documents from SharePoint Online to initially populate the Azure AI Search index from Azure Storage where documents are exported to. This flow processes documents from a specified start date to the current date, incrementally considering documents created within a configurable time window before moving to the next time slice. The sliding time window approach ensures compliance with SharePoint throttling limits by preventing the export of all documents at once. This method enables a gradual and controlled document export process by targeting documents created in a specific time window.

Once the historical document export is complete, the ongoing export workflow should be activated (historic flow should be deactivated). This workflow exports documents from the timestamp when the historical export concluded up to the current date and time. The ongoing export workflow also accounts for documents created or modified since the last load and handles scenarios where documents are renamed at the source. Both workflows save the last exported timestamp in Azure Storage and use it as a starting point for every run.

:::info
To learn more, you can ask your favorite AI companion these questions:
- What are the benefits of using Sharepoint inside a company?
- How can LLMs benefit from RAG with external data sources like sharepoint documents?
- How can LogicApps workflows scale out based on the amount of data sizes?
:::


## Historic document export flow

![Image 6](https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00Mzg2MjM1LVZPT2g1RQ?image-dimensions=750x750&revision=5)

**Parent flow**

*   Recurs at every N hours. This is a configurable value. Usually export of historic documents requires many runs depending upon the total count of documents which could range from thousands to millions.
*   Sets initial values for the sliding window variables -  from\_date\_time\_UTC, to\_date\_time\_UTC
*   from\_date\_time\_UTC is read from the blob-history.txt file
*   The to\_date\_time\_UTC is set to from\_date\_time\_UTC plus the increment days. If this increment results in a date greater than the current datetime, to\_date\_time\_UTC is set to the current datetime
*   Get the list of all SharePoint lists and Libraries using the built-in action
*   Initialize the additional variables - files\_to\_process, files\_to\_process\_temp, files\_to\_process\_chunks  
    Later, these variables facilitate the grouping of documents into smaller lists, with each group being passed to the child flow to enable scaling with parallel execution
*   Loop through list of SharePoint Document libraries and lists
    *   Focus only on Document library, ignore SharePoint list (Handle SharePoint list processing only if your specific use case requires it)
    *   Get the files within the document library and file properties where file creation timestamp falls between from\_date\_time\_UTC and to\_date\_time\_UTC
    *   Created JSON to capture the Document library name and id (this will be required in the child flow to export a document)
    *   Use Javascript to only retain the documents and ignore folders. The files and their properties also have folders as a separate item which we do not require.
    *   Append the list of files to the variable
*   Use the built-in chunk function to create list of lists, each containing the document as an item
*   Invoke child workflow and pass each sub-list of files
*   Wait for all child flows to finish successfully and then write the to\_date\_time\_UTC to the blob-history.txt file

**Child flow**

*   Loop through each item which is document metadata received from the parent flow
    *   Get the content of file and save into Azure Storage
    *   Run SharePoint /roleassignments API to get the ACL (Access Control List) information, basically the users and groups that have access to the document
        *   Run Javascript to keep roles of interest
        *   Save the filtered ACL into Azure Storage
    *   Save the document metadata which is document title, created / modified timestamps, creator, etc. into Azure Storage
    *   All the information is saved into Azure Storage which offers flexibility to leverage the parts based on use case requirements
    *   All document metadata is also saved into an Azure SQL Database table for the purpose of determining if the file being processed was modified (exists in the database table) or renamed (file names do not match)
*   Return Status 200 indicating the child flow has successfully completed

**Ongoing data export flow**

![Image 7](https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00Mzg2MjM1LWZkZVVVNg?image-dimensions=750x750&revision=5)

**Parent flow**

*   The ongoing parent flow is very similar to the historic flow, it’s just that Get the files within the document library action gets the files that have creation timestamp or modified timestamp between from_date_time_UTC and to_date_time_UTC. This change allows to handle files that get created or modified in SharePoint after last run of the ongoing workflow.
*   Note: Remember, you need to disable the historic flow after all history load has been completed. The ongoing flow can be enabled after the historic flow is disabled.

**Child flow**

*   The ongoing child flow also follows similar pattern of the historic child flow. Notable differences are –
*   Handling of document rename at source which deletes the previously exported file / metadata / ACL from Azure Storage and recreates these artefacts with new file name.
*   Return Status 200 indicating the child flow has successfully completed

_Both flows have been divided into parent-child flows, enabling the export process to scale by running multiple document exports simultaneously. To manage or scale this process, adjust the concurrency settings within LogicApps actions and the App scale-out settings under the LogicApps service. These adjustments help ensure compliance with SharePoint throttling limits._ The presented solution works with single site out of the box and can be updated to work with a list of sites.

![Image 8](https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00Mzg2MjM1LTEzcnMybQ?image-dimensions=750x750&revision=5)

**Workflow parameters**

| Parameter Name                   | Type   | Example Value                                   |
|----------------------------------|--------|-------------------------------------------------|
| sharepoint_site_address          | String | https://XXXXX.sharepoint.com/teams/test-sp-site |
| blob_container_name              | String | sharepoint-export                               |
| blob_container_name_acl          | String | sharepoint-acl                                  |
| blob_container_name_metadata     | String | sharepoint-metadata                             |
| blob_load_history_container_name | String | load-history                                    |
| blob_load_history_file_name      | String | blob-history.txt                                |
| file_group_count                 | Int    | 40                                              |
| increment_by_days                | int    | 7                                               |

The workflows can be imported into from GitHub repository below.

**Github repo:** [SharePoint-to-Azure-Storage-for-AI-Search LogicApps workflows](https://github.com/MaheshSQL/SharePoint-to-Azure-Storage-for-AI-Search)



:::tip[Congratulations!]

Congratulations on finshing this Lab on enabling Sharepoint RAG with Logic Apps workflows and Azure OpenAI! Here are the main conclusions from this Lab:

- The method enhances language models by integrating them with external data sources like SharePoint documents, improving document management and collaboration.

- This lab outlines LogicApps workflows to export documents from SharePoint to Azure Storage, enabling indexing with Azure AI Search. It includes historic and ongoing workflows to manage document exports.
  
- The workflows use parent-child flows for scalability, configurable parameters, and can be updated to work with multiple sites. The solution is designed to handle document renaming and incremental exports.


**Well done on exploring these advanced features and capabilities! This knowledge will undoubtedly enhance your ability to manage and index unstructured data effectively. Keep up the great work!**

:::

---