import { Head } from "$fresh/runtime.ts";
import { CSS } from "@deno/gfm";

export default function BlogPost(props: { data: string }) {
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
