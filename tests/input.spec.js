const { pour } = require('../lib');

(async () => {
  await pour('read input_variable')
  await pour('echo $input_variable')
})().catch(console.error)
