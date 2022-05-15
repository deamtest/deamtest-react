# # deamtest-react

> A Deamtest component for React

## Installation

```bash
npm install deamtest-react --save
```

## Usage

``` react
import Deamtest from '../deamtest-react';

const deamAppId = process.env.DEAM_APPID
const deamApiKey = process.env.DEAM_APIKEY

export default () => {
  const onVerify = token => console.log(token);
  return (<Deamtest lang="" appId={deamAppId} apiKey={deamApiKey} onVerify={onVerify} />)
};
```

## Properties

``` javascript
  lang:         PropTypes.string,
  appId:        PropTypes.string.isRequired,
  apiKey:       PropTypes.string.isRequired,
  onVerify:     PropTypes.func.isRequired,
```

## License

MIT
