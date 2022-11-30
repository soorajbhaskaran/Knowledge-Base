  # frozen_string_literal: true

  json.articles @articles.order(:visits => :desc).page params[:page] do |article|
    json.partial! "api/articles/article", article: article
    json.date article.published_date
    json.visits article.visits
    json.category article.category.title
    json.author "#{article.author.first_name} #{article.author.last_name}"
  end
  json.published_articles @articles.where(status: "published").count
  json.draft_articles @articles.where(status: "draft").count
