// import { useEffect, useState } from "react";

// import Editor from "quill-editor-math";
// import "quill-editor-math/dist/index.css";
// import "./styles.css";
// import parse, {
//   HTMLReactParserOptions,
//   Element,
//   domToReact,
// } from "html-react-parser";
// const options: HTMLReactParserOptions = {
//   replace: (domNode) => {
//     if (domNode instanceof Element && domNode.attribs) {
//       return <span>{domToReact(domNode.children)}</span>;
//     }
//   },
// };
// type MathEditorProp = {
//   value: string;
//   setValue: (value: string) => void;
// };
// export function MathEditor({ value, setValue }: MathEditorProp) {
//   const [internalValue, setInternalValue] = useState(value);
//   useEffect(() => {
//     setInternalValue(value);
//   }, [value]);
//   const operators: any = [
//     ["\\pm", "\\pm"],
//     ["\\pi", "\\pi"],
//     ["\\theta", "\\theta"],
//     ["\\beta", "\\beta"],
//     ["\\sigma", "\\sigma"],
//     ["\\epsilon", "\\epsilon"],
//     ["\\gamma", "\\gamma"],
//     ["\\omega", "\\omega"],
//     ["\\lambda", "\\lambda"],
//     ["\\mu", "\\mu"],
//     ["\\phi", "\\phi"],
//     ["\\exists", "\\exists"],
//     ["\\forall", "\\forall"],
//     ["\\neg", "\\neg"],
//     ["\\lor", "\\lor"],
//     ["\\Omega", "\\Omega"],
//     ["\\tau", "\\tau"],
//     ["\\land", "\\land"],
//     ["\\leq", "\\leq"],
//     ["\\partial", "\\partial"],
//     ["\\geq", "\\geq"],
//     ["\\approx", "\\approx"],
//     ["\\Longleftrightarrow", "\\Longleftrightarrow"],
//     ["\\subseteq", "\\subseteq"],
//     ["\\subset", "\\subset"],
//     ["\\nexists", "\\nexists"],
//     ["\\varnothing", "\\varnothing"],
//     ["\\Delta", "\\Delta"],
//     ["\\sin", "\\sin"],
//     ["\\cos", "\\cos"],
//     ["\\tan", "\\tan"],
//     ["\\sec", "\\sec"],
//     ["\\csc", "\\csc"],
//     ["\\cot", "\\cot"],
//     ["\\sinh", "\\sinh"],
//     ["\\cosh", "\\cosh"],
//     ["\\tanh", "\\tanh"],
//     ["\\coth", "\\coth"],
//     ["\\infty", "\\infty"],
//     ["\\lbrace", "\\lbrace"],
//     ["\\rbrace", "\\rbrace"],
//     ["\\equiv", "\\equiv"],
//     ["\\eqsim", "\\eqsim"],
//     ["\\Re", "\\Re"],
//     ["\\ell", "\\ell"],
//     ["\\bar{x}", "\\bar{x}"],
//     ["\\lVert", "\\lVert"],
//     ["\\vec{x}", "\\vec{x}"],
//     ["\\left.\\frac{a^3}{3}\\right|_0^1", "\\left.\\frac{}{}\\right|_0^1"],
//     ["a^{b}", "a^{}"],
//     ["\\lgroup ", "\\lgroupe("],
//     [
//       String.raw`\begin{matrix}a & b \\c & d \end{matrix}`,
//       String.raw`\begin{matrix}{a} & {b} \\{c} & {d} \end{matrix}`,
//     ],
//     [String.raw`\lim_{a \rightarrow b}`, "\\lim_{{} \\rightarrow {}}"],
//     ["\\log_{a}{b}", "\\log_{}{}"],
//     ["\\sqrt[n]{x}", "\\nthroot"],
//     ["\\frac{x}{y}", "\\frac"],
//     ["\\frac{x}{y}", "\\frac"],
//     ["\\sum^{s}_{x}{d}", "\\sum"],
//     ["\\prod^{s}_{x}{d}", "\\prod"],
//     ["\\coprod^{s}_{x}{d}", "\\coprod"],
//     ["\\int^{s}_{x}{d}", "\\int"],
//     ["\\binom{n}{k}", "\\binom{}{}"],
//     ["\\sqrt{x}", "\\sqrt"],
//     ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
//     ["\\int_{a}^{b} f(x)dx = F(b) - F(a)", "\\int_{}^{} f()d = F() - F()"],
//     ["", ""],
//     [
//       String.raw`\frac{-b\pm\sqrt{b^2-4ac}}{2a}`,
//       "\\frac{-{}\\pm\\sqrt{{b}^{2}-4{ac}}}{}",
//     ],
//   ];

//   return (
//     <div>
//       <Editor
//         initialValue={internalValue}
//         customOperator={operators}
//         onChange={setValue}
//       />
//       {/* <p> {parse(latex, options)}</p> */}
//     </div>
//   );
// }
import React from "react";

export default function EditorMath() {
  return <div>EditorMath</div>;
}
