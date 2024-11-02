use axum::{
    body::Bytes,
    extract::{Path, Request, State},
    http::StatusCode,
    middleware::{self, Next},
    response::Response,
    routing::get,
    Json, Router,
};
use metrics::histogram;
use metrics_exporter_prometheus::PrometheusHandle;
use tokio::time::Instant;
use tower::ServiceBuilder;
use tower_http::trace::TraceLayer;
use tracing::{info, instrument};

use crate::{
    error::HandlerError,
    post::{Post, PostInfo},
};

pub async fn profile_endpoint(request: Request, next: Next) -> Response {
    let method = request.method().clone().to_string();
    let uri = request.uri().clone().to_string();

    info!("Handling {} at {}", method, uri);

    let now = Instant::now();

    let response = next.run(request).await;

    let elapsed = now.elapsed();

    histogram!("handler", method.clone() => uri.clone()).record(elapsed);

    info!(
        "Finished handling {} at {}, used {} ms",
        method,
        uri,
        elapsed.as_millis()
    );
    response
}

pub fn create_router(metrics_handler: PrometheusHandle) -> Router {
    Router::new()
        .route("/metrics", get(metrics))
        .with_state(metrics_handler)
        .route("/status/health", get(status))
        .route("/api/posts", get(posts))
        .route("/api/posts/:filename", get(get_post))
        .route("/api/pinned", get(pinned))
        .route("/api/pinned/:filename", get(get_pinned))
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(middleware::from_fn(profile_endpoint)),
        )
}

#[instrument]
async fn status() -> (StatusCode, String) {
    (StatusCode::OK, "OK".to_string())
}

#[instrument]
async fn metrics(State(handle): State<PrometheusHandle>) -> String {
    handle.render()
}

async fn posts() -> Result<Json<Vec<PostInfo>>, HandlerError> {
    let posts = PostInfo::read_from_folder("posts").await.unwrap();
    Ok(Json(posts))
}

async fn get_post(Path(filename): Path<String>) -> Result<Bytes, HandlerError> {
    let post = Post::read_from_file(&format!("posts/{}", filename))
        .await
        .unwrap();
    Ok(Bytes::from(post.body))
}

async fn pinned() -> Result<Json<Vec<PostInfo>>, HandlerError> {
    let posts = PostInfo::read_from_folder("pinned").await.unwrap();
    Ok(Json(posts))
}

async fn get_pinned(Path(filename): Path<String>) -> Result<Bytes, HandlerError> {
    let post = Post::read_from_file(&format!("pinned/{}", filename))
        .await
        .unwrap();
    Ok(Bytes::from(post.body))
}
