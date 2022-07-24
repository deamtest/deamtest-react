# # deamtest-react

> A Deamtest component for React

## Installation

```bash
npm install deamtest-react --save
```

## Usage

### frontend (ReactJS)
``` js
import Deamtest from 'deamtest-react';

const deamAppId = '**********';
const deamApiKey = 'deamtest-*******************************************';

export default () => {
  const onVerify = token => console.log(token);
  return (
    <Deamtest lang="en-US" appId={deamAppId} apiKey={deamApiKey} onVerify={onVerify} />
  )
};
```

### backend (NodeJs)
``` js
import * as express from 'express';
import axios from 'axios';
import * as crypto from 'crypto';

const deamApiUrl    = 'https://api.deamtest.com';
const deamAppId     = '**********';
const deamApiKey    = 'deamtest-*******************************************';
const deamApiSecret = '******************'

const verifyCaptcha = async (captchaToken: string) => {
  try {
    const src = new TextEncoder().encode(deamApiSecret.slice(0,16));
    const iv = Buffer.from(src.buffer, src.byteOffset, src.byteLength);
    let buf = deamApiKey.slice(9).split('').map((c) => {
      switch (c) { 
        case '-': return '+'; 
        case '_': return '/'; 
        default: return c;
      }
    }).join('');
    const key = crypto.createSecretKey(Buffer.from(buf, 'base64'));
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const data = Buffer.concat([
      cipher.update(new TextEncoder().encode(captchaToken)), cipher.final()
    ]).toString('base64');

    const response = await axios.post(deamApiUrl, {
      jsonrpc:  "2.0", 
      id:       Math.round(Math.random() * 1e6), 
      method:   'deam-verify', 
      params:   [deamAppId, data]
    });
    if (response.data.error) return response.data.error;
    if (response.data.result) return response.data.result;
  } catch (error) {
    console.log(error);
  }
}

const router = express.Router();

router.post("/",async (req: express.Request, res: express.Response) => {
  const {captcha} = req.body as {captcha: string};
  const captchaResult = await verifyCaptcha(captcha);
  if (captchaResult===true) {
    res.json({status: 'ok'});
  } else {
    res.json({status: 'failed'});
  }
})

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
