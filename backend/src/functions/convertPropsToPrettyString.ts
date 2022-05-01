export const convertPropsToPrettyString = (props: Record<string, any>) =>
  `(${Object.keys(props)
    .map((key) => `"${key}": "${props[key]}"`)
    .join(", ")})`;
