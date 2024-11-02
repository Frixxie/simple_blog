export interface Post {
    title: string;
    content: string;
}

export default function FileTable(props: { title: string; posts: Post[] }) {
    return (
        <div>
            <table className="table-auto w-64">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">{props.title}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.posts.map((post) => (
                        <tr>
                            <td className="border px-4 py-2">
                                <a
                                    className="hover:underline"
                                    href={post.title}
                                >
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
