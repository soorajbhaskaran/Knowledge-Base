# frozen_string_literal: true

class Category < ApplicationRecord
  default_scope { order("created_at") }

  MAX_CATEGORY_TITLE_LENGTH = 15

  has_many :articles, foreign_key: "category_id", class_name: "Article"

  validates :title, presence: true, uniqueness: true, length: { maximum: MAX_CATEGORY_TITLE_LENGTH }

  def self.split_category_articles_based_on_status
    Category.includes(:articles).map do |category|
     category.attributes.merge(
       {
         articles: {
           published: category.articles.of_status(:published),
           draft: category.articles.of_status(:draft)
         }
       })
   end
 end
end
