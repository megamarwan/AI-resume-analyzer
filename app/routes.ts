// Import necessary types and functions from the routing library.
// - `RouteConfig`: This is a type definition that ensures the exported array
//   conforms to the expected structure for route configuration.
// - `index`: A signature function used to define the 'index' or default route 
//   for the current level/group.
// - `route`: A signature function used to define a specific route path and 
//   associate it with a component file.
import { 
    type RouteConfig, 
    index, 
    route 
} from "@react-router/dev/routes";

// Export a default array of route configurations.
// This array defines the entire routing structure for the application.
export default [
    // 1. **Index Route Definition:**
    // The `index()` function creates the default route for the root path ('/').
    // Signature: `index(filePath: string)`
    // Explanation: When a user visits the base URL (e.g., '/'), the component 
    // defined in 'routes/home.tsx' will be rendered.
    index("routes/home.tsx"),

    // 2. **Specific Route Definition (Auth):**
    // The `route()` function creates a route for a specific URL path.
    // Signature: `route(path in URl: string, filePath: string)`
    // Explanation: When a user visits '/auth', the component defined in 
    // 'routes/auth.tsx' will be rendered.
    route('/auth', 'routes/auth.tsx'),

    // 3. **Specific Route Definition (Upload):**
    // The `route()` function creates another specific route.
    // Signature: `route(path: string, filePath: string)`
    // Explanation: When a user visits '/upload', the component defined in 
    // 'routes/upload.tsx' will be rendered.
    route('/upload' , 'routes/upload.tsx'),

// The `satisfies RouteConfig` ensures the structure of the array matches the
// `RouteConfig` type. This provides strong type-checking at compile time
// without affecting the runtime type of the array.
] satisfies RouteConfig;