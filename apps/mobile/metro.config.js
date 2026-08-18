const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo (so packages/ui changes are detected)
config.watchFolders = [workspaceRoot];

// 2. Let Metro look for dependencies in both local and workspace root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Enable Native Symlink support in Metro
config.resolver.unstable_enableSymlinks = true;
config.resolver.disableHierarchicalLookup = false;

// 4. Force singleton packages to resolve to the app's local node_modules
// This prevents "Multiple React Instances" runtime conflicts in monorepos.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const singletonPackages = [
    "react",
    "react-dom",
    "react-native",
    "react-native-web",
  ];

  const isSingleton = singletonPackages.some(
    (pkg) => moduleName === pkg || moduleName.startsWith(`${pkg}/`)
  );

  if (isSingleton) {
    // When bundling for web, let Metro's default resolver alias 'react-native' to 'react-native-web'
    if (platform === "web" && (moduleName === "react-native" || moduleName.startsWith("react-native/"))) {
      return context.resolveRequest(context, moduleName, platform);
    }

    const fs = require("fs");
    let pathToResolve = path.resolve(projectRoot, "node_modules", moduleName);
    if (!fs.existsSync(pathToResolve)) {
      pathToResolve = path.resolve(workspaceRoot, "node_modules", moduleName);
    }
    return context.resolveRequest(context, pathToResolve, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
