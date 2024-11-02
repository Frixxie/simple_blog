import { render } from "@deno/gfm";
import type { Handlers, PageProps } from "$fresh/server.ts";
import BlogPost from "../../components/BlogPost.tsx";

export const handler: Handlers<string> = {
    async GET(_req, ctx) {
        const path = ctx.params.path;
        const post: string = await fetch(
            `http://localhost:3000/api/posts/${path}`,
        )
            .then((
                res,
            ) => res.text());
        const output = render(post);
        return ctx.render(output);
    },
};

export default function Post(props: PageProps<string>) {
    return (
        <div>
            <BlogPost data={props.data} />
        </div>
    );
}
