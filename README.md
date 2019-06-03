# DataTab

## Overview
A friendly and easy to configure and integrate interface for managing SQL databases.
<p align="center">
<img src="https://raw.githubusercontent.com/vassilas/DataTab/master/doc/img/select.png" width="500" >
</p>

### INSTALLATION
#### Dependencies
- NodeJS
- Electron
- Tabulator
- Ace editor

#### Install
```sh
$ git clone https://github.com/vassilas/DataTab.git
$ npm install
$ npm install electron@latest 
```

#### RUN
```sh
$ npm start
```

#### Package
```sh
$ electron-packager ./ charges --platform=win32 --arch=x64 --electronVersion=5.0.2 --overwrite
```