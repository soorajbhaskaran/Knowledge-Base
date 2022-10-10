// const convertToCamelCase = (sentence) => {
//   const [firstWord, ...rest] = sentence
//     .replace(/[^a-zA-Z]/gi, " ")
//     .split(" ")
//     .filter((word) => word !== "");

//   return [firstWord.toLowerCase(), ...rest.map(capitalize)].join("");
// };

// const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

// export const buildSelectOptions = (labels) =>
//   labels.map((label) => ({
//     label,
//     value: convertToCamelCase(label),
//   }));
