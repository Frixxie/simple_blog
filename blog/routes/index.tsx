import type { Handlers, PageProps } from "$fresh/server.ts";

interface Post {
    title: string;
    index: number;
}

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
            <table class="table-auto w-64">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">Pinned</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.pinned_posts.map((post) => (
                        <tr>
                            <td class="border px-4 py-2">
                                <a class="hover:underline" href={post.title}>
                                    {post.title}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table class="table-auto w-64">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">Posts</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.posts.map((post) => (
                        <tr>
                            <td class="border px-4 py-2">
                                <a class="hover:underline" href={post.title}>
                                    {post.title}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
