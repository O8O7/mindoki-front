import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ocean } from "react-syntax-highlighter/dist/cjs/styles/prism";

function Markdown(props) {
  return (
    <ReactMarkdown
      children={props.description}
      //   children={(props) => props.description}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            // <SyntaxHighlighter
            //   children={String(children).replace(/\n$/, "")}
            //   style={ocean}
            //   language={match[1]}
            //   PreTag="div"
            //   {...props}
            // />
            <SyntaxHighlighter
              style={ocean}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
// function Markdown(props) {
//   return <ReactMarkdown>{props.description}</ReactMarkdown>;
// }
export default Markdown;
