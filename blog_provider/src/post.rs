use anyhow::Result;
use chrono::{DateTime, Utc};
use metrics::counter;
use serde::Serialize;
use tokio::fs::{read_dir, read_to_string};

#[derive(Debug, Serialize)]
pub struct PostInfo {
    pub title: String,
    pub date_created: DateTime<Utc>,
}

impl PostInfo {
    pub fn new(title: String, date_created: DateTime<Utc>) -> Self {
        Self {
            title,
            date_created,
        }
    }

    pub async fn read_from_folder(folder_path: &str) -> Result<Vec<Self>> {
        let mut posts = vec![];

        let mut dir = read_dir(folder_path).await?;

        while let Some(entry) = dir.next_entry().await? {
            let file_path = entry.path();
            let file_name = file_path.to_str().unwrap().to_owned();
            let date_created = entry.metadata().await?.created()?;

            posts.push(Self::new(file_name, date_created.into()));
        }

        counter!(format!("{}.sum", folder_path)).absolute(posts.len() as u64);

        posts.sort_by_key(|post| post.date_created);

        Ok(posts)
    }
}

#[derive(Debug)]
pub struct Post {
    pub body: String,
}

impl Post {
    pub fn new(body: String) -> Self {
        Self { body }
    }

    pub async fn read_from_file(file_path: &str) -> Result<Self> {
        let content = read_to_string(file_path).await?;

        Ok(Self::new(content))
    }
}
