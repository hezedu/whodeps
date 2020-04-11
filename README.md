# Whodeps
Check who depends on the security vulnerability package.

## Install
`npm install whodeps -g`
## Required
Cd you project directory, you project must have `package.json`, `package-lock.json`.
## Usage
`whodeps pkgname`

Show all depends of pkgname's root dependencies.

`whodeps pkgname <max version>`

Give the max version. will only show the less than the version's root dependencies.

## Example
`whodeps kind-of 6.0.0`

<img src="https://hezedu.github.io/SomethingBoring/static/whodeps-demo.gif">




