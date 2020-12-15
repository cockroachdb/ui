# DB console Components

This library contains components used by the CockroachDB Console. 

```
  npm install --save-dev @cockroachlabs/db-console-components
```

Components are exported individually from the package,

```javascript
import { Drawer } from "@cockroachlabs/db-console-components";

export default props => (
  <div>
    <Drawer />
  </div>
);
```
