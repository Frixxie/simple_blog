import type { Handlers, PageProps } from "$fresh/server.ts";
import type { Post } from "../../components/FileTable.tsx";
import FileTable from "../../components/FileTable.tsx";

export const handler: Handlers<Post[]> = {
    async GET(_req, ctx) {
        const provider_host = Deno.env.get("BLOG_PROVIDER_HOST");
        const posts: Post[] = await fetch(`${provider_host}api/posts`)
            .then((
                res,
            ) => res.json());
        return ctx.render(posts);
    },
};

export default function Page(props: PageProps<Post[]>) {
    return (
        <div>
            <FileTable title="Posts" posts={props.data} />
        </div>
    );
}
