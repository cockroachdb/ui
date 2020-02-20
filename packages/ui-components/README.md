# UI Components

UI Components (`ui-components`) is a reusable component library. It provides the core components for the Cockroach design system.

```
  npm install --save-dev @cockroachlabs/ui-components
```

Components are exported individually from the package,

```javascript
import { Badge } from "@cockroachlabs/ui-components";

export default props => (
  <div>
    <Badge>Cockroach UI Badge</Badge>
  </div>
);
```
