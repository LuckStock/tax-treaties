# DataHub Microservice

> Author: [Shota Megrelishvili](shota@luckstock.com) & [Beka Tomashvili](beka@luckstock.com) 3/28/2017 for LuckStock.com - Royalty-free Marketplace

Easily get Tax Treaty article and Tax Withholding for Royalties (audio) between US and foreign countries.
Includes  additional features like List of Countries with ISO and FIPS codes, US & Canada States. 

## Usage

1. Get all Tax Treaties between US and Foreign Countries:
`/v1/datahub/get_all_taxes`
> Note: `withholding_tax_rate` is the percentage value, so 0.05 = 5%
  
2. Get Tax Treaty with specific country by 2-letter countryCode:
`/v1/datahub/tax/:countryCode`
> Example: `/v1/datahub/tax/ES`

## Additional Functionality

3. Get the list of Countries with ISO Alpha 3, FIPS and currency codes:
`/v1/datahub/countries`

4. Filtering Countries:
By countryName: `/v1/datahub/countries/filter?name=Spain`
By countryCode: `/v1/datahub/countries/filter?code=ES`
By isoAlpha3:   `/v1/datahub/countries/filter?isoAlpha3=ESP`

5. Get all US states:
`/v1/datahub/states`

6. Filter US state:
By stateName: `/v1/datahub/states/filter?name=Alaska`
By stateCode: `/v1/datahub/states/filter?code=AK`

7. Get all Canada states:
`/v1/datahub/canada_states`

8. Ping the service:
`/v1/datahub/ping`

### Installation

> Runs the microservice on Port 3000
> To change the current port, edit `./server/config/config.json` file

- To build on Production environment run:
`npm run build`
`npm start`

- To build on Development environment run:
`npm run build-dev`
`npm run watch` (starts nodemon and watches for changes)
`npm run dev` (starts nodemon, watches for changes and turns on Debug for current app)

### Prerequisites/Dependencies

- NPM (to run npm deploy, otherwise you'll need to `cd deploy && make deploy`)
- Tested on Node v7.7.3 & npm v4.1.2 but should work fine with node v4+, npm v3+ 

### License

[MIT](https://opensource.org/licenses/mit-license)
