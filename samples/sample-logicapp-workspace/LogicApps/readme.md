# Local Settings Configuration

This document provides instructions on how to create and configure the `local.settings.json` file based on the `cloud.settings.json` template.

## Overview

The `local.settings.json` file contains configuration settings for local development of Azure Logic Apps Standard. This file should not be committed to source control as it may contain sensitive information and local-specific paths.

## Creating local.settings.json from cloud.settings.json

1. **Copy the template**: Make a copy of `cloud.settings.json` and rename it to `local.settings.json`

2. **Configure the required values**: Update the following settings in the `Values` section:

### Required Configuration

| Setting | Description | Example Value |
|---------|-------------|---------------|
| `ProjectDirectoryPath` | Absolute path to your Logic Apps project directory | `"c:\\logicapps-labs\\logicapps-labs\\samples\\sample-logicapp-workspace\\LogicApps"` |
| `WORKFLOWS_SUBSCRIPTION_ID` | Your Azure subscription ID (if connecting to Azure resources) | `"12345678-1234-1234-1234-123456789012"` |

### Pre-configured Values (Do Not Change)

The following values are already configured and should remain unchanged:

- `AzureWebJobsStorage`: Set to `"UseDevelopmentStorage=true"` for local development
- `FUNCTIONS_WORKER_RUNTIME`: Set to `"node"` for Logic Apps Standard
- `APP_KIND`: Set to `"workflowapp"` for Logic Apps Standard

## Sample Configuration

Your final `local.settings.json` should look like this:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "APP_KIND": "workflowapp",
    "ProjectDirectoryPath": "c:\\path\\to\\your\\LogicApps\\project",
    "WORKFLOWS_SUBSCRIPTION_ID": "your-azure-subscription-id"
  }
}
```

## Important Notes

- **Do not commit** `local.settings.json` to source control
- The `AzureWebJobsStorage` setting uses the storage emulator for local development
- Update the `ProjectDirectoryPath` to match your actual project location
- The `WORKFLOWS_SUBSCRIPTION_ID` is optional for local development but required if you plan to connect to Azure resources

## Troubleshooting

- Ensure the `ProjectDirectoryPath` uses double backslashes (`\\`) on Windows
- Verify that the Azure Storage Emulator is running when using `"UseDevelopmentStorage=true"`
- Make sure your Azure subscription ID is valid if you're connecting to Azure resources
