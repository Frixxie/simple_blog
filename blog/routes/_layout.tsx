import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
    // do something with state here
    return (
        <div class="layout">
            <div class="flex border">
                <nav class="flex ml-1">
                    <a class="ml-2" href="/">Home</a>
                    <a class="ml-2" href="/pinned">Pinned</a>
                    <a class="ml-2" href="/posts">Posts</a>
                </nav>
            </div>
            <Component />
        </div>
    );
}
