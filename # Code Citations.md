# Code Citations

## License: unknown
https://github.com/sanjaykumarBJIT/BJIT-Materials/tree/2704dcc486b161fbb9a4aac7a8900832bc38e004/Class%20Work/Week%206%20day%202%20JWT%20token/app.js

```
.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON'
```


## License: unknown
https://github.com/vattcarter7/chat-app/tree/b75472243928c9dabefedf68dfe794249b3d1a2e/chat-backend/middleware/auth.js

```
res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: '
```


## License: unknown
https://github.com/minhkiet78/Polo_Store/tree/39e3d225df6f8ec6ae2337148ac076943fdbfc52/server/middleware/authenticateToken.js

```
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).
```

