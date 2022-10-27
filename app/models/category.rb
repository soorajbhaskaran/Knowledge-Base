# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_TITLE_LENGTH = 25

  has_many :articles, foreign_key: "category_id", class_name: "Article"
  acts_as_list

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
