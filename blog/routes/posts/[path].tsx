import { CSS, render } from "@deno/gfm";
import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";

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
            <Head>
                <style dangerouslySetInnerHTML={{ __html: CSS }} />
            </Head>

            <div
                class="mt-8 markdown-body"
                dangerouslySetInnerHTML={{
                    __html: props.data,
                }}
            />
        </div>
    );
}
