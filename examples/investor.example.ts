import { swarm } from './common';

async function investor() {
  const associatorKeyPair = {
    publicKey: '0440339fdab0a0e48f1151e0c4bc6926fdbeca907b07e31898596e3937ecd4b901ad7969db641b8c89b13cae531b6fb65d5766796471ef996e32c2e144a29b6bd2'
  };

  // INVESTOR KEY PAIR
  const investorPrivateKey = '1de8bed61b877a551f4191d9afb2d25ad0ffdfefd65c42cd106ae3f27071ebe8';
  const investorPublicKey = '04e0949df94cc012be1cdefbe630b200f99ad735040081080d5b91ce6500ac27342854398355cbdba9c4ef7e35b81ab0e69a20cf0817e8fad147b43731970b3d34';

  // check encryptDecryptWalletRequest.ts how we create encrypted wallet request.
  const encRequest = 'eyJpdiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzIyMCwzNSwxMTksMTI5LDE3NywxMTgsNTMsMTg3LDM5LDI0LDYxLDEyMiw1NywwLDE5MCwxNjBdfSwiZXBoZW1QdWJsaWNLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOls0LDE5MCwxNDIsMjA0LDY1LDIxNywyMDYsMTA4LDE0MSwxMzIsNSwzNCwxNjAsMTg3LDk2LDE4MywyMiwzNyw2NSwyNTIsMjE2LDI0NiwxNTcsMTM4LDcyLDIwNCwxMCwxNTcsMTkxLDI1NCwxMDIsNTMsMjA0LDIwOSwxMjgsODEsMTIsMTAyLDM4LDEzNCwyMjMsMjMwLDQ1LDE5MSw4NSwxMzAsMTIxLDg5LDQyLDE4MiwxODksMTkwLDc4LDAsNiwxNDEsMTc5LDEzMiw5NCw2Myw5NCwxNTYsMjA5LDExNSw2NV19LCJjaXBoZXJ0ZXh0Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbMzAsMjgsMTEwLDE1OCwyMzYsMjI2LDIyMyw4MCwyMzcsOTgsMjMsMCwyMTYsODksNjUsNCw5MCwzMywxNDUsMTc5LDEyMiwxMCwzNCw1MCw3OSw0Miw2NSwxNzMsNzgsMTA5LDEyNSw3OCwxODksMzEsMjM4LDIzLDE0MSwyNTIsMjAxLDI1MCwxNjMsMjI1LDEyLDEwOCwxNTMsMjMsMTQxLDIxMSwxNzcsMjQ2LDI0Myw4LDIzMSwxMjEsMjEwLDIxLDg3LDE5Nyw2MiwxODMsNjgsMTcsMTksNiwyNTAsMTcsNjgsNzksMTUyLDkxLDc1LDYzLDE0MCwxMDMsNTMsMTQ2LDI2LDcwLDI1NCwxNzMsNiwzMiw5NSwyMTMsMTU1LDM4LDQ3LDcwLDE3OSw1MSwxODUsMTgsMjI1LDI0MCw3MSwyMzksMjE3LDAsMTg1LDczLDE3MywxMDYsMjcsMTExLDIxNywxNjUsOTYsMTY4LDI0MywxOTcsMTIyLDE5NiwzMCw1LDY5LDMsMzEsOTQsMTg4LDIyMCwyMjksMTA2LDIwOSwyNDYsOTgsNywxNDEsNzAsMTA2LDE1MywyMCw4MSwxMTgsMTgzLDMxLDc3LDIyNywxMzQsMTIzLDMxLDI4LDE3NSwzNCwyMzQsOTUsMTczLDkzLDIsMTU1LDQzLDgwLDE5OCwzOSw2NiwyMDYsMTk1LDQ3LDM2LDIxNSwzNCwxMiwxNDMsMjMwLDE4MiwyMjIsMzcsNzksMTY3LDExNiwxMDYsMTIsMjQ3LDE2MywxMTEsMTQsMzEsMjU0LDI0MiwyMTQsNjgsMTg4LDE3NiwyNTIsMTI2LDIxOCwyMTgsMTcyLDEzMiwxNDMsMTA2LDE3LDIyNCwxOTQsNiw0OCwyLDQ1LDE1OCw4MywxOTEsNzksMjIzLDEwNiwyNDAsMjIyLDE0MywyNTUsMjM0LDE5OSwyMTgsMjIwLDI0MywyMjUsMTUwLDE2NywyMTAsMjA1LDEwLDEzNSwxMzMsMTA3LDcsMTEzLDE0OCw0MCwxOTEsODUsMTY3LDU4LDI0LDEyMCwyNDgsMTI1LDUsMywyMzYsOTQsMjE5LDI1MSwxMDAsMTY3LDI0MiwxNDEsNzksMTU2LDY1LDE1MiwxMTcsMjM3LDEwNiwzNywxNzYsOTcsMjUyLDIxOCwxOTYsMTMwLDI1LDExMSw0LDE3NCw5OSwxNCw2LDE4NywxNTAsMjI5LDg1LDE0NiwyNCw4OCwyMjgsMTMzLDEwMSw5Myw3MSwyNDAsMTIxLDE3MSw1NSwxODcsNTEsMTIxLDE3MCwyMjAsMTU4LDk0LDEwNywxMzAsMTE0LDM1LDM3LDY1LDEyMCwyNCwxMzQsMjYsMTU2LDExNCwwLDMwLDE1OCw4MSwxNDIsNjEsMTE1LDU0LDQ3LDEzMywxMTUsNDksMiwxODUsMTIxLDE4LDE2LDIxLDE5OSw4NiwxNjIsMjU1LDgzLDE4NSw5MSwxMjEsMTU0LDI0MiwxNDUsMTUsMjIsNTYsMjA3LDIyMiwxNzcsMTExLDY0LDE5Miw0MCwzMSw4MywxNjIsMjM5LDIxNiwxMTksMjU1LDg1LDIxMCwxNzMsOCwzNSwxMjUsMTE1LDk1LDE2Niw1OSwxOTUsMTA3LDE4NCw3NCwyNDcsMTg0LDEwMywzMCw4MywyNDUsMTQ1LDI0Niw3MiwyNTQsMTA1LDY2LDE2Myw2MywyNDEsODAsMjAwLDEsMjE4LDI1MiwzLDE0MiwyMDMsNzQsNjksNTEsNTMsMTgsMTY1LDEzMSw2MiwzMywyMyw0NiwxNTIsMTQ3LDI0LDkxLDEzOSwxOTMsNywyNTUsODMsODcsMjE5LDE1Myw1NCwyNDEsMTI0LDE0MywyMzksNTQsMTgzLDExNSwxMjAsMjI4LDIzMiwyMTcsMzEsMjMzLDIxNSwxOTYsMTc3LDIzMCwyNDIsMTI3LDEwMSw0OCw1NSwxNTEsMjEsNzIsMjE2LDEwNSwyMDgsMTQxLDI4LDE1MCwxNTgsMTc1LDk3LDIwNyw1OSwxNjMsMjUsMTIwLDE2OCw3LDIwOSwyNTEsMTgsMTgxLDYyLDY3LDIyLDQ1LDE5MywxOSwxMDYsMTkxLDg0LDEyMiwyLDEyOCwxNDMsMTk4LDg3LDE2MSwxNDIsMjYsMjI2LDIyNCwyMDcsMTAyLDE4NiwxMzAsMzcsMTQ5LDI4LDEyMywxOTMsMTkyLDIzMCwyLDEzMCw0OSwxMTMsMjI5LDIyOSwxMjYsNSwxMzgsMjUzLDExLDg1LDIxNywxODUsMjI1LDI4LDEzNSwyNiwyMDUsMjQ2LDIyMiwxOTcsNDMsMTA1LDgxLDE4MSw4NiwyMTMsMTk3LDMsMjA5LDIwLDE5Miw4MywyMzEsMTE4LDEzMCwxMTcsOTksOTgsMTIxLDE5MywxMzYsMTc3LDEsMjA4LDIyNCwxMDMsMjIxLDE1NCwxMzUsMCwyMDEsMTg2LDE1NCwyNDUsMTc0LDE1OCw4MywxNTEsMTYxLDE3OCwxMDIsMTMxLDI1MiwxMzIsMjE1LDM3LDQ4LDI1MCw2OSwxMTgsMTQzLDE3MSwxNjQsNDMsMjYsMjI1LDcwLDI0NywxOTEsMTc0LDIzOCwxNzQsMjAsMTg5LDE2NCwzMiw1MywyNDAsMjM3LDE4OSwyMzMsNDIsOTYsMzMsMjUyLDExMywxNTksMTQsMTg4LDE1NCw3NSwxNzUsMTg5LDk1LDIwOSw1NywyMDUsNzcsMTYxLDIzLDE1MCwxODEsNjksODksMTM1LDgxLDkzLDAsMTQsMzUsNDEsMTk3LDEzOSwxODYsMTQyLDE2MCwxOTQsMjEsMTUwLDQsMiwyMzcsMTQwLDIxNCwyMDIsMTIzLDEzNCw0Myw2MSwxNjksMTY5LDg1LDE4MCwzMSwzOSwxOTYsNjMsMTM3LDM0LDEwLDEyMSwxODIsMTAyLDIwMiwyMzIsMTc3LDY1LDYsMjQwLDY4LDExOSwyMDMsNDQsNzcsMjYsNjUsMjE2LDI0LDI0NSwxMjksMTkwLDEyNSw4MCwyNDEsNSwyNDYsNTEsMTI2LDEzNiwxNjAsMTQ3LDIzMCwxODMsMTg0LDI0NywxNTAsMTc2LDE4LDIyNCwyNDAsNjQsMTIsMTUsNTgsMTczLDEyMCw0NiwyMDEsMTMzLDIwOSwyMDEsNTMsOSwyMjEsMTIsNjQsMjA3LDE2MSwxOTEsMTIsMjQ4LDM0LDEzLDE1MiwyMzAsMTc2LDcsMTM4LDczLDE2MV19LCJtYWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOlsxLDE2NSwxNjgsMTA2LDIwNCwyMzksMTY5LDIzOCw5MSw5Myw1MCwyNDksMTIyLDIxOCwxNzgsMTAzLDI0LDY2LDIwLDU4LDg0LDEwMywxNDQsMjQ1LDgwLDIzMiw4NSw4NiwyOSwxMTIsMTMyLDE1Ml19fQ';

  const request = await swarm.investor.createRequest(investorPrivateKey, 'map1q86627326z7g6yg5eqsgjsqcjrdjnmzamx6fge', encRequest);
  console.log('request \n', request);

}

investor().catch(console.error);