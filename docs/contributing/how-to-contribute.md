---
sidebar_position: 1
title: Contribution Guide
sidebar_label: "Contribution Guide"
description: How to contribute to Logic Apps Labs
image: aka.ms/logicapps/labs/contributing/assets/acns-pets-app.png
keywords: [contribution, issues, collaborate, new lab, proposal]
authors:
 - "Fernando Mejia"
contacts:
 - "https://www.linkedin.com/in/feranto/"
---


## Contributing

:::info
This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.
:::


When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Submit a new Lab/ Submit fixes to an existing Lab

Whenever you are submitting any changes to Logic Apps Labs, please follow these recommendations:

- Always fork repository to your own account for applying modifications
- If you are proposing a new Lab, please use our [template](template.md) as a baseline. Always remember to add the authors/companies/links to your new Lab.
- Keep each PR on the scope of a single Lab, when possible. For each new Lab proposed we expect a single PR, unless the Labs are related.
- If you are submitting typo or documentation fix, you can combine modifications to single PR where suitable


## How to file issues and get help  

This project uses GitHub Issues to track bugs and feature requests. Please search the existing 
issues before filing new issues to avoid duplicates.  For new issues, file your bug or 
feature request as a new Issue.



# Inner loop, testing your changes using Github Codespaces

This repo has a github codespace dev container defined, this container is based on ubuntu 24.10 and contains all the libraries and components to run github pages locally in Github Codespaces(Node 22, NPM 10.9). To test your changes locally do the following:

- Enable [Github codespaces](https://github.com/features/codespaces) for your account
- Fork this repo
- Open the repo in github codespaces
- Wait for the container to build and connect to it
- Understand the folder structure of the Repo:
    - "docs" folder , contains all the mark down documentation files for all the challenges
    - "assets" folder, contains all the images, slides, and files used in the lab
- Understand the index, title, and child metadata used by [docusaurus](https://docusaurus.io/) 
- Run the website in github codespaces:
    - open a new terminal 
    - run ``` npm run start ```