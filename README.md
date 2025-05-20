# EVECompanion API

## About

This project contains the API to provide the [EVECompanion iOS App](https://github.com/EVECompanion/EVECompanion) with database updates.

## Requirements

- Node.js 21

## Configuration

Configuration is done via Environment variables:

- `DATA_DIR` path to the directory which contains SDE files for the v1 API.
- `DATA_DIR_V2` path to the directory which contains SDE files for the v2 API.

### Optional Environment Variables

- `PORT` the port the API binds to, defaults to `8080`.

## Usage

1. Run `npm install`
2. Set the required environment variables.
3. Run `npm start`

## SDE Files

The files for the V1 and V2 APIs are in different formats. The files are placed in the respective directory and then automatically published via the API. However, the API will only publish files which adhere to the correct naming format. The naming format contains the version of the file. The app will suggest to the user to download a new database version if the available version number is greater than the installed version.

### V1 Format

V1 files are just the raw sqlite files. The naming format is `<version>.sqlite` where `<version>` is an integer.

### V2 Format

V2 files are zip files with the naming format `<version>.zip` where `<version>` is an integer. The zip files must contain just the sqlite file with the filename `EVE.sqlite`.

## Endpoints

### V1 API (`/v1/<endpoint>`)

Endpoint | Description | Example Response
-------- | -------- | --------
version  | Returns a JSON object with the current SDE version. Status Code 404 if no SDE files are available for V1.  | { "version": 11 }
sde  | Starts the download of the most recent SDE file. | 

### V2 API (`/v2/<endpoint>`)

Endpoint | Description | Example Response
-------- | -------- | --------
version  | Returns a JSON object with the current SDE version and its size. Status Code 404 if no SDE files are available for V2.  | { "version": 13, "size": 14186745 }
sde  | Starts the download of the most recent SDE file. | 