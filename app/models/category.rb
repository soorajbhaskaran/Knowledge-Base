# frozen_string_literal: true

class Category < ApplicationRecord
  default_scope { order("created_at") }
  has_many :articles, foreign_key: "category_id", class_name: "Article"

  validates :title, presence: true, uniqueness: true

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
