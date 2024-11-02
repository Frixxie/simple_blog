import type { Handlers, PageProps } from "$fresh/server.ts";
import FileTable, { type Post } from "../components/FileTable.tsx";

interface Posts {
    posts: Post[];
    pinned_posts: Post[];
}

export const handler: Handlers<Posts> = {
    async GET(_req, ctx) {
        const posts: Post[] = await fetch("http://localhost:3000/api/posts")
            .then((
                res,
            ) => res.json()).catch((err) => {
                console.error(err);
                ctx.renderNotFound();
            });
        const pinned_posts: Post[] = await fetch(
            "http://localhost:3000/api/pinned",
        )
            .then((
                res,
            ) => res.json()).catch((err) => {
                console.error(err);
                ctx.renderNotFound();
            });
        return ctx.render({ posts, pinned_posts });
    },
};

export default function Page(props: PageProps<Posts>) {
    return (
        <div>
            <FileTable title="Pinned" posts={props.data.pinned_posts} />
            <FileTable title="Posts" posts={props.data.posts} />
        </div>
    );
}
