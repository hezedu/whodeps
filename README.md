# check-hinted
Check who depends on the security alert package.
## Install
`npm install whodeps -g`;

## Usage
`whodeps pkgname`
Show all depends of pkgname's root dependencies.

`whodeps pkgname <max version>`
Give the max version. will only show the less than the version's root dependencies.

## Example
`whodeps kind-of`

output: 
```
sass-loader@7.3.1 (2) max depths: 3
  >clone-deep > kind-of6.0.3
  >clone-deep > shallow-clone > kind-of6.0.3

webpack-dev-server@3.10.3 (8) max depths: 8
  >http-proxy-middleware > micromatch > kind-of6.0.3
  >http-proxy-middleware > micromatch > snapdragon > base > cache-base > has-value > has-values > kind-of4.0.0
  >http-proxy-middleware > micromatch > extglob > expand-brackets > define-property > is-descriptor > kind-of3.2.2
  >http-proxy-middleware > micromatch > snapdragon > base > class-utils > static-extend > object-copy > kind-of6.0.3
  >http-proxy-middleware > micromatch > snapdragon > define-property > is-descriptor > kind-of5.1.0
  >chokidar > braces > snapdragon-node > snapdragon-util > kind-of6.0.3
  >http-proxy-middleware > micromatch > nanomatch > define-property > is-descriptor > kind-of6.0.3
  >http-proxy-middleware > micromatch > nanomatch > kind-of6.0.3

webpack-cli@3.3.11 (1) max depths: 3
  >global-modules > global-prefix > kind-of6.0.3
```

`whodeps kind-of 6`

output: 
```
webpack-dev-server@3.10.3 (3) max depths: 8
  > http-proxy-middleware > micromatch > snapdragon > base > cache-base > has-value > has-values > kind-of@4.0.0
  > http-proxy-middleware > micromatch > extglob > expand-brackets > define-property > is-descriptor > kind-of@3.2.2
  > http-proxy-middleware > micromatch > snapdragon > define-property > is-descriptor > kind-of@5.1.0
```
