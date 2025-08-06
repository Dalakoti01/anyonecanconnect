// scripts/socket-server.js

import {server} from "../socket/server.js"
const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Socket.IO Server running on http://localhost:${PORT}`);
});
