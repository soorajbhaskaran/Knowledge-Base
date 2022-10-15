# frozen_string_literal: true

json.articles do
    json.published @published_articles do |published_article|
      json.partial! "articles/article", article: published_article
      json.date published_article.published_date
      json.category published_article.category.title
      json.author "#{published_article.author.first_name} #{published_article.author.last_name}"
    end
    json.draft @draft_articles do |draft_article|
      json.partial! "articles/article", article: draft_article
      json.category draft_article.category.title
      json.author "#{draft_article.author.first_name} #{draft_article.author.last_name}"
    end
end
