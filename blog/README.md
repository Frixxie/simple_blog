# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Project Structure

The project structure is as follows:

- `blog/`: Contains the main blog application
- `blog_provider/`: Contains the backend service for providing blog data

The `blog_provider` directory contains the following files:

- `Cargo.toml`: Contains the dependencies and metadata for the Rust project
- `src/`: Contains the source code for the backend service
  - `error.rs`: Defines custom error types
  - `main.rs`: The main entry point for the backend service
  - `post.rs`: Contains the logic for handling blog posts
  - `router.rs`: Defines the API routes for the backend service

### Required Folders

The project requires the following folders:

- `posts/`: Contains the blog posts
- `pinned/`: Contains the pinned blog posts
- `images/`: Contains the images used in the blog

### API Endpoints

The `blog_provider` service provides the following API endpoints:

- `GET /metrics`: Returns Prometheus metrics
- `GET /status/health`: Returns the health status of the service
- `GET /api/posts`: Returns a list of blog posts
- `GET /api/posts/:filename`: Returns the content of a specific blog post
- `GET /api/pinned`: Returns a list of pinned blog posts
- `GET /api/pinned/:filename`: Returns the content of a specific pinned blog post
- `GET /images/:filename`: Returns the content of a specific image

### How to Run blog_provider

To run the `blog_provider` service, follow these steps:

1. Install Rust: https://www.rust-lang.org/tools/install
2. Navigate to the `blog_provider` directory:
   ```
   cd blog_provider
   ```
3. Build the project:
   ```
   cargo build
   ```
4. Run the project:
   ```
   cargo run
   ```
