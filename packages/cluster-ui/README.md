# Admin UI Components

This library contains components used by the CockroachDB Admin UI. 

```
  npm install --save-dev @cockroachlabs/cluster-ui
```

Components are exported individually from the package,

```javascript
import { Drawer } from "@cockroachlabs/cluster-ui";

export default props => (
  <div>
    <Drawer />
  </div>
);
```
