module.exports = function (api) {
  api.cache(true);
  return {
    // babel-preset-expo auto-adds the reanimated/worklets plugin on SDK 57
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
