# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category, :title
  json.articles_count category.articles.count
end
