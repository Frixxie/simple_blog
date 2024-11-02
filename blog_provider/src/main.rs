mod error;
mod post;
mod router;

use anyhow::Result;
use metrics_exporter_prometheus::PrometheusBuilder;
use structopt::StructOpt;
use tracing::{info, Level};
use tracing_subscriber::FmtSubscriber;

#[derive(Debug, Clone, StructOpt)]
pub struct Opts {
    #[structopt(short, long, default_value = "0.0.0.0:3000")]
    host: String,

    #[structopt(short, long, default_value = "info")]
    log_level: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    let opts = Opts::from_args();
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::INFO)
        .json()
        .finish();

    tracing::subscriber::set_global_default(subscriber).unwrap();
    let metrics_handler = PrometheusBuilder::new()
        .install_recorder()
        .expect("failed to install recorder/exporter");

    let router = router::create_router(metrics_handler);
    let listener = tokio::net::TcpListener::bind(opts.host).await?;
    axum::serve(listener, router).await?;
    Ok(())
}
