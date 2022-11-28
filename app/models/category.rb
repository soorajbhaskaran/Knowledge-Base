# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_TITLE_LENGTH = 50

  has_many :articles, foreign_key: "category_id", class_name: "Article"
  belongs_to :author, class_name: "User", foreign_key: "author_id"
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

  def self.show_category_with_published_articles
    category = Category.includes(:articles).map do |category|
      category.attributes.merge(
        {
          articles: category.articles.of_status(:published)
        }) if category.articles.of_status(:published).present?
    end
    category.compact
  end
end
