# frozen_string_literal: true

json.categories @categories.order(:position) do |category|
  json.extract! category, :id, :title, :position, :articles_count
  json.articles category.split_category_articles_based_on_status
end
