---
sidebar_position: 1
title: Contribution guide
sidebar_label: "Contribution guide"
description: How to contribute to Azure Logic Apps Labs
image: aka.ms/logicapps/labs/contributing/assets/acns-pets-app.png
keywords: [contribution, issues, collaborate, new lab, proposal]
authors:
 - "Wagner Silveira"
contacts:
 - "https://www.linkedin.com/in/wagnersilveira/"
---

## Contribute to Azure Logic Apps Labs

:::info
This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.
:::

When you submit a pull request, a CLA bot automatically determines whether you need to provide a CLA and decorate the PR appropriately, for example, status check, comment. Follow the instructions provided by the bot. You only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Submit a new lab or fixes to an existing lab

Whenever you are submit any changes to Azure Logic Apps Labs, follow these recommendations:

- Always fork repository to your own account for applying modifications.
- If you are proposing a new lab, use our [template](template.md) as a baseline. Always remember to add the authors/companies/links to your new lab.
- Keep each PR on the scope of a single lab  when possible. For each new proposed lab, we expect a single PR unless the labs are related.
- If you are submitting a typo or documentation fix, you can combine modifications into a single PR where suitable.

## File issues and get help  

This project uses GitHub Issues to track bugs and feature requests. Before you file new issues, search the existing issues to avoid duplicates.  For new issues, file your bug or feature request as a new issue.

The repo contains two templates for the following requests:

- [Bug report](https://github.com/Azure-Samples/logicapps-labs/issues/new?template=bug_report.md)
- [New feature request](https://github.com/Azure-Samples/logicapps-labs/issues/new?template=feature_request.md) 

## Test your changes with GitHub Codespaces

This repo includes a GitHub Codespace dev container, which is based on Ubuntu 24.10 and contains all the libraries and components to locally run GitHub pages in GitHub Codespaces (Node 22, NPM 10.9).

To test your changes, locally complete the following tasks:

1. Enable [GitHub Codespaces](https://github.com/features/codespaces) for your account.
2. Fork this repo.
3. Open the repo in GitHub Codespaces.
4. Wait for the container to build, and then connect to the container.
5. Learn the repo folder structure:

   - "docs" folder: Contains all the Markdown documentation files for all the challenges.
   - "assets" folder: Contains all the images, slides, and files used in the lab.

6. Understand the index, title, and child metadata used by [docusaurus](https://docusaurus.io/).
7. Run the website in GitHub Codespaces:

   1. Open a new terminal.
   2. Run the command: `npm run start`.
