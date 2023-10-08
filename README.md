
# Purgedeps 
Purgedeps is a tool for analyzing the dependencies in a project to see: which dependencies are useless and you can  delete it from `package.json` .
## Installation
```bash
npm install -g  purgedeps
```
Or simply using npx which is a package runner bundled in npm:
```bash
 npx purgedeps
```
_Notice:_ purgedeps needs node.js >= 12.

## Syntax Support
Purgedeps supports the following syntax:
- JavaScript (ES5, ES6 and ES7)
- TypeScript
React jsx

## Usage
```bash
 npx purgedeps
```

to show all the  unused dependencies in the project 

```bash
 npx purgedeps --show
```

to show all the  unused dependencies in the project and delete it from `package.json` without 
verifying if there is any dependency that is used in the project

```bash
 npx purgedeps --all
```

for best practice, we recommend you to show all the unused dependencies in the project and verify if there is any dependency that is used in the project 

after verifying if there is a dependency that is used in the project, you can add it to the list of excludes packages :

for exemple if you have a package called `@mycompany/myapp` and you want to exclude it from the list of unused dependencies,
 you can use the `--exclude @mycompany/myapp` option:

```bash
 npx purgedeps --exclude @mycompany/myapp
```
if you have many packages, you can add them to the list of excludes packages :

```bash
 npx purgedeps --exclude @mycompany/myapp  @mycompany/myapp2
```
