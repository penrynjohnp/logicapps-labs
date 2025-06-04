# Local Development Setup

This guide provides step-by-step instructions for setting up local development environment for this Logic Apps Standard project.

## Overview

The `local.settings.json` file contains configuration settings required for local development. This file should **never** be committed to source control as it contains sensitive connection strings and local-specific paths.

## Quick Setup Steps

### 1. Create local.settings.json
```bash
# Navigate to the LogicApps folder
cd LogicApps

# Copy the template file
copy cloud.settings.json local.settings.json
```

### 2. Configure Required Settings

Update the following values in your `local.settings.json` file:

| Setting Key | Description | Where to Find | Example |
|-------------|-------------|---------------|---------|
| `ProjectDirectoryPath` | Local path to LogicApps folder | Your local file system | `C:\\projects\\ai-loan-agent\\LogicApps` |
| `WORKFLOWS_SUBSCRIPTION_ID` | Azure subscription ID | Azure Portal → Subscriptions | `12345678-1234-1234-1234-123456789012` |
| `WORKFLOWS_LOCATION_NAME` | Azure region for deployment | Azure Portal → Resource location | `westus3` |
| `WORKFLOWS_RESOURCE_GROUP_NAME` | Target resource group | Azure Portal → Resource groups | `MyLogicAppsRG` |
| `agent_Subscription_ID` | Azure OpenAI subscription | Azure Portal → OpenAI resource | `12345678-1234-1234-1234-123456789012` |
| `agent_Resource_Group` | Azure OpenAI resource group | Azure Portal → OpenAI resource | `MyOpenAIRG` |
| `agent_Account` | Azure OpenAI account name | Azure Portal → OpenAI resource | `myopenai-account` |
| `agent_openAIEndpoint` | Azure OpenAI endpoint URL | Azure Portal → OpenAI Keys and Endpoint | `https://myopenai.openai.azure.com/` |
| `agent_openAIKey` | Azure OpenAI access key | Azure Portal → OpenAI Keys and Endpoint | `abc123...` |
| `sql_connectionString` | SQL Database connection | Azure Portal → SQL Database → Connection strings | `Server=tcp:...` |
| `apiManagementOperation_*_SubscriptionKey` | API Management keys | Azure Portal → API Management → Subscriptions | `abc123...` |

### 3. Pre-configured Values (Do Not Modify)

These values are already set correctly and should remain unchanged:
- `AzureWebJobsStorage`: `"UseDevelopmentStorage=true"`
- `APP_KIND`: `"workflowApp"`
- `FUNCTIONS_WORKER_RUNTIME`: `"dotnet"`
- `FUNCTIONS_INPROC_NET8_ENABLED`: `"1"`

## Detailed Configuration Guide

### Azure OpenAI Configuration

1. Navigate to Azure Portal → Azure OpenAI Service
2. Select your OpenAI resource
3. Go to "Keys and Endpoint" section
4. Copy the endpoint URL and access key
5. Ensure you have a GPT-4 deployment named "gpt-4.1"

### SQL Database Configuration

1. Navigate to Azure Portal → SQL databases
2. Select your database
3. Go to "Connection strings" section
4. Copy the ADO.NET connection string
5. Replace `{your_password}` with your actual password

### API Management Configuration

1. Navigate to Azure Portal → API Management
2. Go to "Subscriptions" section
3. Copy the subscription keys for each API operation
4. Ensure the following APIs are configured:
   - Risk Assessment API (`olympia-risk-assessment`)
   - Employment Validation API (`litware-employment-validation`)
   - Credit Check API (`cronus-credit`)
   - Demographic Verification API (`northwind-demographic-verification`)

### Microsoft 365 Connections

Connection runtime URLs and keys will be automatically generated when you:
1. Create connections in the Logic Apps Designer
2. Authenticate with your Microsoft 365 account
3. Save the workflow

### Connection String Format Examples

**SQL Server:**
```
Server=tcp:[servername].database.windows.net,1433;Initial Catalog=[database];User ID=[username];Password=[password];Encrypt=True;
```

**Azure OpenAI:**
```
Endpoint: https://[account-name].openai.azure.com/
Key: [your-32-character-key]
```

## Sample Configuration

Your completed `local.settings.json` should look similar to this:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "APP_KIND": "workflowApp",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "FUNCTIONS_INPROC_NET8_ENABLED": "1",
    "ProjectDirectoryPath": "C:\\\\projects\\\\ai-loan-agent\\\\LogicApps",
    "WORKFLOWS_SUBSCRIPTION_ID": "12345678-1234-1234-1234-123456789012",
    "WORKFLOWS_LOCATION_NAME": "westus3",
    "WORKFLOWS_RESOURCE_GROUP_NAME": "MyLogicAppsRG",
    "agent_openAIEndpoint": "https://myopenai.openai.azure.com/",
    "agent_openAIKey": "your-openai-key-here",
    "sql_connectionString": "Server=tcp:myserver.database.windows.net,1433;Initial Catalog=MyDB;User ID=myuser;Password=mypassword;Encrypt=True;",
    "apiManagementOperation_SubscriptionKey": "risk-assessment-key",
    "apiManagementOperation_11_SubscriptionKey": "employment-validation-key",
    "apiManagementOperation_12_SubscriptionKey": "credit-check-key",
    "apiManagementOperation_13_SubscriptionKey": "demographic-verification-key"
  }
}
```

## Verification Steps

1. **Test Local Run**: Use VS Code Azure Logic Apps extension to start the local runtime
2. **Check Connections**: Verify all connections are working in the Logic Apps Designer
3. **Test Workflows**: Run a simple test of each workflow to ensure proper configuration

## Important Security Notes

- ⚠️ **Never commit `local.settings.json` to source control**
- 🔐 **Use proper Azure RBAC permissions instead of connection strings when possible**
- 🔄 **Rotate keys regularly and update local settings accordingly**

## Troubleshooting

### Common Issues

**File Path Issues (Windows):**
- Ensure paths use double backslashes (`\\\\`) or forward slashes (`/`)
- Example: `C:\\\\projects\\\\myapp` or `C:/projects/myapp`

**Connection Failures:**
- Verify connection strings are complete and unmodified
- Check firewall settings for local development
- Ensure Azure resources allow access from your IP

**Runtime Issues:**
- Verify .NET and Azure Functions Core Tools are installed
- Check VS Code Azure Logic Apps extension is up to date
- Review terminal output for specific error messages

### Getting Help

- Check Azure Logic Apps runtime logs in VS Code terminal
- Review connection test results in Logic Apps Designer
- Monitor Azure resource health in Azure Portal
- Use Azure Application Insights for detailed telemetry
