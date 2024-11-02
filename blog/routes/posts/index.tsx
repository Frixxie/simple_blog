import type { Handlers, PageProps } from "$fresh/server.ts";

interface Post {
    title: string;
    index: number;
}

export const handler: Handlers<Post[]> = {
    async GET(_req, ctx) {
        const posts: Post[] = await fetch("http://localhost:3000/api/posts")
            .then((
                res,
            ) => res.json());
        return ctx.render(posts);
    },
};

export default function Page(props: PageProps<Post[]>) {
    return (
        <div>
            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">Posts</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((post) => (
                        <tr>
                            <td class="border px-4 py-2">
                                <a href={`${post.title}`}>
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
