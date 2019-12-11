# TOAST UI Doc

> TOAST UI Doc is a documentation generator used with TOAST UI products that allows you to create documentations for any JavaScript library easily. 

[![GitHub release](https://img.shields.io/github/v/release/nhn/toast-ui.doc?include_prereleases)](https://github.com/nhn/toast-ui.doc/releases/latest) [![npm](https://img.shields.io/npm/v/@toast-ui/doc)](https://www.npmjs.com/package/@toast-ui/doc) [![GitHub license](https://img.shields.io/github/license/nhn/toast-ui.doc.svg)](https://github.com/nhn/toast-ui.doc/blob/master/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/toast-ui.doc/pulls) [![code with hearth by NHN](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN-ff1414.svg)](https://github.com/nhn)

![toastui-doc](https://user-images.githubusercontent.com/18183560/63479557-bd9a7e00-c4c9-11e9-96d7-4a2cf694e1e7.png)

## 🚩 Table of Contents

* [What is TOAST UI Doc?](#-what-is-toast-ui-doc)
* [Main Features](#-main-features)
    * [API Page](#api-page)
    * [Examples Page](#examples-page)
    * [Search Feature](#search-feature)
    * [Permalink](#permalink)
    * [Customizable Layout Contents](#customizable-layout-contents)
    * [Simple Builds](#simple-builds)
* [Demo](#-demo)
* [Usage](#-usage)
    * [Install](#install)
    * [Adding Config Files](#adding-config-files)
    * [Setting Options in Config Files](#setting-options-in-config-files)
    * [Running the Command](#running-the-command)
* [Contributing](#-contributing)
* [License](#-license)

## 📑 What is TOAST UI Doc?

TOAST UI Doc is a documentation generator used with TOAST UI products, and is a module that creates a single documentation by combining the API document created by parsing the [JSDoc comments](https://jsdoc.app/) with the example page. TOAST UI Doc uses the [documentation.js](https://documentation.js.org) and [Gatsby](https://www.gatsbyjs.org). The layouts TOAST UI Doc is created with Gatsby to be a [React](https://reactjs.org/) component. Simply by configuring the options and running TOAST UI Doc, you can easily create documentations for any JavaScript library. 

## 🎨 Main Features

### API Page

TOAST UI Doc parses the JSDoc composed within the JavaScript file to create the API page. The API page can mainly be categorized into seven types, and is represented as a menu in the Local Navigation Bar (LNB). 

* MODULES
* EXTERNALS
* CLASSES
* NAMESPACES
* MIXINS
* TYPEDEF

Furthermore, each type has a submenu, and you can easily check the inheritance or mixin relationship, member (property, method) and other custom event API information.

* EXTENDS
* MIXES
* STATIC PROPERTIES
* STATIC METHODS
* INSTANCE METHODS
* EVENTS

### Examples Page

TOAST UI Doc reads the HTML file to directly create an Examples page. If you use appropriate selectors for each Example page, you can display HTML and JavaScript snippets within the page. The Try-it-yourself demos and each code snippet are provided as tabs. 

### Search Feature

You can use the search bar in the top portion of the local navigation bar (LNB) to search for any API and Example pages provided by TOAST UI Doc. TOAST UI Doc also comes with auto-complete feature to facilitate faster transversals between API and Examples pages for users. 

### Permalink

TOAST UI Doc provides a [Github Permalink](https://help.github.com/en/articles/getting-permanent-links-to-files) feature. The permalinks can be found at the top right of each API area, and links the location where the JSDoc file is to the Github repository. Permalinks can be useful when directly accessing the API codes and JSDoc contents for reference. 

### Customizable Layout Contents

TOAST UI Doc layouts can mainly be categorized in Header, Footer, LNB, Contents (Main, API, and Examples). You can use the config file to readily customize which content goes in Header and Footer areas. Furthermore, if necessary, you can configure whether or not to expose the Examples page. 

### Simple Builds

TOAST UI Doc comes with Gatsby built into it, so when the build takes place, Gatsby script runs automatically to compile documentation files into a folder. By uploading the created folder onto the [Github Pages](https://pages.github.com/) or onto a server, you can easily create your public API page. 

## 🐾 Demo

* https://nhn.github.io/toast-ui.doc/latest/

## 🔨 Usage

### Install

Use npm to install it globally. 

``` sh
$ npm install -g @toast-ui/doc
```

### Adding Config Files

Add your config files to the root of your working directory. The config file must be in the form of `tuidoc.config.json`. 

```
project/
├─ ...
├─ package.json
└─ tuidoc.config.json
```

### Setting Options in Config Files

The `tuidoc.config.json` file can be used to configure following options, and such options can be customized to create more approprite documents. For a full explanation on using options, refer to [here](https://github.com/nhn/toast-ui.doc/blob/master/tuidoc.config.json).


#### Configuring the Header Area

`[logo] / [text] [version]` can be exposed sequentially. 

| Option | Type | Description |
| --- | --- | --- |
| `header.logo.src` | `string` | Configures the path for the logo image source. |
| `header.logo.linkUrl` | `?string` | Embeds a URL link onto the logo image. The default is set to be the root (`/`).  |
| `header.title` | `object \| boolean` | Determines whether or not to display a text to the right of the logo. |
| `header.title.text` | `?string` | When displaying text, declares the value of the to be displayed text. The default is set to be the `name` value of the `package.json`.  |
| `header.title.linkUrl` | `?string` | When displaying text, configures a URL link onto the text. The default is set to be the `github` value of `package.json`. |
| `header.version` | `?boolean` | Determines whether or not to display the module version. The default is set to be `true`, and the `version` value of `package.json` will be displayed. |

#### Configuring the Footer Area

A list of product related links including company information can be displayed. 

| Option | Type | Description |
| --- | --- | --- |
| `footer[].title` | `string` | Configures the link text. |
| `footer[].linkUrl` | `string` | Configures the link URL. |

#### Configuring the Main Page

| Option | Type | Description |
| --- | --- | --- |
| `main.filePath` | `string` | Configures the file path to be displayed on the main page, and the file must be a markdown (`*.md`) file. The default is set to be the `README.md` file found in the project folder.  |


#### Configuring the API Page

| Option | Type | Description |
| --- | --- | --- |
| `api.filePath` | `string \| array` | Configures the file path to be displayed on the API page (the file to be parsed using JSDoc). When declaring the path to be the entire folder, declare it as a `string`, and for individual files, use an `array`. Only JavaScript files (`*.js`) can be parsed.  |
| `api.permalink` | `object \| boolean` | Determines whether or not to use permalinks. If set to `false`, permalinks are hidden. |
| `api.permalink.repository` | `?string` | If using permalinks, configures the Github repository URL. The default is set to be the `github` value of `package.json`.  |
| `api.permalink.ref` | `?string` | If using permalinks, configures the branch or the tag. This option can be used to declare the hash value of a specific commit. The default value is set to be `v{SemVer}`. |

#### Configuring the Examples Page

| Option | Type | Description |
| --- | --- | --- |
| `examples` | `object \| boolean` | Configures options to use the Examples page. If set to `false`, the Examples tab is hidden from the local navigation bar. |
| `examples.filePath` | `string` | Configures the file path to be displayed on the Examples page. Declare the folder with example files in `string` format. |
| `examples.titles` | `object` | Maps each example file to the menu name to be displayed on the local navigation bar. The configuration should be made in `{ [Example File Name]: [LNB Menu Name]}` format. |

#### Others

| Option | Type | Description |
| --- | --- | --- |
| `pathPrefix` | `string` | Only used when the created documentation file exists at a location that is not the root of the Github repository or the server, and is used to declare the specific path. If not configured, the documentation may be prone to link reference error due to the lack of the resource file. |

### Configuring the Files for Examples Page

In order to display the tabular content in the Examples page, additional configuration is necessary besides managing the options. The page that is finally displayed on the Result tab is the file that has been configured using the `examples` option, and has to be of HTML format. The code snippets found in JavaScript tab and HTML tab must be declared to be `code-js` and `code-html` class, respectively. For the basic template, see [here](https://github.com/nhn/toast-ui.doc/blob/master/demo/examples/example01-default-template.html).

```html
...
<div class="code-html">
  <div id="wrapper"></div>
</div>
...
<script type="text/javascript" class="code-js">
  alert('Hello!');
</script>
...
```

### Running the Command

TOAST UI Doc provides a `tuidoc` CLI, and running the following command will allow you to build your documentation based on the environment settings that you have configured above. First, the Gatsby, wrapped by TOAST UI Doc, is executed, and the `--serv` flag can be used to preview the created documentation on your local machine. 

``` sh
$ tuidoc --serv
```

When you are done verifying the local product, running `tuidoc` command will create two folders, `_latest` and `_[SemVer]`, under the project root directory. These folders can be used to upload to a server. 

``` sh
$ tuidoc
```

Or, you can add the commands as scripts to the project's `package.json` file. 

``` json
{
  "scripts" : {
    "doc:serve" : "tuidoc --serv",
    "doc" : "tuidoc"
  }
}
```


## 🔧 Making a Pull Request

All TOAST UI products are open source. A Pull Request (PR) can be made upon fixing an issue or developing additional features to be implemented. 

### Install

To install, first fork the `master` branch to your own personal repository. Then, clone the forked repository to your local machine, and install the following node module. Prior to development, first, make sure that the modules are properly installed. 

```sh
$ git clone https://github.com/{your-personal-repo}/toast-ui.doc.git
$ cd toast-ui.doc
$ npm install
$ npm run test
```

### Development

Use your local machine for the development process. During the development process, you can use two types of `tuidoc` scripts, and you can determine which script to use according to your situation.

#### Running the Dev Server

When the script is run, Gatsby initiates a webpack dev server. You can preview the changes you have made to any react components under `src` folder in realtime. You can connect to the dev server by going to `localhost:8000`.

```sh
$ npm run tuidoc:dev
```

#### Checking the Build Status

When the script is run, Gatsby begins the build as well as the server so that you can check that the created documentation performs properly. In order to check the status of the documentation before distribution, connect to `localhost:9000`. 

```sh
$ npm run tuidoc:serve
```

### Pull Request

Finally, perform a final check in order to make sure that there are no problems with your before making a pull request. If none are found, commit, and push it to the repository. 

For more detailed explanation on making a PR, refer to the **Contributing** appendix below. 

## 💬 Contributing

* [Code of Conduct](https://github.com/nhn/toast-ui.doc/blob/master/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/nhn/toast-ui.doc/blob/master/CONTRIBUTING.md)
* [Issue guideline](https://github.com/nhn/toast-ui.doc/tree/master/.github/ISSUE_TEMPLATE)
* [Commit convention](https://github.com/nhn/toast-ui.doc/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)


## 📜 License

This software is provided under [MIT License](https://github.com/nhn/toast-ui.doc/blob/master/LICENSE). © [NHN](https://github.com/nhn).