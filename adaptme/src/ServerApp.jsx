import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./app";

export default function render(url , opts){
    const stream = renderToPipeableStream(
    <StaticRouter location={url}>
        <App></App>
    </StaticRouter>,
    opts
    );
    return stream;
}